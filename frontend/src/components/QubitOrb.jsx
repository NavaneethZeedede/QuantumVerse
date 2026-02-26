import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

const QubitOrb = ({
    position,
    probability = 0,
    phase = 0,      // Added phase prop
    purity = 1,     // Added purity prop
    entropy = 0,    // Added entropy prop
    active = false
}) => {
    const meshRef = useRef()
    const glowRef = useRef()
    const haloRef = useRef()
    const [pulse, setPulse] = useState(0)
    const prevProb = useRef(probability)

    useEffect(() => {
        if (Math.abs(prevProb.current - probability) > 0.05 || (probability > 0 && prevProb.current === 0)) {
            setPulse(1.5)
            prevProb.current = probability
        }
    }, [probability])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Entropy causes flickering instability
        const flicker = entropy > 0 ? (Math.sin(time * 50) * entropy * 0.2) : 0

        if (meshRef.current) {
            meshRef.current.rotation.y = time * (0.5 + pulse * 2)
            meshRef.current.rotation.z = time * (0.3 + pulse)

            const s = (1 + pulse * 0.5) * (1 + flicker)
            meshRef.current.scale.set(s, s, s)

            if (pulse > 0) {
                setPulse(p => Math.max(0, p - 0.02))
            }
        }

        if (glowRef.current) {
            const baseScale = 1.3 + Math.sin(time * 3) * 0.1
            const pulseFactor = pulse * 1.5
            glowRef.current.scale.set(baseScale + pulseFactor, baseScale + pulseFactor, baseScale + pulseFactor)
        }

        if (haloRef.current) {
            // Phase represented by halo rotation speed and direction
            haloRef.current.rotation.z = phase + time * (1 + phase)
            haloRef.current.scale.setScalar(1.1 + Math.sin(time * 2) * 0.05)
        }
    })

    const color = new THREE.Color().lerpColors(
        new THREE.Color('#00f3ff'),
        new THREE.Color('#ff00ff'),
        probability
    )

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1} position={position}>
            {/* Core Orb */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.7, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    speed={4 + entropy * 10}
                    distort={0.4 + pulse * 0.6 + entropy * 0.5}
                    radius={0.7}
                    emissive={color}
                    emissiveIntensity={active ? (3 + pulse * 10) : (0.5 + pulse * 5)}
                    roughness={0}
                    metalness={1}
                    transparent
                    opacity={purity} // Purity maps to transparency
                />
            </mesh>

            {/* Rotational Phase Halo */}
            <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.9, 0.02, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.4 * purity} />
            </mesh>

            {/* Outer Glow / Aura */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={(0.1 + pulse * 0.5) * purity}
                    side={THREE.BackSide}
                />
            </mesh>

            {probability > 0.1 && (
                <pointLight intensity={(pulse * 10 + probability * 5) * purity} distance={10} color={color} />
            )}
        </Float>
    )
}

export default QubitOrb

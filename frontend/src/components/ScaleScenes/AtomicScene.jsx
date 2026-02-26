import React, { useRef } from 'react'
import { Sphere, Float, Torus, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Electron = ({ radius, speed, offset, color = "#9d00ff" }) => {
    const ref = useRef()
    useFrame((state) => {
        const time = state.clock.getElapsedTime() * speed + offset
        if (ref.current) {
            ref.current.position.x = Math.cos(time) * radius
            ref.current.position.z = Math.sin(time) * radius
            ref.current.position.y = Math.sin(time * 0.5) * (radius * 0.5)
        }
    })

    return (
        <group ref={ref}>
            <Sphere args={[0.15, 16, 16]}>
                <meshBasicMaterial color={color} />
            </Sphere>
            <pointLight intensity={2} distance={2} color={color} />
        </group>
    )
}

const AtomicScene = () => {
    return (
        <group>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={5} color="#00f3ff" />

            {/* Nucleus (Cluster of protons/neutrons) */}
            <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                <group>
                    <Sphere args={[0.6, 32, 32]} position={[0.2, 0.1, 0]}>
                        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
                    </Sphere>
                    <Sphere args={[0.6, 32, 32]} position={[-0.2, -0.2, 0.1]}>
                        <meshStandardMaterial color="#9d00ff" emissive="#9d00ff" emissiveIntensity={2} />
                    </Sphere>
                    <Sphere args={[0.5, 32, 32]} position={[0, 0.3, -0.2]}>
                        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
                    </Sphere>
                </group>
            </Float>

            {/* Orbiting Electrons */}
            <Electron radius={4} speed={2} offset={0} color="#00f3ff" />
            <Electron radius={4.5} speed={1.5} offset={Math.PI} color="#9d00ff" />
            <Electron radius={5} speed={2.5} offset={Math.PI / 2} color="#00f3ff" />

            {/* Orbit Paths */}
            <Torus args={[4, 0.01, 16, 100]} rotation={[Math.PI / 2, 0.2, 0]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
            </Torus>
            <Torus args={[4.5, 0.01, 16, 100]} rotation={[Math.PI / 2.5, -0.2, 0.1]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
            </Torus>
            <Torus args={[5, 0.01, 16, 100]} rotation={[Math.PI / 3, 0.5, -0.1]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
            </Torus>

            <Stars radius={20} depth={10} count={500} factor={1} saturation={0} fade speed={2} />
        </group>
    )
}

export default AtomicScene

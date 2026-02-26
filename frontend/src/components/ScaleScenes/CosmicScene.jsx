import React, { useRef } from 'react'
import { Sphere, Stars, useTexture, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CosmicScene = () => {
    const earthRef = useRef()
    const cloudsRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (earthRef.current) {
            earthRef.current.rotation.y = time * 0.05
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = time * 0.07
            cloudsRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
        }
    })

    return (
        <group>
            <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />

            {/* Sun/Light Source */}
            <pointLight position={[20, 10, 10]} intensity={2} color="#fffcf2" />
            <ambientLight intensity={0.2} />

            {/* Earth Core */}
            <Sphere ref={earthRef} args={[5, 32, 32]}>
                <meshStandardMaterial
                    color="#1a3b5a"
                    roughness={0.7}
                    metalness={0.2}
                    emissive="#000"
                />
            </Sphere>

            {/* Cloud Layer */}
            <Sphere ref={cloudsRef} args={[5.2, 32, 32]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                />
            </Sphere>

            {/* Atmospheric Glow */}
            <Sphere args={[5.5, 32, 32]}>
                <meshBasicMaterial
                    color="#4facfe"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </Sphere>

            <Html position={[0, -7, 0]} center pointerEvents="none">
                <div className="text-white/20 font-black text-[120px] uppercase tracking-tighter select-none opacity-10">
                    Cosmos
                </div>
            </Html>
        </group>
    )
}

export default CosmicScene

import React, { useRef, useMemo } from 'react'
import { Float, Sphere, Line, Text, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Molecule = ({ position, scale = 1, color = "#4facfe" }) => {
    const groupRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
            groupRef.current.rotation.y = time * 0.3
        }
    })

    const atoms = useMemo(() => [
        { pos: [0, 0, 0], size: 0.6, type: 'C' },
        { pos: [1.2, 0.5, 0], size: 0.4, type: 'H' },
        { pos: [-1.2, -0.5, 0], size: 0.4, type: 'H' },
        { pos: [0.5, -1.2, 0.5], size: 0.4, type: 'H' },
        { pos: [-0.5, 1.2, -0.5], size: 0.4, type: 'H' },
    ], [])

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {atoms.map((atom, i) => (
                <group key={i} position={atom.pos}>
                    <Sphere args={[atom.size, 32, 32]}>
                        <meshStandardMaterial
                            color={atom.type === 'C' ? "#333" : color}
                            emissive={atom.type === 'C' ? "#000" : color}
                            emissiveIntensity={0.5}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </Sphere>
                    {i > 0 && (
                        <Line
                            points={[[0, 0, 0], atom.pos.map(v => -v)]}
                            color={color}
                            lineWidth={2}
                            transparent
                            opacity={0.5}
                        />
                    )}
                </group>
            ))}
        </group>
    )
}

const MolecularScene = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4facfe" />
            <fog attach="fog" args={['#050505', 5, 25]} />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Molecule position={[0, 0, 0]} scale={2} color="#4facfe" />
            </Float>

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Molecule position={[-6, 4, -5]} scale={1.2} color="#00f2fe" />
            </Float>

            <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.8}>
                <Molecule position={[7, -3, -3]} scale={1.5} color="#7facee" />
            </Float>

            {/* Particle background for "Soup" feel */}
            <Stars radius={50} depth={20} count={1000} factor={2} saturation={0} fade speed={1} />
        </group>
    )
}

export default MolecularScene

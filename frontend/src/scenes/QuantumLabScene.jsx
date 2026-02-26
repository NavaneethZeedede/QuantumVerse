import React, { Suspense } from 'react'
import { Stars, Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import QubitOrb from '../components/QubitOrb'
import EntanglementBeam from '../components/EntanglementBeam'
import BlochSphere from '../components/BlochSphere'
import CircuitBoard from '../components/CircuitBoard'
import MetricsPanel from '../components/MetricsPanel'

const QuantumLabScene = ({
    qubits = [],
    entangledPairs = [],
    metrics = {},
    blochCoords = []
}) => {
    // Environmental reaction based on average qubit state
    const avgEntropy = qubits.reduce((acc, q) => acc + (q.entropy || 0), 0) / (qubits.length || 1)
    const avgPurity = qubits.reduce((acc, q) => acc + (q.purity || 1), 0) / (qubits.length || 1)

    return (
        <group>
            {/* Cinematic Background & Fog */}
            <color attach="background" args={['#020202']} />
            <fog attach="fog" args={['#020202', 10, 50]} />

            <ambientLight intensity={0.3} />
            <pointLight
                position={[20, 20, 20]}
                intensity={1.5}
                color="#00f3ff"
            />

            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={2} />

            {/* Neural Backdrop (Subtle Grid) */}
            <gridHelper args={[200, 100, "#111", "#050505"]} position={[0, -10, 0]} />

            {/* Qubits with full state props */}
            {qubits.map((q, i) => (
                <QubitOrb
                    key={i}
                    position={[i * 4 - (qubits.length - 1) * 2, 0, 0]}
                    probability={q.probability}
                    phase={q.phase}
                    purity={q.purity}
                    entropy={q.entropy}
                    active={q.active}
                />
            ))}

            {/* Entanglement Beams */}
            {entangledPairs.map((pair, i) => {
                const q1Pos = [pair[0] * 4 - (qubits.length - 1) * 2, 0, 0]
                const q2Pos = [pair[1] * 4 - (qubits.length - 1) * 2, 0, 0]
                return <EntanglementBeam key={i} start={q1Pos} end={q2Pos} intensity={pair[2]} />
            })}

            {/* Featured Bloch Sphere */}
            <BlochSphere
                position={[0, 6, -15]}
                theta={blochCoords[0]?.theta || 0}
                phi={blochCoords[0]?.phi || 0}
                radius={blochCoords[0]?.r || 1}
            />

            <MetricsPanel position={[10, 4, -12]} metrics={metrics} />

            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
                <Text
                    position={[0, 12, -20]}
                    fontSize={3}
                    color="#ffffff"
                    maxWidth={100}
                    textAlign="center"
                    opacity={0.1}
                    transparent
                >
                    QUANTUM_LAB_SIM_VR
                </Text>
            </Float>
        </group>
    )
}

export default QuantumLabScene

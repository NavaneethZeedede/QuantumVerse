import React, { useRef, useState, useMemo } from 'react'
import { Float, Box, Text, Line, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const LogicGate = ({ position, type, label, active = false, color = "#00f3ff" }) => {
    return (
        <group position={position}>
            <Box args={[1.5, 1, 0.5]}>
                <meshStandardMaterial
                    color={active ? color : "#222"}
                    emissive={active ? color : "#000"}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </Box>
            <Text position={[0, 0, 0.3]} fontSize={0.3} color="white">
                {String(label).toUpperCase()}
            </Text>
            <Text position={[0, 0.8, 0]} fontSize={0.15} color={color} opacity={active ? 1 : 0.2}>
                {String(type).toUpperCase()}
            </Text>
        </group>
    )
}

const QuantumArithmetic = () => {
    const [inputA, setInputA] = useState(1)
    const [inputB, setInputB] = useState(1)
    const [isQuantum, setIsQuantum] = useState(false)

    // Result logic
    const sum = inputA ^ inputB // XOR
    const carry = inputA & inputB // AND

    return (
        <group>
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 10, 0]} intensity={1} color="cyan" />

            {/* Scale Transition Helper - Move slightly back to avoid clipping during zoom */}
            <group position={[0, 0, -5]}>

                {/* Inputs */}
                <group position={[-6, 0, 0]}>
                    <LogicGate
                        position={[0, 1.5, 0]}
                        type="BIT_A"
                        label={inputA.toString()}
                        active={inputA === 1}
                        color="#00f3ff"
                        onClick={() => setInputA(1 - inputA)}
                    />
                    <LogicGate
                        position={[0, -1.5, 0]}
                        type="BIT_B"
                        label={inputB.toString()}
                        active={inputB === 1}
                        color="#9d00ff"
                        onClick={() => setInputB(1 - inputB)}
                    />
                </group>

                {/* Processing Beams */}
                <Line
                    points={[[-4.5, 1.5, 0], [0, 1.5, 0]]}
                    color={inputA ? "#00f3ff" : "#111"}
                    lineWidth={3}
                />
                <Line
                    points={[[-4.5, -1.5, 0], [0, -1.5, 0]]}
                    color={inputB ? "#9d00ff" : "#111"}
                    lineWidth={3}
                />

                {/* Logic Gates (Half Adder Concept) */}
                <LogicGate
                    position={[1, 1.5, 0]}
                    type="SUM_UNIT"
                    label="XOR"
                    active={sum === 1}
                    color="#4facfe"
                />
                <LogicGate
                    position={[1, -1.5, 0]}
                    type="CARRY_UNIT"
                    label="AND"
                    active={carry === 1}
                    color="#f093fb"
                />

                {/* Outputs */}
                <group position={[6, 0, 0]}>
                    <Text position={[0, 1.5, 0]} fontSize={0.8} color={sum ? "#4facfe" : "#111"}>
                        Σ: {sum}
                    </Text>
                    <Text position={[0, -1.5, 0]} fontSize={0.8} color={carry ? "#f093fb" : "#111"}>
                        C: {carry}
                    </Text>
                </group>

                {/* Quantum Mode Toggle UI */}
                <Html position={[0, -5, 0]} center>
                    <div className="flex flex-col items-center gap-6 select-none">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setInputA(1 - inputA)}
                                className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-cyan-500/20 transition-all"
                            >
                                Flip Input A
                            </button>
                            <button
                                onClick={() => setInputB(1 - inputB)}
                                className="px-6 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-violet-500/20 transition-all"
                            >
                                Flip Input B
                            </button>
                        </div>

                        <div className="p-1 bg-white/5 rounded-full border border-white/10 flex">
                            <button
                                onClick={() => setIsQuantum(false)}
                                className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${!isQuantum ? 'bg-white text-black' : 'text-white/40'}`}
                            >
                                Classical
                            </button>
                            <button
                                onClick={() => setIsQuantum(true)}
                                className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isQuantum ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]' : 'text-white/40'}`}
                            >
                                Quantum_Superposition
                            </button>
                        </div>

                        {isQuantum && (
                            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em] animate-pulse">
                                Superposition Active: Bits exist in Σ path simultaneously
                            </div>
                        )}
                    </div>
                </Html>
            </group>
        </group>
    )
}

export default QuantumArithmetic

import React, { useState } from 'react'
import { Html, Text } from '@react-three/drei'

const HolographicControlPanel = ({ position, onAlgorithm, onNoiseChange, onStateChange }) => {
    const [noise, setNoise] = useState(0)
    const [alpha, setAlpha] = useState(1.0)
    const [beta, setBeta] = useState(0.0)

    const handleAmplitudeChange = (type, val) => {
        let newAlpha = alpha
        let newBeta = beta
        if (type === 'alpha') newAlpha = val
        else newBeta = val

        // Basic normalization for visualization
        const norm = Math.sqrt(newAlpha ** 2 + newBeta ** 2) || 1
        setAlpha(newAlpha / norm)
        setBeta(newBeta / norm)

        // Probability |1> is beta^2 / norm^2
        onStateChange({ probability: (newBeta ** 2) / (norm ** 2) })
    }

    return (
        <group position={position}>
            <Html transform distanceFactor={8}>
                <div className="w-96 p-10 bg-black/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_0_80px_rgba(0,243,255,0.1)] text-white select-none">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent uppercase tracking-tighter">
                            CORE CONTROLS
                        </h2>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse delay-75" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Amplitude Sliders */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/40">
                                    <span>Ampliude α |0⟩</span>
                                    <span>{alpha.toFixed(2)}</span>
                                </div>
                                <input type="range" min="0" max="1" step="0.01" value={alpha} onChange={(e) => handleAmplitudeChange('alpha', parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/40">
                                    <span>Ampliude β |1⟩</span>
                                    <span>{beta.toFixed(2)}</span>
                                </div>
                                <input type="range" min="0" max="1" step="0.01" value={beta} onChange={(e) => handleAmplitudeChange('beta', parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500" />
                            </div>
                        </div>

                        {/* Algorithm Section */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => onAlgorithm('BELL')}
                                    className="h-14 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 rounded-2xl transition-all duration-300 uppercase text-[10px] font-black tracking-widest"
                                >
                                    Bell Pair
                                </button>
                                <button
                                    onClick={() => onAlgorithm('GROVER')}
                                    className="h-14 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/50 rounded-2xl transition-all duration-300 uppercase text-[10px] font-black tracking-widest"
                                >
                                    Grover
                                </button>
                            </div>
                        </div>

                        {/* Noise Control Section */}
                        <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.3em]">Decoherence</span>
                                <span className="text-lg font-mono text-white">{(noise * 100).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="1" step="0.01"
                                value={noise}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value)
                                    setNoise(val)
                                    onNoiseChange(val)
                                }}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                            />
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    )
}

export default HolographicControlPanel

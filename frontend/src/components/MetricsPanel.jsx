import React from 'react'
import { Html } from '@react-three/drei'

const MetricsPanel = ({ position, metrics = {} }) => {
    return (
        <group position={position}>
            <Html transform distanceFactor={5}>
                <div className="w-80 p-8 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)] text-white select-none">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-quantum-cyan to-quantum-violet bg-clip-text text-transparent">
                            LIVE METRICS
                        </h2>
                        <div className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="block text-[10px] uppercase tracking-widest text-[#555] font-bold">Entropy</span>
                            <span className="text-2xl font-mono text-quantum-cyan">{metrics.entropy || '0.00'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-[10px] uppercase tracking-widest text-[#555] font-bold">Purity</span>
                            <span className="text-2xl font-mono text-quantum-cyan">{metrics.purity || '1.00'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-[10px] uppercase tracking-widest text-[#555] font-bold">Fidelity</span>
                            <span className="text-2xl font-mono text-quantum-violet">{metrics.fidelity || '0.99'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-[10px] uppercase tracking-widest text-[#555] font-bold">Concurrence</span>
                            <span className="text-2xl font-mono text-quantum-violet">{metrics.concurrence || '0.00'}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex justify-between text-[10px] font-mono text-[#444]">
                            <span>SAMPLE_RATE:</span>
                            <span>1024_SHOTS</span>
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    )
}

export default MetricsPanel

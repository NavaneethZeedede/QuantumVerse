import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Stars, Float, Text } from '@react-three/drei'

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full h-full bg-[#020202] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background 3D Atmosphere */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <color attach="background" args={['#010101']} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                            <boxGeometry args={[2, 2, 2]} />
                            <meshStandardMaterial color="#00f3ff" wireframe opacity={0.3} transparent />
                        </mesh>
                    </Float>
                </Canvas>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center space-y-12 max-w-4xl px-10">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_15px_#14b8a6] animate-pulse" />
                        <span className="text-[10px] text-teal-400 font-black uppercase tracking-[0.8em] ml-2">System // Online</span>
                    </div>
                    <h1 className="text-8xl font-black bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent uppercase tracking-tighter leading-none py-2">
                        Quantum<br />Verse VR
                    </h1>
                    <p className="text-sm text-white/40 font-mono tracking-[0.4em] uppercase max-w-xl mx-auto">
                        Experience the next dimension of quantum simulation in a high-fidelity immersive lab.
                    </p>
                </div>

                <div className="pt-10">
                    <button
                        onClick={() => navigate('/lab')}
                        className="group relative px-12 py-6 bg-white hover:bg-teal-400 text-black text-xs font-black rounded-full transition-all duration-500 uppercase tracking-[0.5em] active:scale-95 cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(20,184,166,0.6)]"
                    >
                        Enter Laboratory
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-10 pt-20 border-t border-white/5">
                    <div className="text-left space-y-2">
                        <span className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">Engine</span>
                        <p className="text-[11px] text-white/30 font-mono">Qiskit // NumPy Runtime</p>
                    </div>
                    <div className="text-left space-y-2">
                        <span className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">Interface</span>
                        <p className="text-[11px] text-white/30 font-mono">WebXR // Three.js</p>
                    </div>
                    <div className="text-left space-y-2">
                        <span className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">Protocol</span>
                        <p className="text-[11px] text-white/30 font-mono">Neural_Link 2.0</p>
                    </div>
                </div>
            </div>

            {/* UI Details */}
            <div className="absolute top-10 right-10 text-[9px] text-white/20 font-mono tracking-widest uppercase">
                Ver 0.8.4 // Stable_Release
            </div>
            <div className="absolute bottom-10 left-10 text-[9px] text-white/10 font-mono tracking-widest uppercase">
                © 2026 Antigravity Systems. All rights reserved.
            </div>
        </div>
    )
}

export default LandingPage

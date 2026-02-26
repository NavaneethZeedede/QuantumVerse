import React, { useState, useEffect, useRef } from 'react'
import { Text, Float, Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import QubitOrb from './QubitOrb'
import EntanglementBeam from './EntanglementBeam'
import CosmicScene from './ScaleScenes/CosmicScene'
import MolecularScene from './ScaleScenes/MolecularScene'
import AtomicScene from './ScaleScenes/AtomicScene'
import FieldScene from './ScaleScenes/FieldScene'
import QuantumArithmetic from './QuantumArithmetic'

const SCALES = [
    { id: 'COSMIC', title: 'Macro Scale', sub: 'The Pale Blue Dot', narration: 'From the vastness of the cosmos, we look upon our world. A world governed by the laws of classical physics, where every action is certain.', component: CosmicScene },
    { id: 'MOLECULAR', title: 'Molecular World', sub: 'Building Blocks', narration: 'Zooming in, we find the architecture of matter. Molecules held together by chemical bonds, yet still obeying deterministic paths.', component: MolecularScene },
    { id: 'ATOMIC', title: 'Atomic Model', sub: 'The Heart of Matter', narration: 'Deeping further, we reach the atom. Electrons orbit a dense nucleus, governed by the first hints of probability clouds.', component: AtomicScene },
    { id: 'FIELD', title: 'Quantum Field', sub: 'The Fabric of Reality', narration: 'Beyond the atom lies the quantum field. Particles dissolve into waves of probability, interfering with reality itself.', component: FieldScene },
    { id: 'QUBIT', title: 'Qubit Awakening', sub: 'Quantum Information', narration: 'Here, we harness the field. The Qubit arises—not a 0 or a 1, but an infinite superposition of both.', component: null }, // Existing Qubit/Story logic
    { id: 'ARITHMETIC', title: 'Quantum Logic', sub: 'Computational Superposition', narration: 'Information now flows through interference. We perform logic not by switching, but by weaving probability paths.', component: QuantumArithmetic },
    { id: 'LAB', title: 'Interactive Lab', sub: 'Final System Boot', narration: 'Welcome. The system is live. You are now the architect of the QuantumVerse.', component: null }
]

const StoryStage = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scale = SCALES[currentIndex]
    const { camera } = useThree()
    const contentRef = useRef()
    const uiRef = useRef()

    const handleNext = (index = null) => {
        const nextIndex = index !== null ? index : currentIndex + 1
        console.log(`[QuantumVerse] StoryStage: Attempting transition to ${nextIndex}`)

        if (nextIndex >= SCALES.length) {
            onComplete()
            return
        }

        // Cinematic Zoom-In Transition
        gsap.to(camera.position, {
            z: 2,
            duration: 1,
            ease: 'power2.in',
            onComplete: () => {
                console.log(`[QuantumVerse] StoryStage: Zoom-in complete, setting index to ${nextIndex}`)
                setCurrentIndex(nextIndex)
                gsap.fromTo(camera.position, { z: 25 }, { z: 12, duration: 1.5, ease: 'power3.out' })
            }
        })
    }

    return (
        <group>
            {/* Scale Memory Ribbon (Vertical Nav) */}
            <Html position={[-14, 0, 0]} transform distanceFactor={10}>
                <div className="flex flex-col items-center gap-4 py-8 px-2 bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 rounded-r-3xl">
                    {SCALES.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => handleNext(i)}
                            className={`w-1 h-12 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,243,255,1)] w-2' : 'bg-white/10 hover:bg-white/30'}`}
                            title={s.title}
                        />
                    ))}
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] rotate-90 mt-10 whitespace-nowrap">
                        Dimensional Scale
                    </div>
                </div>
            </Html>

            {/* Dynamic Scale Content */}
            <group ref={contentRef}>
                {scale.component && <scale.component />}

                {/* Legacy integration for Qubit/Entanglement stages if needed */}
                {scale.id === 'QUBIT' && (
                    <QubitOrb position={[0, 0, 0]} probability={0.5} active={true} />
                )}

                {scale.id === 'LAB' && (
                    <Text fontSize={0.6} color="cyan">INITIALIZING VR LAB...</Text>
                )}
            </group>

            {/* Narrative UI */}
            <Html position={[0, -6, -2]} center>
                <div ref={uiRef} className="w-[700px] p-12 bg-black/80 backdrop-blur-3xl rounded-[3rem] border border-white/5 text-center select-none shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] text-cyan-400/60 font-black tracking-[0.5em] uppercase">Scale: {scale.id}</span>
                        <span className="text-[10px] text-white/20 font-mono tracking-widest">{currentIndex + 1} / {SCALES.length}</span>
                    </div>

                    <h2 className="text-5xl font-black bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent uppercase tracking-tighter mb-2">
                        {scale.title}
                    </h2>
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-60">
                        {scale.sub}
                    </p>

                    <p className="text-white/40 text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto italic">
                        "{scale.narration}"
                    </p>

                    <button
                        onClick={() => handleNext()}
                        className="group relative px-14 py-5 bg-white overflow-hidden text-black text-xs font-black rounded-full transition-all duration-500 uppercase tracking-[0.5em] active:scale-95 cursor-pointer hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                    >
                        <span className="relative z-10 transition-colors group-hover:text-cyan-600">
                            {currentIndex === SCALES.length - 1 ? 'Enter The Void' : 'Go Deeper'}
                        </span>
                    </button>
                </div>
            </Html>
        </group>
    )
}

export default StoryStage

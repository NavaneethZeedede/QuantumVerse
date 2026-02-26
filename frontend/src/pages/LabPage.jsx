import React, { Suspense, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import axios from 'axios'
import QuantumLabScene from '../scenes/QuantumLabScene'
import StoryStage from '../components/StoryStage'
import HolographicControlPanel from '../components/HolographicControlPanel'
import CalculatorScene from '../components/QuantumCalculator/CalculatorScene'
import CalculatorUI from '../components/QuantumCalculator/HUD/CalculatorUI'
import EducationalOverlay from '../components/QuantumCalculator/HUD/EducationalOverlay'
import StepTimeline from '../components/QuantumCalculator/HUD/StepTimeline'

const API_BASE = '/api'

class LabErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("[QuantumVerse] Lab crashed:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-[500] text-red-500 font-mono text-center p-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-black uppercase">SYSTEM_CRITICAL_FAILURE</h1>
                        <p className="text-sm opacity-60 uppercase tracking-widest">Quantum Engine collapsed. Check console for logs.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 border border-red-500/50 hover:bg-red-500/20 rounded-full text-[10px] uppercase font-bold transition-all"
                        >
                            Attempt Hot Reload
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const LabPage = () => {
    const navigate = useNavigate()
    const [isStoryMode, setIsStoryMode] = useState(true)
    const [isCalculatorActive, setIsCalculatorActive] = useState(false)
    const [glContextLost, setGlContextLost] = useState(false)

    // Calculator State
    const [simData, setSimData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSolve = async (a, b, op) => {
        setLoading(true);
        try {
            const response = await fetch('/api/calculator/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a, b, operation: op })
            });
            const data = await response.json();
            setSimData(data.steps);
            setCurrentStep(0);
        } catch (error) {
            console.error("Error simulating calculator:", error);
        }
        setLoading(false);
    };

    const calcStep = simData ? simData[currentStep] : null;

    // ... (rest of the state and runAlgorithm function same as before)
    const [qubits, setQubits] = useState([
        { probability: 0, active: true, phase: 0, purity: 1, entropy: 0 },
        { probability: 0, active: false, phase: 0, purity: 1, entropy: 0 },
        { probability: 0, active: false, phase: 0, purity: 1, entropy: 0 }
    ])

    const [entangledPairs, setEntangledPairs] = useState([])
    const [metrics, setMetrics] = useState({
        entropy: 0,
        purity: 1,
        fidelity: 1,
        concurrence: 0
    })
    const [blochCoords, setBlochCoords] = useState([
        { theta: 0, phi: 0, r: 1 },
        { theta: 0, phi: 0, r: 1 },
        { theta: 0, phi: 0, r: 1 }
    ])

    const [status, setStatus] = useState("Ready")
    const [lastOpTime, setLastOpTime] = useState(0)

    const runAlgorithm = async (type) => {
        try {
            const startTime = Date.now();
            setStatus(`COMPUTING ${type}...`)

            let circuit = [];
            let num_qubits = 2;

            if (type === 'BELL') {
                circuit = [{ name: 'H', targets: [0] }, { name: 'CNOT', targets: [0, 1] }];
            } else if (type === 'GROVER') {
                circuit = [
                    { name: 'H', targets: [0] }, { name: 'H', targets: [1] },
                    { name: 'CZ', targets: [0, 1] },
                    { name: 'H', targets: [0] }, { name: 'H', targets: [1] }
                ];
            }

            const simResponse = await axios.post(`${API_BASE}/simulate`, {
                num_qubits: num_qubits,
                circuit: circuit
            });

            const data = simResponse.data;
            const p = data.probabilities;

            const newQubits = [
                { ...qubits[0], probability: p[2] + p[3], active: true },
                { ...qubits[1], probability: p[1] + p[3], active: true },
                { ...qubits[2], probability: p.length === 8 ? (p[1] + p[3] + p[5] + p[7]) : 0, active: p.length === 8 }
            ];
            setQubits(newQubits);

            if (type === 'BELL') {
                setEntangledPairs([[0, 1, 1.0]]);
            } else {
                setEntangledPairs([]);
            }

            const metricsRes = await axios.post(`${API_BASE}/metrics`, {
                num_qubits: data.num_qubits,
                statevector: data.statevector
            });

            setMetrics(metricsRes.data);
            if (metricsRes.data.bloch_coords) {
                setBlochCoords(metricsRes.data.bloch_coords);
            }

            setLastOpTime(Date.now() - startTime);
            setStatus("READY")

        } catch (error) {
            console.error("[QuantumVerse] ERROR:", error);
            setStatus("ERROR")
        }
    };

    return (
        <div className="w-full h-full bg-black relative overflow-hidden">
            <VRButton />

            <LabErrorBoundary>
                {glContextLost && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-[600] text-amber-500 font-mono text-center p-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black uppercase tracking-tighter">GPU_CONTEXT_LOST</h1>
                            <p className="text-sm opacity-60 uppercase tracking-widest">Graphics pipe collapsed. Attempting recovery...</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 border border-amber-500/50 hover:bg-amber-500/20 rounded-full text-[10px] uppercase font-bold transition-all"
                            >
                                Force Cold Reboot
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full h-full">
                    <Canvas
                        shadows
                        camera={{ position: [0, 3, 12], fov: 45 }}
                        onCreated={({ gl }) => {
                            gl.domElement.addEventListener('webglcontextlost', (e) => {
                                e.preventDefault()
                                console.warn('[QuantumVerse] WebGL Context Lost!')
                                setGlContextLost(true)
                            }, false)
                        }}
                    >
                        <XR>
                            <Suspense fallback={null}>
                                {isStoryMode ? (
                                    <StoryStage onComplete={() => setIsStoryMode(false)} />
                                ) : isCalculatorActive ? (
                                    <CalculatorScene step={calcStep} />
                                ) : (
                                    <>
                                        <QuantumLabScene
                                            qubits={qubits}
                                            entangledPairs={entangledPairs}
                                            metrics={metrics}
                                            blochCoords={blochCoords}
                                        />
                                        <HolographicControlPanel
                                            position={[-10, 3, -5]}
                                            onAlgorithm={runAlgorithm}
                                            onStateChange={(state) => {
                                                setQubits(prev => prev.map((q, i) => i === 0 ? { ...q, ...state } : q))
                                            }}
                                            onNoiseChange={(noise) => {
                                                setQubits(prev => prev.map(q => ({ ...q, entropy: noise, purity: 1 - noise })))
                                            }}
                                        />
                                    </>
                                )}
                            </Suspense>
                            <Controllers />
                            <Hands />
                            <OrbitControls makeDefault minDistance={3} maxDistance={25} />
                        </XR>
                    </Canvas>
                </div>

                {/* Calculator 2D UI - Rendered outside Canvas */}
                {isCalculatorActive && !isStoryMode && (
                    <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between z-[100]">
                        <div className="flex justify-between items-start">
                            <CalculatorUI onSolve={handleSolve} loading={loading} />
                        </div>

                        <div className="flex flex-col gap-4 items-center">
                            {calcStep && <EducationalOverlay explanation={calcStep.explanation} gate={calcStep.gate} />}
                            {simData && (
                                <StepTimeline
                                    current={currentStep}
                                    total={simData.length}
                                    onChange={setCurrentStep}
                                />
                            )}
                        </div>
                    </div>
                )}
            </LabErrorBoundary>

            {/* Global Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-[200]">
                {!isStoryMode && (
                    <button
                        onClick={() => setIsCalculatorActive(!isCalculatorActive)}
                        className={`px-6 py-3 border border-white/10 text-[9px] font-black rounded-xl transition-all duration-500 uppercase tracking-[0.4em] ${isCalculatorActive ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
                    >
                        {isCalculatorActive ? 'Close Calculator' : 'Quantum Calculator'}
                    </button>
                )}
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-white/5 hover:bg-red-500/20 border border-white/10 text-white/40 hover:text-white text-[9px] font-black rounded-xl transition-all duration-500 uppercase tracking-[0.4em]"
                >
                    Retreat to Core
                </button>
            </div>
        </div>
    )
}

export default LabPage


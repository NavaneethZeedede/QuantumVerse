import React, { useMemo, useRef, useEffect } from 'react';
import QubitOrb from '../QubitOrb';
import { Line, Text } from '@react-three/drei';
import gsap from 'gsap';

const QuantumRegister3D = ({ statevector, numQubits, activeGate, targets }) => {
    const beamsRef = useRef([]);

    // Layout 10 qubits in two registers (4+4) + 2 carry
    const layout = useMemo(() => {
        const spacing = 2.5;
        const positions = [];
        // Register A (0-3)
        for (let i = 0; i < 4; i++) {
            positions.push([(i - 1.5) * spacing, 2, 0]);
        }
        // Register B (4-7)
        for (let i = 0; i < 4; i++) {
            positions.push([(i - 1.5) * spacing, -2, 0]);
        }
        // Carry (8-9)
        positions.push([-3, 0, 0]);
        positions.push([3, 0, 0]);
        return positions;
    }, []);

    useEffect(() => {
        if (activeGate && targets && targets.length > 1) {
            beamsRef.current.forEach(beam => {
                if (beam) {
                    gsap.fromTo(beam.material,
                        { opacity: 0, lineWidth: 0 },
                        { opacity: 1, lineWidth: 5, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }
                    );
                }
            });
        }
    }, [activeGate, targets]);

    // Helper to get probability of a qubit being |1>
    // This is a simplification for visualization
    const getProb1 = (qubitIdx) => {
        if (!statevector) return 0;
        let p = 0;
        for (let i = 0; i < statevector.length; i++) {
            const bit = (i >> (numQubits - 1 - qubitIdx)) & 1;
            if (bit === 1) {
                const { real, imag } = statevector[i];
                p += real * real + imag * imag;
            }
        }
        return p;
    };

    return (
        <group>
            {layout.map((pos, i) => {
                const isActive = targets?.includes(i);
                const prob1 = getProb1(i);

                return (
                    <group key={i} position={pos}>
                        <QubitOrb
                            active={isActive}
                            probability={prob1}
                            color={i < 4 ? "#00f3ff" : i < 8 ? "#9d00ff" : "#ff0080"}
                        />
                        <Text position={[0, -1.2, 0]} fontSize={0.2} color="white" opacity={0.5}>
                            q{i} {i < 4 ? '(A)' : i < 8 ? '(B)' : '(C)'}
                        </Text>
                        <Text position={[0, 1.2, 0]} fontSize={0.3} color="cyan">
                            {prob1.toFixed(2)}
                        </Text>
                    </group>
                );
            })}

            {/* Connection beams for active multi-qubit gates */}
            {targets && targets.length > 1 && (
                <group>
                    {targets.slice(1).map((t, idx) => (
                        <Line
                            key={idx}
                            ref={el => beamsRef.current[idx] = el}
                            points={[layout[targets[0]], layout[t]]}
                            color="#00f3ff"
                            lineWidth={2}
                            transparent
                            opacity={0}
                        />
                    ))}
                </group>
            )}
        </group>
    );
};

export default QuantumRegister3D;

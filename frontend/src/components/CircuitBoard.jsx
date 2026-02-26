import React from 'react'
import { Text, Box } from '@react-three/drei'

const CircuitBoard = ({ position, numQubits = 3, numSteps = 5 }) => {
    return (
        <group position={position}>
            {/* Horizontal Wires */}
            {Array.from({ length: numQubits }).map((_, i) => (
                <group key={i} position={[0, -i * 2, 0]}>
                    <Box args={[numSteps * 3, 0.05, 0.05]} position={[numSteps * 1.5, 0, 0]}>
                        <meshStandardMaterial color="#333" />
                    </Box>
                    <Text position={[-1, 0, 0]} fontSize={0.3} color="#00f3ff">q[{i}]</Text>
                </group>
            ))}

            {/* Vertical Step Markers (Grid) */}
            {Array.from({ length: numSteps + 1 }).map((_, i) => (
                <Box
                    key={i}
                    args={[0.02, numQubits * 2, 0.02]}
                    position={[i * 3, -(numQubits - 1), 0]}
                >
                    <meshStandardMaterial color="#111" />
                </Box>
            ))}

            {/* Floating Instruction */}
            <Text
                position={[numSteps * 1.5, 2, 0]}
                fontSize={0.4}
                color="#9d00ff"
                maxWidth={5}
                textAlign="center"
            >
                INTERACTIVE CIRCUIT BOARD
            </Text>
        </group>
    )
}

export default CircuitBoard

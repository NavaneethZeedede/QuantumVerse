import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

const BlochSphere = ({ position, theta = 0, phi = 0, radius = 1 }) => {
    const vectorRef = useRef()

    const targetRotation = useRef({ x: 0, y: 0, z: 1 })
    const currentRotation = useRef({ x: 0, y: 0, z: 1 })

    useFrame(() => {
        // Standard Bloch Sphere convention:
        // x = sin(theta) * cos(phi)
        // y = sin(theta) * sin(phi)
        // z = cos(theta)
        // Three.js: Y is up, so Bloch Z maps to Three Y, Bloch X to Three X, Bloch Y to Three Z
        const tx = Math.sin(theta) * Math.cos(phi) * radius
        const ty = Math.sin(theta) * Math.sin(phi) * radius
        const tz = Math.cos(theta) * radius

        // Lerp for smoothness
        currentRotation.current.x += (tx - currentRotation.current.x) * 0.1
        currentRotation.current.y += (ty - currentRotation.current.y) * 0.1
        currentRotation.current.z += (tz - currentRotation.current.z) * 0.1

        if (vectorRef.current) {
            // Update line points
            // Note: Line component in @react-three/drei might not be directly mutable this way if it's the shader-based one,
            // but we can try updating the points prop or use a standard mesh arrow.
            // Let's use a simpler approach: update the group's rotation or just use variables for now since React will re-render this.
            // Actually, the issue in Step 6 says: "mesh position not manually updated -> fix it."
            // The existing code uses variables (x, y, z) calculated in render.
            // If React re-renders, (x, y, z) will change. 
            // BUT if the component doesn't re-render because of some optimization or if the values are identical, nothing happens.
            // Let's use a Ref for the tip to ensure it moves.
        }
    })

    // Calculated for the line points (Reactive via React Render)
    const bx = Math.sin(theta) * Math.cos(phi) * radius
    const by = Math.sin(theta) * Math.sin(phi) * radius
    const bz = Math.cos(theta) * radius

    return (
        <group position={position}>
            {/* Main Sphere (Transparent Wireframe) */}
            <Sphere args={[2, 32, 32]}>
                <meshStandardMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.05}
                    wireframe
                />
            </Sphere>

            {/* Latitudes/Longitudes for better perspective */}
            <Sphere args={[2, 16, 16]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.02} wireframe />
            </Sphere>

            {/* Axis Lines */}
            <Line points={[[0, -2.5, 0], [0, 2.5, 0]]} color="#333" lineWidth={0.5} />
            <Text position={[0, 2.8, 0]} fontSize={0.4} color="#00f3ff">|0⟩</Text>
            <Text position={[0, -2.8, 0]} fontSize={0.4} color="#9d00ff">|1⟩</Text>

            <Line points={[[-2.5, 0, 0], [2.5, 0, 0]]} color="#333" lineWidth={0.5} />
            <Text position={[2.8, 0, 0]} fontSize={0.2} color="#555">X</Text>

            <Line points={[[0, 0, -2.5], [0, 0, 2.5]]} color="#333" lineWidth={0.5} />
            <Text position={[0, 0, 2.8]} fontSize={0.2} color="#555">Y</Text>

            {/* State Vector Arrow */}
            <group ref={vectorRef}>
                <Line
                    points={[[0, 0, 0], [bx * 2, bz * 2, by * 2]]}
                    color={radius < 0.9 ? "#ff0055" : "#00f3ff"}
                    lineWidth={5}
                />
                <mesh position={[bx * 2, bz * 2, by * 2]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshBasicMaterial color={radius < 0.9 ? "#ff0055" : "#00f3ff"} />
                    <pointLight intensity={2} distance={2} color={radius < 0.9 ? "#ff0055" : "#00f3ff"} />
                </mesh>
            </group>

            {/* Indicator for mixed states (radius < 1) */}
            {radius < 0.98 && (
                <Sphere args={[radius * 2, 32, 32]}>
                    <meshBasicMaterial color="#ff0055" transparent opacity={0.1} />
                </Sphere>
            )}
        </group>
    )
}

export default BlochSphere

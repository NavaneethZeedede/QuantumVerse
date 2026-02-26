import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const EntanglementBeam = ({ start, end, intensity = 1, entangled = true }) => {
    const lineRef1 = useRef()
    const lineRef2 = useRef()
    const [pulse, setPulse] = useState(0)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Dynamic pulse based on intensity
        const pFactor = (0.5 + Math.sin(time * 5) * 0.5) * intensity

        if (lineRef1.current) {
            lineRef1.current.material.dashOffset -= 0.05 * intensity
            lineRef1.current.material.opacity = (0.3 + pFactor * 0.4) * (entangled ? 1 : 0.2)
            lineRef1.current.material.lineWidth = (3 + pFactor * 5) * intensity
        }
        if (lineRef2.current) {
            lineRef2.current.material.dashOffset += 0.03 * intensity
            lineRef2.current.material.opacity = (0.1 + pFactor * 0.2) * (entangled ? 1 : 0)
        }
    })

    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]

    return (
        <group>
            {/* Core Beam */}
            <Line
                ref={lineRef1}
                points={points}
                color="#00f3ff"
                lineWidth={3}
                dashed
                dashScale={8}
                dashSize={0.5}
                dashGap={0.2}
                transparent
                depthWrite={false}
            />

            {/* Secondary Violet "Flicker" */}
            <Line
                ref={lineRef2}
                points={points}
                color="#ff00ff"
                lineWidth={1}
                dashed
                dashScale={12}
                dashSize={0.3}
                dashGap={0.5}
                transparent
                depthWrite={false}
            />

            {/* Glow Lights at junctions */}
            {entangled && (
                <>
                    <pointLight position={start} intensity={2 * intensity} distance={3} color="#00f3ff" />
                    <pointLight position={end} intensity={2 * intensity} distance={3} color="#ff00ff" />
                </>
            )}
        </group>
    )
}

export default EntanglementBeam

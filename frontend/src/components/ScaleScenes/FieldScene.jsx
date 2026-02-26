import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

const FieldShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00f3ff') },
        uComplexity: { value: 2.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;
        
        void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            float elevation = sin(modelPosition.x * 2.0 + uTime) * 
                              cos(modelPosition.z * 2.0 + uTime) * 0.5;
            
            modelPosition.y += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform vec3 uColor;
        
        void main() {
            float strength = (vElevation + 0.5) * 2.0;
            vec3 finalColor = mix(vec3(0.01), uColor, strength);
            gl_FragColor = vec4(finalColor, 0.8 * strength);
        }
    `
}

const QuantumFieldScene = () => {
    const meshRef = useRef()
    const particlesRef = useRef()

    const count = 500
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return pos
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = time
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.1
        }
    })

    return (
        <group>
            <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[30, 30, 64, 64]} />
                <shaderMaterial
                    args={[FieldShader]}
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>

            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    color="#9d00ff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            <Stars radius={40} depth={20} count={300} factor={3} saturation={0} fade speed={3} />
            <ambientLight intensity={0.5} />
        </group>
    )
}

export default QuantumFieldScene

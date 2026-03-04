"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SuperAircraft() {
    const groupRef = useRef<THREE.Group>(null);
    const leftTurbineRef = useRef<THREE.Mesh>(null);
    const rightTurbineRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            // Sleek banking and tight bobbing
            groupRef.current.position.y += Math.sin(t * 3) * 0.03;
            groupRef.current.rotation.z = Math.sin(t * 2) * 0.08;
            groupRef.current.rotation.x = Math.cos(t * 2) * 0.03;
        }

        if (leftTurbineRef.current && rightTurbineRef.current) {
            const glow = 3 + Math.sin(t * 25) * 1.5;
            const leftMat = leftTurbineRef.current.material as THREE.MeshStandardMaterial;
            const rightMat = rightTurbineRef.current.material as THREE.MeshStandardMaterial;
            if (leftMat && rightMat) {
                leftMat.emissiveIntensity = glow;
                rightMat.emissiveIntensity = glow;
            }
        }
    });

    return (
        <group ref={groupRef} scale={[3, 3, 3]} rotation={[0, Math.PI / 2, 0]}>
            {/* Main Stealth Body (Delta Wing) */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[2.5, 6, 4]} />
                <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.2} flatShading />
            </mesh>

            {/* Angular Cockpit Canopy */}
            <mesh position={[1.5, 0.4, 0]} rotation={[0, 0, -Math.PI / 8]}>
                <coneGeometry args={[0.5, 2.5, 4]} />
                <meshStandardMaterial color="#00f0ff" emissive="#0080ff" emissiveIntensity={0.5} roughness={0.1} metalness={0.9} flatShading />
            </mesh>

            {/* Rear Stealth Stabilizers */}
            <mesh position={[-2.5, 0.6, 1.2]} rotation={[0.4, 0, -0.6]}>
                <boxGeometry args={[1.5, 0.1, 1]} />
                <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-2.5, 0.6, -1.2]} rotation={[-0.4, 0, -0.6]}>
                <boxGeometry args={[1.5, 0.1, 1]} />
                <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Twin Engine Exhausts Hidden Within Wing */}
            <group position={[-2.8, 0, 0.6]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.4, 1.0, 6]} />
                    <meshStandardMaterial color="#1a1c23" metalness={0.9} roughness={0.4} />
                </mesh>
                <mesh ref={leftTurbineRef} position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <circleGeometry args={[0.25, 12]} />
                    <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} side={THREE.DoubleSide} />
                </mesh>
            </group>

            <group position={[-2.8, 0, -0.6]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.4, 1.0, 6]} />
                    <meshStandardMaterial color="#1a1c23" metalness={0.9} roughness={0.4} />
                </mesh>
                <mesh ref={rightTurbineRef} position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <circleGeometry args={[0.25, 12]} />
                    <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Tech Underbelly Accents */}
            <mesh position={[0, -0.3, 0]}>
                <boxGeometry args={[3, 0.1, 1]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
            </mesh>
        </group>
    );
}

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
            // Subtle bobbing and banking
            groupRef.current.position.y += Math.sin(t * 2) * 0.05;
            groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
            groupRef.current.rotation.x = Math.cos(t * 1.5) * 0.02;
        }

        if (leftTurbineRef.current && rightTurbineRef.current) {
            const glow = 2 + Math.sin(t * 20) * 1;
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
            {/* Main Fuselage */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.6, 6, 16, 32]} />
                <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.4} />
            </mesh>

            {/* Cockpit Window */}
            <mesh position={[3.2, 0.35, 0]} rotation={[0, 0, -Math.PI / 8]}>
                <boxGeometry args={[0.5, 0.4, 0.8]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Main Wings Base */}
            <mesh position={[-0.5, 0, 0]}>
                <boxGeometry args={[2.5, 0.1, 8]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.2} roughness={0.4} />
            </mesh>

            {/* Left Wing Extension (Swept Back) */}
            <mesh position={[-1.2, 0, 3.5]} rotation={[0, -0.3, 0]}>
                <boxGeometry args={[1.5, 0.08, 5]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>

            {/* Right Wing Extension (Swept Back) */}
            <mesh position={[-1.2, 0, -3.5]} rotation={[0, 0.3, 0]}>
                <boxGeometry args={[1.5, 0.08, 5]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>

            {/* Vertical Stabilizer (Tail) */}
            <mesh position={[-3.2, 1.0, 0]} rotation={[0, 0, -0.5]}>
                <boxGeometry args={[1.2, 2.0, 0.1]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>

            {/* Horizontal Stabilizers (Rear Wings) */}
            <mesh position={[-3.5, 0.2, 0]}>
                <boxGeometry args={[1.0, 0.1, 3.0]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>

            {/* Left Engine */}
            <group position={[-1.0, -0.5, 1.8]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.35, 0.35, 1.2, 16]} />
                    <meshStandardMaterial color="#888" metalness={0.6} roughness={0.2} />
                </mesh>
                <mesh ref={leftTurbineRef} position={[-0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <circleGeometry args={[0.3, 16]} />
                    <meshStandardMaterial color="#44aaff" emissive="#44aaff" emissiveIntensity={2} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Right Engine */}
            <group position={[-1.0, -0.5, -1.8]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.35, 0.35, 1.2, 16]} />
                    <meshStandardMaterial color="#888" metalness={0.6} roughness={0.2} />
                </mesh>
                <mesh ref={rightTurbineRef} position={[-0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <circleGeometry args={[0.3, 16]} />
                    <meshStandardMaterial color="#44aaff" emissive="#44aaff" emissiveIntensity={2} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    );
}

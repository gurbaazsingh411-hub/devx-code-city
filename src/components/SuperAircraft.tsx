"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WHITE = new THREE.Color("#ffffff");

export default function SuperAircraft() {
    const groupRef = useRef<THREE.Group>(null);
    const leftWingRef = useRef<THREE.Mesh>(null);
    const rightWingRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const thrustersRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            // Subtle bobbing and banking
            groupRef.current.position.y += Math.sin(t * 2) * 0.05;
            groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.1;
            groupRef.current.rotation.x = Math.cos(t * 1.5) * 0.05;
        }

        if (leftWingRef.current && rightWingRef.current) {
            const wingFlex = Math.sin(t * 4) * 0.05;
            leftWingRef.current.rotation.z = -0.2 + wingFlex;
            rightWingRef.current.rotation.z = 0.2 - wingFlex;
        }

        if (coreRef.current) {
            const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
            coreMat.emissiveIntensity = 4 + Math.sin(t * 8) * 2;
        }

        if (thrustersRef.current) {
            thrustersRef.current.children.forEach((c) => {
                const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
                mat.emissiveIntensity = 8 + Math.sin(t * 15) * 4;
            });
        }
    });

    return (
        <group ref={groupRef} scale={[3, 3, 3]} rotation={[0, Math.PI / 2, 0]}>
            {/* Main Fuselage */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4, 0.8, 1.2]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Cockpit / Nose */}
            <mesh position={[2.2, 0, 0]}>
                <coneGeometry args={[0.5, 1.5, 4]} rotation={[0, 0, -Math.PI / 2]} />
                <meshStandardMaterial color="#0af" emissive="#0af" emissiveIntensity={2} />
            </mesh>

            {/* Wings */}
            <mesh ref={leftWingRef} position={[0, 0, 1]}>
                <boxGeometry args={[2, 0.1, 3]} />
                <meshStandardMaterial color="#333" metalness={0.8} />
            </mesh>
            <mesh ref={rightWingRef} position={[0, 0, -1]}>
                <boxGeometry args={[2, 0.1, 3]} />
                <meshStandardMaterial color="#333" metalness={0.8} />
            </mesh>

            {/* Central Power Core */}
            <mesh ref={coreRef} position={[-0.5, 0, 0]}>
                <boxGeometry args={[1, 0.9, 0.9]} />
                <meshStandardMaterial color="#40ff80" emissive="#40ff80" emissiveIntensity={5} />
            </mesh>

            {/* Rear Thrusters */}
            <group ref={thrustersRef} position={[-2.2, 0, 0]}>
                <mesh position={[0, 0, 0.4]}>
                    <cylinderGeometry args={[0.3, 0.4, 0.6, 8]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={10} />
                </mesh>
                <mesh position={[0, 0, -0.4]}>
                    <cylinderGeometry args={[0.3, 0.4, 0.6, 8]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={10} />
                </mesh>
            </group>

            {/* Tail Fin */}
            <mesh position={[-1.8, 0.6, 0]}>
                <boxGeometry args={[1, 1.2, 0.1]} />
                <meshStandardMaterial color="#222" metalness={0.9} />
            </mesh>
        </group>
    );
}

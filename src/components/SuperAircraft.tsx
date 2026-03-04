"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SuperAircraft() {
    const groupRef = useRef<THREE.Group>(null);
    const leftTurbineRef = useRef<THREE.Mesh>(null);
    const rightTurbineRef = useRef<THREE.Mesh>(null);

    const b2Shape = useMemo(() => {
        const shape = new THREE.Shape();
        // Start at center tail
        shape.moveTo(-1.0, 0);

        // Right side of the flying wing
        shape.lineTo(-0.2, 0.8);
        shape.lineTo(-1.3, 1.8);
        shape.lineTo(-0.3, 3.3);
        shape.lineTo(-2.0, 5.0);

        // Right leading edge to nose
        shape.lineTo(2.2, 0);

        // Left leading edge from nose to left wingtip
        shape.lineTo(-2.0, -5.0);

        // Left trailing edges
        shape.lineTo(-0.3, -3.3);
        shape.lineTo(-1.3, -1.8);
        shape.lineTo(-0.2, -0.8);
        shape.lineTo(-1.0, 0);
        return shape;
    }, []);

    const extrudeSettings = {
        depth: 0.15,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSteps: 3,
        bevelSize: 0.1,
        bevelThickness: 0.05,
        curveSegments: 24, // Much smoother curves
    };

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            // Very stable, ominous flight characteristics for a heavy bomber
            groupRef.current.position.y += Math.sin(t * 2) * 0.02;
            groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
            groupRef.current.rotation.x = Math.cos(t * 1.5) * 0.02;
        }

        if (leftTurbineRef.current && rightTurbineRef.current) {
            const glow = 1.5 + Math.sin(t * 15) * 0.5;
            const leftMat = leftTurbineRef.current.material as THREE.MeshStandardMaterial;
            const rightMat = rightTurbineRef.current.material as THREE.MeshStandardMaterial;
            if (leftMat && rightMat) {
                leftMat.emissiveIntensity = glow;
                rightMat.emissiveIntensity = glow;
            }
        }
    });

    return (
        <group ref={groupRef} scale={[3, 3, 3]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Main B-2 Bomber Stealth Wing */}
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.075, 0]}>
                <extrudeGeometry args={[b2Shape, extrudeSettings]} />
                <meshStandardMaterial color="#1a1c22" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Central Cockpit / Payload Bulge */}
            <mesh position={[0, 0.15, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                <capsuleGeometry args={[0.35, 1.5, 32, 32]} />
                <meshStandardMaterial color="#202228" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Dark Cockpit Windows (distinct dual windshields) */}
            <mesh position={[0.18, 0.25, 1.1]} rotation={[-Math.PI / 8, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.3]} />
                <meshStandardMaterial color="#020408" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-0.18, 0.25, 1.1]} rotation={[-Math.PI / 8, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.3]} />
                <meshStandardMaterial color="#020408" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Top Engine Intakes */}
            <mesh position={[0.7, 0.18, -0.2]} rotation={[Math.PI / 16, 0, 0]}>
                <boxGeometry args={[0.6, 0.15, 0.9]} />
                <meshStandardMaterial color="#111318" metalness={0.6} roughness={0.6} />
            </mesh>
            <mesh position={[-0.7, 0.18, -0.2]} rotation={[Math.PI / 16, 0, 0]}>
                <boxGeometry args={[0.6, 0.15, 0.9]} />
                <meshStandardMaterial color="#111318" metalness={0.6} roughness={0.6} />
            </mesh>

            {/* Intake holes (black) */}
            <mesh position={[0.7, 0.20, 0.26]}>
                <boxGeometry args={[0.4, 0.08, 0.05]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.7, 0.20, 0.26]}>
                <boxGeometry args={[0.4, 0.08, 0.05]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Turbine Exhausts Glowing on the trailing edge */}
            <group position={[0.7, 0.05, -0.7]}>
                <mesh ref={leftTurbineRef} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.7, 0.08]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} side={THREE.DoubleSide} />
                </mesh>
            </group>
            <group position={[-0.7, 0.05, -0.7]}>
                <mesh ref={rightTurbineRef} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.7, 0.08]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Subtle underbelly tech accent lines */}
            <mesh position={[0, -0.12, 0]}>
                <boxGeometry args={[0.5, 0.05, 2.5]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

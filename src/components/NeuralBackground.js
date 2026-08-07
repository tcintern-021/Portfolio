/**
 * NeuralBackground — Interactive 3D particle system (neural network visualization).
 *
 * Built with Three.js via @react-three/fiber and @react-three/drei.
 * Features:
 * - ~180 particle nodes connected by translucent lines forming a neural network
 * - Slow orbital auto-rotation
 * - Mouse-responsive position shift (particles subtly follow cursor)
 * - Auto-disables on mobile (<768px) with graceful CSS gradient fallback
 * - Uses requestAnimationFrame-based animation via useFrame hook
 */
'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Configuration ── */
const PARTICLE_COUNT = 180;
const SPREAD = 8;
const CONNECTION_DISTANCE = 2.2;
const ROTATION_SPEED = 0.0003;
const MOUSE_INFLUENCE = 0.8;

/**
 * ParticleNetwork — The core Three.js scene rendered inside the Canvas.
 * Generates random 3D node positions, connects nearby nodes with lines,
 * and animates the whole system with rotation + mouse reactivity.
 */
function ParticleNetwork() {
  const groupRef = useRef();
  const linesRef = useRef();
  const pointsRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  /* ── Generate particle positions once ── */
  const { positions, linePositions, lineCount } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const tempPositions = [];

    /* Distribute particles in a spherical cluster */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPREAD * Math.cbrt(Math.random()); // cube root for uniform sphere fill

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      tempPositions.push(new THREE.Vector3(x, y, z));
    }

    /* Compute connection lines between nearby particles */
    const lines = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dist = tempPositions[i].distanceTo(tempPositions[j]);
        if (dist < CONNECTION_DISTANCE) {
          lines.push(
            tempPositions[i].x, tempPositions[i].y, tempPositions[i].z,
            tempPositions[j].x, tempPositions[j].y, tempPositions[j].z
          );
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
      lineCount: lines.length / 6,
    };
  }, []);

  /* ── Track mouse position for parallax effect ── */
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ── Animation loop: rotation + mouse influence ── */
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    /* Slow auto-rotation */
    groupRef.current.rotation.y += ROTATION_SPEED;
    groupRef.current.rotation.x += ROTATION_SPEED * 0.3;

    /* Smooth mouse-reactive offset */
    const targetX = mousePos.current.x * MOUSE_INFLUENCE;
    const targetY = mousePos.current.y * MOUSE_INFLUENCE;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* ── Particle Dots ── */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#ffffff"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* ── Connection Lines ── */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/**
 * NeuralBackground — Exported component that wraps the Three.js Canvas.
 * Handles mobile detection and graceful degradation.
 */
export default function NeuralBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ── Detect viewport and hydration ── */
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Pre-hydration: render nothing to avoid SSR mismatch ── */
  if (!mounted) return null;

  /* ── Mobile fallback: subtle gradient background instead of 3D ── */
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(20, 20, 60, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]} /* Cap pixel ratio for performance */
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}

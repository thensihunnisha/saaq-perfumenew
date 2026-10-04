"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { HERO_BOTTLE_IMAGE } from "@/components/home/heroBottleTextures";
import type { HeroMotionState } from "@/components/home/heroMotion";

type HeroBottleCanvasProps = {
  motionRef: MutableRefObject<HeroMotionState>;
  reduced: boolean;
  compact: boolean;
  onReady?: () => void;
};

function HeroImage({
  motionRef,
  reduced,
  texture,
  aspect,
}: {
  motionRef: MutableRefObject<HeroMotionState>;
  reduced: boolean;
  texture: THREE.Texture;
  aspect: number;
}) {
  const group = useRef<THREE.Group>(null);
  const height = 2.55;
  const width = height * aspect;

  useFrame((state, delta) => {
    const frame = group.current;
    if (!frame) {
      return;
    }

    const motion = motionRef.current;
    const progress = motion.progress;
    const targetY = THREE.MathUtils.lerp(-0.28, Math.PI * 2.05, progress);
    const targetX =
      THREE.MathUtils.lerp(0.03, -0.06, progress) + motion.pointerY * 0.06;
    const targetZ = motion.pointerX * 0.025;

    frame.rotation.y = THREE.MathUtils.damp(frame.rotation.y, targetY, 5.4, delta);
    frame.rotation.x = THREE.MathUtils.damp(frame.rotation.x, targetX, 5.4, delta);
    frame.rotation.z = THREE.MathUtils.damp(frame.rotation.z, targetZ, 5.4, delta);

    if (!reduced) {
      frame.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroBottleCanvas({
  motionRef,
  reduced,
  compact,
  onReady,
}: HeroBottleCanvasProps) {
  const [photo, setPhoto] = useState<{
    texture: THREE.Texture;
    aspect: number;
  } | null>(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = HERO_BOTTLE_IMAGE;
    image.onload = () => {
      const texture = new THREE.Texture(image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
      setPhoto({
        texture,
        aspect: (image.naturalWidth || image.width) / (image.naturalHeight || image.height),
      });
    };
    return () => {
      image.onload = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      photo?.texture.dispose();
    };
  }, [photo]);

  if (!photo) {
    return null;
  }

  return (
    <Canvas
      camera={{
        position: compact ? [0, 0, 4.6] : [0.08, 0, 4.15],
        fov: compact ? 32 : 28,
      }}
      dpr={compact ? [1, 1.25] : [1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
    >
      <ambientLight intensity={1} />
      <HeroImage
        motionRef={motionRef}
        reduced={reduced}
        texture={photo.texture}
        aspect={photo.aspect}
      />
    </Canvas>
  );
}

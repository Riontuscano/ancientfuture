import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Text } from "@react-three/drei";

const Universe = () => {
  const { scene } = useGLTF("/models/Earth.glb");
  return <primitive object={scene} scale={1.5} position={[0, -10, 0]} />;
};

const SolarLoader = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 23], fov: 50 }}
      >
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={2} />

        <ambientLight intensity={0.5} color="#666" />
        <directionalLight
          position={[40, 10, 10]}
          intensity={1}
          color="#FFD700"
          castShadow
        />
        <pointLight position={[0, 5, 0]} intensity={5} color="#4444ff" />

        <RotatingUniverse />
        <OrbitControls enableZoom={false} enableRotate={true} />

        {/* 3D Floating Text */}
        <AncientFacts />
      </Canvas>
    </div>
  );
};

// 🌟 3D Floating Text Component
const AncientFacts = () => {
  return (
    <>
      <Text position={[-4, 8, 3]} fontSize={0.5} color="white">
        🏛️ Did you know? The world's first university, Takshashila, was in
        Ancient India!
      </Text>

      <Text position={[5, 6, 3]} fontSize={0.5} color="white">
        🔢 Did you know? The concept of zero was first used in India by
        Aryabhata!
      </Text>

      <Text position={[-3.3, 1, 3]} fontSize={4} color="orange">
        IN
      </Text>
      <Text position={[0, 1, 3]} fontSize={4} color={["#ffffff", "#00aaff"]}>
        D
      </Text>

      <Text position={[3, 1, 3]} fontSize={4} color="green">
        IA
      </Text>

      <Text position={[-8, -4, 3]} fontSize={0.5} color="white">
        ⚖️ Did you know? Ancient India had a well-developed legal system.
      </Text>

      <Text position={[6, -6, 4]} fontSize={0.5} color="white">
        🏹 Did you know? Chess (Chaturanga) was invented in India around the 6th
        century CE!
      </Text>
    </>
  );
};

const RotatingUniverse = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -8;
    }
  }, []);

  return (
    <group ref={groupRef}>
      <Universe />
    </group>
  );
};

export default SolarLoader;

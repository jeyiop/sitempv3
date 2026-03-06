'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Simple placeholder 3D object when no model is loaded
function Placeholder(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#1e3a8a'} />
    </mesh>
  );
}

// Model component that loads and displays a 3D model
function Model({ modelPath }: { modelPath: string }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      scale={1} 
      position={[0, 0, 0]}
    />
  );
}

// Main simulator component
export default function Simulator3D({ 
  modelPath = '', 
  backgroundColor = '#f5f5f5' 
}: { 
  modelPath?: string; 
  backgroundColor?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {modelPath ? (
          <Suspense fallback={<Placeholder position={[0, 0, 0]} />}>
            <Model modelPath={modelPath} />
          </Suspense>
        ) : (
          <Placeholder position={[0, 0, 0]} />
        )}
        
        <OrbitControls enableZoom={true} enablePan={true} />
        <Environment preset="sunset" />
        
        {/* Background */}
        <color attach="background" args={[backgroundColor]} />
      </Canvas>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-lg font-medium text-gray-700">Loading 3D model...</div>
        </div>
      )}
    </div>
  );
}

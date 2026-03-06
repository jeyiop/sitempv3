'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Palette, Eye, ClipboardList } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getModels3D, Model3D } from '@/lib/api/models-3d';

// Type definitions
type MaterialType = 'matte' | 'glossy' | 'textured';

type DisplayStandProps = {
  color: string;
  material: MaterialType;
  height: number;
};

// Component to load and display actual 3D models
const Model3DLoader = ({ modelUrl, color, material, height }: { modelUrl: string; color: string; material: MaterialType; height: number }) => {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const modelRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    if (gltf && gltf.scene) {
      // Apply material and color
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: material === 'glossy' ? 0.1 : material === 'matte' ? 0.8 : 0.5,
            metalness: material === 'glossy' ? 0.3 : 0.1,
          });
        }
      });
      
      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Move model to center
      gltf.scene.position.x = -center.x;
      gltf.scene.position.y = -center.y;
      gltf.scene.position.z = -center.z;
      
      // Scale based on height control (height represents desired size in meters)
      // Calculate scale to match the height slider value
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = 2 / maxDim; // Base scale to fit in view
      const heightScale = height / 1.5; // Scale relative to default 1.5m
      const finalScale = baseScale * heightScale;
      
      gltf.scene.scale.set(finalScale, finalScale, finalScale);
    }
  }, [gltf, color, material, height]);
  
  return <primitive ref={modelRef} object={gltf.scene} />;
};

// Placeholder 3D model component
const DisplayStand = ({ color, material, height, ...props }: DisplayStandProps) => {
  
  return (
    <group {...props} dispose={null}>
      <mesh 
        // geometry={nodes.Stand.geometry}
        // material={materials[material]}
        position={[0, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color={color} roughness={material === 'glossy' ? 0.1 : 0.8} />
      </mesh>
      
      {/* Shelves */}
      {[0.25, 0.5, 0.75].map((h) => (
        <mesh 
          key={h} 
          position={[0, height * h, 0.3]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color={color} roughness={material === 'glossy' ? 0.1 : 0.8} />
        </mesh>
      ))}
    </group>
  );
};

// Rotating platform
type PlatformProps = {
  children: React.ReactNode;
};

const Platform = ({ children }: PlatformProps) => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });
  
  return <group ref={ref}>{children}</group>;
};

// Controls panel component
type ControlsPanelProps = {
  color: string;
  setColor: (color: string) => void;
  material: MaterialType;
  setMaterial: (material: MaterialType) => void;
  height: number;
  setHeight: (height: number) => void;
  models: Model3D[];
  selectedModel: Model3D | null;
  setSelectedModel: (model: Model3D | null) => void;
};

const ControlsPanel = ({ color, setColor, material, setMaterial, height, setHeight, models, selectedModel, setSelectedModel }: ControlsPanelProps) => {
  const colorOptions = [
    { value: '#0A2472', label: 'Navy Blue' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#FFD700', label: 'Yellow' },
    { value: '#000000', label: 'Black' },
    { value: '#FF4500', label: 'Red-Orange' },
  ];
  
  const materialOptions: Array<{ value: MaterialType; label: string }> = [
    { value: 'matte', label: 'Matte' },
    { value: 'glossy', label: 'Glossy' },
    { value: 'textured', label: 'Textured' },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-navy mb-4">Personnalisez votre PLV</h2>
      
      <div className="space-y-6">
        {/* Model selection with thumbnails */}
        {models.length > 0 && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-medium text-navy mb-3">Choisir un modèle</h3>
            <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {/* Default model option */}
              <button
                onClick={() => setSelectedModel(null)}
                className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:shadow-md bg-white ${
                  !selectedModel
                    ? 'border-navy ring-2 ring-navy/20 shadow-md'
                    : 'border-gray-300 hover:border-navy/50'
                }`}
              >
                <div className="w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-2">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center">Par défaut</span>
                {!selectedModel && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Model options with thumbnails */}
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:shadow-md bg-white ${
                    selectedModel?.id === model.id
                      ? 'border-navy ring-2 ring-navy/20 shadow-md'
                      : 'border-gray-300 hover:border-navy/50'
                  }`}
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                    {model.thumbnailUrl ? (
                      <img
                        src={model.thumbnailUrl}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-center line-clamp-2">{model.name}</span>
                  {model.description && (
                    <span className="text-xs text-gray-500 text-center mt-1 line-clamp-1">{model.description}</span>
                  )}
                  {selectedModel?.id === model.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Color selection */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Couleur</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setColor(option.value)}
                className={`w-10 h-10 rounded-full border-2 ${
                  color === option.value ? 'border-navy scale-110' : 'border-gray-200'
                } transition-transform`}
                style={{ backgroundColor: option.value }}
                title={option.label}
                aria-label={`Select ${option.label} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Material selection */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Finition</h3>
          <div className="grid grid-cols-3 gap-2">
            {materialOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMaterial(option.value)}
                className={`py-2 px-3 rounded ${
                  material === option.value 
                    ? 'bg-navy text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Height slider */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Hauteur: {height}m</h3>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="w-full accent-navy"
          />
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-navy text-white py-3 rounded-md font-medium"
            onClick={() => {
              // This would trigger a download of the configuration
              alert('Votre configuration a été téléchargée!');
            }}
          >
            Télécharger
          </motion.button>
          <Link href="/devis" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow text-navy py-3 rounded-md font-medium"
            >
              Demander un devis
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Simulateur() {
  // State for configurator
  const [color, setColor] = useState('#0A2472');
  const [material, setMaterial] = useState<MaterialType>('matte');
  const [height, setHeight] = useState(1.5);
  const [models, setModels] = useState<Model3D[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getModels3D({ category: 'plv' });
        console.log('📦 Loaded 3D models:', data);
        data.forEach((model, index) => {
          console.log(`   Model ${index + 1}: ${model.name}`);
          console.log(`   - ID: ${model.id}`);
          console.log(`   - Model URL: ${model.modelUrl || '❌ NO MODEL URL'}`);
          console.log(`   - Thumbnail URL: ${model.thumbnailUrl || 'No thumbnail'}`);
        });
        setModels(data);
        // Don't auto-select a model - let user choose
        // Start with "Par défaut" (null) selected
      } catch (error) {
        console.error('Error fetching 3D models:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);
  
  useEffect(() => {
    if (selectedModel) {
      console.log('🎯 Model selected:', selectedModel.name);
      console.log('   - Model URL:', selectedModel.modelUrl || '❌ NO MODEL URL SET');
      console.log('   - Has modelUrl?', !!selectedModel.modelUrl);
    } else {
      console.log('🎯 Default model selected (Par défaut)');
    }
  }, [selectedModel]);
  
  return (
    <div className="min-h-screen">
      <section className="pt-1 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="border-b border-[#000B58]/10 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-4 max-w-2xl"
            >
              <h1 className="text-xl md:text-2xl uppercase tracking-[0.35em] text-[#000B58]">
                Simulateur 3D
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#000B58]/70">
                Visualisez et personnalisez vos solutions PLV en temps réel grâce à notre outil 3D interactif.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Simulator Section */}
      <section className="pt-12 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* 3D Canvas - Takes up 3/5 of the space on large screens */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden relative">
              {selectedModel && !selectedModel.modelUrl && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 z-10">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️ Le modèle "{selectedModel.name}" n'a pas de fichier 3D.
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Allez au tableau de bord pour télécharger un fichier GLB/GLTF pour ce modèle.
                  </p>
                </div>
              )}
              <div className="h-[500px] md:h-[600px]">
                <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <Suspense fallback={
                    <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[0.5, 0.5, 0.5]} />
                      <meshStandardMaterial color="#cccccc" />
                    </mesh>
                  }>
                    <Platform>
                      {selectedModel && selectedModel.modelUrl ? (
                        <Model3DLoader 
                          key={selectedModel.id}
                          modelUrl={selectedModel.modelUrl} 
                          color={color} 
                          material={material} 
                          height={height} 
                        />
                      ) : (
                        <DisplayStand color={color} material={material} height={height} />
                      )}
                    </Platform>
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={5} />
                  </Suspense>
                  <OrbitControls 
                    enablePan={false} 
                    minPolarAngle={Math.PI / 6} 
                    maxPolarAngle={Math.PI / 2} 
                    target={[0, 0.5, 0]}
                  />
                </Canvas>
              </div>
            </div>
            
            {/* Controls Panel - Takes up 2/5 of the space on large screens */}
            <div className="lg:col-span-2">
              <ControlsPanel 
                color={color} 
                setColor={setColor}
                material={material}
                setMaterial={setMaterial}
                height={height}
                setHeight={setHeight}
                models={models}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600">
              Notre simulateur 3D vous permet de visualiser vos projets PLV avant leur fabrication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personnalisez',
                description: 'Choisissez les dimensions, matériaux, couleurs et finitions de votre PLV selon vos besoins.',
                icon: Palette
              },
              {
                title: 'Visualisez',
                description: 'Explorez votre création en 3D sous tous les angles pour visualiser le résultat final.',
                icon: Eye
              },
              {
                title: 'Demandez un devis',
                description: 'Envoyez-nous votre configuration pour recevoir un devis précis et personnalisé.',
                icon: ClipboardList
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 text-navy" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section
        className="py-20 bg-navy text-white"
        style={{ backgroundColor: '#000B58' }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl mb-10" style={{ color: '#FFFFFF' }}>
              Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir l'accompagnement de nos experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/devis"
                  className="bg-white text-[#000B58] px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/80 transition-colors"
                >
                  Demander un devis
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

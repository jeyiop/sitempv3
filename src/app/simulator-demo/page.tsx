'use client';

import { useState } from 'react';
import Simulator3D from '@/components/Simulator3D';

export default function SimulatorDemo() {
  const [selectedModel, setSelectedModel] = useState('');
  
  // Sample 3D model options (you'll need to add actual model files to your public folder)
  const modelOptions = [
    { id: 'model1', name: 'Campagne Model 1', path: '/models/campagne1.glb' },
    { id: 'model2', name: 'Campagne Model 2', path: '/models/campagne2.glb' },
    { id: 'default', name: 'Default Cube', path: '' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">3D Campagne Object Simulator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* 3D Simulator Component */}
          <Simulator3D modelPath={selectedModel} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select a 3D Model</h2>
          
          <div className="space-y-3">
            {modelOptions.map((model) => (
              <div key={model.id} className="flex items-center">
                <input
                  type="radio"
                  id={model.id}
                  name="model"
                  value={model.path}
                  checked={selectedModel === model.path}
                  onChange={() => setSelectedModel(model.path)}
                  className="mr-3 accent-blue-600"
                />
                <label htmlFor={model.id} className="text-gray-700">
                  {model.name}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Use mouse to rotate the model</li>
              <li>Scroll to zoom in/out</li>
              <li>Right-click and drag to pan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

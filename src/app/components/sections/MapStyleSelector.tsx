import React, { useState } from 'react';

interface MapStyleSelectorProps {
  onStyleChange: (style: MapStyle) => void;
  currentStyle: string;
}

export interface MapStyle {
  name: string;
  url: string;
  attribution: string;
  description: string;
  preview?: string;
}

export const mapStyles: MapStyle[] = [
  {
    name: 'Clean Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    description: 'Style minimal dan clean, perfect untuk fokus ke markers'
  },
  {
    name: 'Clean Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    description: 'Dark theme yang elegant dan modern'
  },
  {
    name: 'No Labels',
    url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    description: 'Tanpa label sama sekali - ultra clean untuk markers'
  },
  {
    name: 'Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    description: 'Balanced style dengan warna yang soft'
  },
  {
    name: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    description: 'OpenStreetMap standard (detail tinggi)'
  }
];

const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({ onStyleChange, currentStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentStyleObj = mapStyles.find(style => style.name === currentStyle) || mapStyles[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-sm border border-gray-200"
      >
        <span>🎨</span>
        <span className="font-medium">{currentStyleObj.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 mb-2">Pilih Style Map</h3>
            <div className="space-y-2">
              {mapStyles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => {
                    onStyleChange(style);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    currentStyle === style.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900">{style.name}</span>
                    {currentStyle === style.name && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapStyleSelector;

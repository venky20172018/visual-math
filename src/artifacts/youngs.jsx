import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const YoungsModulusExplorer = () => {
  const [force, setForce] = useState(0);
  
  const materials = [
    { name: 'Plastic', modulus: 3, color: '#DC2626', emoji: '🟥', breathing: 'Flame Breathing', item: '🔥 Kyojuro\'s Sword' },
    { name: 'Wood', modulus: 11, color: '#92400E', emoji: '🪵', breathing: 'Thunder Breathing', item: '⚡ Zenitsu\'s Blade' },
    { name: 'Aluminum', modulus: 69, color: '#94A3B8', emoji: '⚙️', breathing: 'Water Breathing', item: '💧 Tanjiro\'s Nichirin' },
    { name: 'Steel', modulus: 200, color: '#1E293B', emoji: '🔩', breathing: 'Stone Breathing', item: '🗻 Gyomei\'s Axe' }
  ];
  
  const originalLength = 100;
  const maxDisplayLength = 600;
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gradient-to-br from-purple-900 via-red-900 to-black rounded-lg shadow-2xl">
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-yellow-300 mb-1" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(239, 68, 68, 0.5)' }}>
          ⚔️ Young's Modulus Training Arena ⚔️
        </h1>
        <p className="text-lg text-yellow-200 font-semibold">Master the Breathing Styles!</p>
      </div>
      
      <Card className="mb-4 bg-gradient-to-r from-red-800 to-orange-800 border-2 border-yellow-500 shadow-xl">
        <CardContent className="pt-4 pb-4">
          <div className="text-center text-2xl text-yellow-200 font-bold mb-2">
            🔥 Pull Force: {force} N 🔥
          </div>
          <Slider
            value={[force]}
            onValueChange={(val) => setForce(val[0])}
            min={0}
            max={200}
            step={5}
            className="w-full h-3"
          />
          <div className="flex justify-between text-xs text-yellow-300 mt-1 font-semibold">
            <span>0 N</span>
            <span>200 N</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3 mb-4">
        {materials.map((mat) => {
          const stretch = force === 0 ? 0 : (force / mat.modulus) * 6;
          const finalLength = originalLength + stretch;
          
          return (
            <Card key={mat.name} className="bg-black/90 shadow-xl overflow-hidden border-2 hover:scale-[1.01] transition-all" style={{ borderColor: mat.color }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{mat.emoji}</div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-yellow-200">{mat.name}</div>
                    <div className="text-xs text-red-300 font-semibold">{mat.breathing} - {mat.item}</div>
                    <div className="text-xs text-cyan-400 font-bold">Young's Modulus: {mat.modulus} GPa</div>
                  </div>
                  <div className="text-right mr-2">
                    <div className="text-xl font-bold text-yellow-400">{stretch.toFixed(1)} mm</div>
                    <div className="text-xs text-gray-400">stretch</div>
                  </div>
                </div>
                
                <div className="relative h-16 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-400">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-10 bg-gradient-to-b from-gray-600 to-gray-900 rounded border-2 border-gray-500 flex items-center justify-center">
                    <div className="w-3 h-6 bg-gray-800 rounded"></div>
                  </div>
                  
                  <div 
                    className="absolute left-8 top-1/2 -translate-y-1/2 h-6 rounded transition-all duration-500 ease-out"
                    style={{ 
                      width: `${finalLength}px`,
                      background: `linear-gradient(90deg, ${mat.color}, ${mat.color}cc)`,
                      boxShadow: `0 0 20px ${mat.color}99`,
                      border: `2px solid ${mat.color}`
                    }}
                  ></div>
                  
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-12 bg-gradient-to-b from-gray-600 to-gray-900 rounded border-2 transition-all duration-500 ease-out"
                    style={{ 
                      left: `${8 + finalLength}px`,
                      borderColor: mat.color
                    }}
                  >
                    {force > 0 && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xl animate-pulse">
                        ⚔️
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="bg-gradient-to-r from-red-900 to-orange-900 border-2 border-yellow-500 shadow-2xl">
        <CardHeader className="border-b-2 border-yellow-500 pb-3">
          <CardTitle className="text-2xl text-yellow-200 font-bold text-center">
            📜 The Sacred Formula 📜
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="bg-black/80 p-4 rounded-lg shadow-inner border-2 border-red-600">
            <div className="text-center text-xl font-mono font-bold text-yellow-300 mb-1">
              Stretch = (Force × Length) ÷ (Young's Modulus × Area)
            </div>
            <div className="text-center text-base text-red-300 font-semibold">
              ΔL = (F × L) ÷ (E × A)
            </div>
          </div>
          
          <div className="bg-black/80 p-4 rounded-lg space-y-2 border border-red-600">
            <p className="text-base text-red-100 leading-relaxed">
              <span className="font-bold text-yellow-400">Young's Modulus (E)</span> determines each breathing style's resistance!
            </p>
            
            <div className="pl-3 space-y-2 text-sm">
              <p className="text-red-200">
                🔥 <span className="font-bold text-red-400">LOW E</span> (Rubber = 0.05) → Small divider → <span className="font-bold text-yellow-400">BIG stretch!</span>
              </p>
              <p className="text-red-200">
                🗻 <span className="font-bold text-blue-400">HIGH E</span> (Steel = 200) → Big divider → <span className="font-bold text-gray-300">tiny stretch!</span>
              </p>
            </div>
            
            <div className="mt-3 p-3 bg-gradient-to-r from-yellow-900 to-orange-900 rounded-lg border-2 border-yellow-500">
              <p className="text-base font-bold text-yellow-100">
                ⚔️ Same power ÷ small number = BIG result! Flame bends, Stone stands! ⚔️
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YoungsModulusExplorer;
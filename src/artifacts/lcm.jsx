import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const LCMVisualization = () => {
  const [num1, setNum1] = useState(2);
  const [num2, setNum2] = useState(3);
  const [lcm, setLCM] = useState(6);

  const calculateLCM = (a, b) => {
    const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
    return (a * b) / gcd(a, b);
  };

  useEffect(() => {
    setLCM(calculateLCM(num1, num2));
  }, [num1, num2]);

  const generateMultiples = (num) => {
    return Array.from({ length: 10 }, (_, i) => (i + 1) * num);
  };

  const getBarColor = (multiple, otherNum) => {
    if (multiple === lcm) return '#10B981'; // green for LCM
    if (multiple % otherNum === 0) return '#F59E0B'; // orange for other common multiples
    return '#3B82F6'; // blue for non-common multiples
  };

  const renderBars = (num, otherNum) => {
    const multiples = generateMultiples(num);
    const maxMultiple = Math.max(...multiples, lcm);
    
    return multiples.map((multiple, index) => (
      <div
        key={index}
        className="w-6 mx-1 flex flex-col items-center justify-end relative"
        style={{
          height: `${(multiple / maxMultiple) * 100}%`,
          backgroundColor: getBarColor(multiple, otherNum)
        }}
      >
        <span className="text-xs text-white mb-1">{multiple}</span>
        {multiple === lcm && (
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-600">
            LCM
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">LCM Visualization Tool</h2>
      
      <div className="flex justify-between mb-6 gap-4">
        <div className="flex-1">
          <label className="block mb-2">Number 1: {num1}</label>
          <Slider
            value={[num1]}
            onValueChange={(value) => setNum1(value[0])}
            max={10}
            min={1}
            step={1}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2">Number 2: {num2}</label>
          <Slider
            value={[num2]}
            onValueChange={(value) => setNum2(value[0])}
            max={10}
            min={1}
            step={1}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-center">LCM: {lcm}</h3>
      </div>
      
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-medium mb-2 text-center">Multiples of {num1}:</h4>
          <div className="flex items-end justify-center h-64 mt-8">{renderBars(num1, num2)}</div>
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-2 text-center">Multiples of {num2}:</h4>
          <div className="flex items-end justify-center h-64 mt-8">{renderBars(num2, num1)}</div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span>Non-common multiple</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <span>Common multiple</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>LCM</span>
        </div>
      </div>
    </div>
  );
};

export default LCMVisualization;
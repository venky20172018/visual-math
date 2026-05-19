import React, { useState, useEffect } from 'react';

const RatioVisualizationTool = () => {
  const [ratio, setRatio] = useState({ a: 3, b: 2 });
  const [percentages, setPercentages] = useState({ a: 0, b: 0 });

  useEffect(() => {
    updatePercentages();
  }, [ratio]);

  const updatePercentages = () => {
    const total = ratio.a + ratio.b;
    setPercentages({
      a: (ratio.a / total * 100).toFixed(1),
      b: (ratio.b / total * 100).toFixed(1)
    });
  };

  const handleSliderChange = (part, value) => {
    const newValue = parseInt(value);
    setRatio(prev => ({ ...prev, [part]: newValue }));
  };

  const CircleVisualization = () => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeWidth = 20;
    const center = radius + strokeWidth / 2;
    const size = (radius + strokeWidth) * 2;

    const aStrokeDasharray = `${circumference * ratio.a / (ratio.a + ratio.b)} ${circumference}`;
    const bStrokeDasharray = `${circumference * ratio.b / (ratio.a + ratio.b)} ${circumference}`;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F97316"
          strokeWidth={strokeWidth}
          strokeDasharray={aStrokeDasharray}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#FACC15"
          strokeWidth={strokeWidth}
          strokeDasharray={bStrokeDasharray}
          strokeDashoffset={-circumference * ratio.a / (ratio.a + ratio.b)}
        />
        <text x={center} y={center} textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="#18181b">
          {ratio.a + ratio.b}
        </text>
      </svg>
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white text-zinc-900 rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center">Interactive Ratio Visualization</h2>
      
      <div className="mb-2 flex items-center justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label htmlFor="sliderA" className="mb-1">A: {ratio.a}</label>
          <input
            id="sliderA"
            type="range"
            min="1"
            max="20"
            value={ratio.a}
            onChange={(e) => handleSliderChange('a', e.target.value)}
            className="w-48"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="sliderB" className="mb-1">B: {ratio.b}</label>
          <input
            id="sliderB"
            type="range"
            min="1"
            max="20"
            value={ratio.b}
            onChange={(e) => handleSliderChange('b', e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      <p className="text-center font-semibold mb-4">Ratio: {ratio.a} : {ratio.b}</p>

      <div className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden mb-2">
        <div className="h-full flex">
          <div 
            style={{width: `${percentages.a}%`}} 
            className="bg-orange-500 flex items-center justify-center text-white font-bold"
          >
            {ratio.a}
          </div>
          <div 
            style={{width: `${percentages.b}%`}} 
            className="bg-yellow-500 flex items-center justify-center text-white font-bold"
          >
            {ratio.b}
          </div>
        </div>
      </div>

      <p className="text-center font-semibold mb-4">Total: {ratio.a + ratio.b}</p>

      <div className="flex justify-center mb-4">
        <CircleVisualization />
      </div>

      <div className="text-center space-y-2">
        <div>
          <span className="inline-block w-4 h-4 bg-orange-500 mr-2"></span>
          <span className="mr-4">A: {ratio.a} ({percentages.a}%)</span>
          <span className="inline-block w-4 h-4 bg-yellow-500 mr-2"></span>
          <span>B: {ratio.b} ({percentages.b}%)</span>
        </div>
      </div>
    </div>
  );
};

export default RatioVisualizationTool;
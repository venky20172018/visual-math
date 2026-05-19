import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HCFVisualization = () => {
  const [num1, setNum1] = useState(48);
  const [num2, setNum2] = useState(18);
  const [hcf, setHCF] = useState(6);
  const [steps, setSteps] = useState([]);
  const [factors1, setFactors1] = useState([]);
  const [factors2, setFactors2] = useState([]);
  const [commonFactors, setCommonFactors] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const calculateHCF = (a, b) => {
    const steps = [];
    while (b !== 0) {
      steps.push(`${a} = ${Math.floor(a / b)} × ${b} + ${a % b}`);
      const temp = b;
      b = a % b;
      a = temp;
    }
    return { hcf: a, steps };
  };

  const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  useEffect(() => {
    const { hcf, steps } = calculateHCF(num1, num2);
    setHCF(hcf);
    setSteps(steps);
    
    const factors1 = getFactors(num1);
    const factors2 = getFactors(num2);
    setFactors1(factors1);
    setFactors2(factors2);
    
    const commonFactors = factors1.filter(factor => factors2.includes(factor));
    setCommonFactors(commonFactors);
    
    setCurrentStep(0);
  }, [num1, num2]);

  const handleCalculate = () => {
    // Recalculate HCF and reset visualization
    const { hcf, steps } = calculateHCF(num1, num2);
    setHCF(hcf);
    setSteps(steps);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFactorBlock = (factor, isCommon, isHCF) => {
    let bgColor = 'bg-gray-200';
    if (isHCF) {
      bgColor = 'bg-green-500';
    } else if (isCommon) {
      bgColor = 'bg-yellow-300';
    }
    return (
      <div 
        key={factor} 
        className={`${bgColor} m-1 p-2 text-center text-black font-semibold rounded`}
        style={{ width: `${factor * 3}px`, height: '30px', minWidth: '30px' }}
      >
        {factor}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">HCF Visualization Tool</h2>
      
      <div className="flex justify-between mb-6 gap-4">
        <div className="flex-1">
          <label className="block mb-2">Number 1:</label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value) || 1)}
            min="1"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2">Number 2:</label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value) || 1)}
            min="1"
          />
        </div>
      </div>
      
      <Button onClick={handleCalculate} className="mb-4">Calculate HCF</Button>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">HCF: {hcf}</h3>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Factors Visualization:</h4>
        <div className="mb-4">
          <p className="font-semibold">Factors of {num1}:</p>
          <div className="flex flex-wrap">
            {factors1.map(factor => renderFactorBlock(factor, commonFactors.includes(factor), factor === hcf))}
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Factors of {num2}:</p>
          <div className="flex flex-wrap">
            {factors2.map(factor => renderFactorBlock(factor, commonFactors.includes(factor), factor === hcf))}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-gray-200 mr-2"></div>
          <span className="mr-4">Non-common factor</span>
          <div className="w-4 h-4 bg-yellow-300 mr-2"></div>
          <span className="mr-4">Common factor</span>
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>HCF</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Euclidean Algorithm Steps:</h4>
        <div className="mb-2">
          {steps.map((step, index) => (
            <p key={index} className={index === currentStep ? 'font-bold' : ''}>{step}</p>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrevStep} disabled={currentStep === 0}>Previous Step</Button>
          <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>Next Step</Button>
        </div>
      </div>
    </div>
  );
};

export default HCFVisualization;
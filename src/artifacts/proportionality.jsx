import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const ProportionalityVisualAndCalculator = () => {
  const [values, setValues] = useState({ a: '1', b: '1', c: '1', d: '4' });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkProportionality = () => {
    const { a, b, c, d } = values;
    if (a && b && c && d) {
      const leftSide = Number(a) * Number(d);
      const rightSide = Number(b) * Number(c);
      const isProportional = Math.abs(leftSide - rightSide) < 0.0001;
      setResult(isProportional);
    } else {
      setResult(null);
    }
  };

  const PieChartRatio = ({ value1, value2, label }) => {
    const num1 = Number(value1) || 0;
    const num2 = Number(value2) || 0;
    const total = num1 + num2;
    const percentage1 = total > 0 ? (num1 / total) * 100 : 0;
    const percentage2 = total > 0 ? (num2 / total) * 100 : 0;

    const data = [
      { name: 'Value1', value: num1, percentage: percentage1 },
      { name: 'Value2', value: num2, percentage: percentage2 },
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold mb-2">{label}</div>
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                <Cell key="cell-0" fill="#2196F3" />
                <Cell key="cell-1" fill="#4CAF50" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm font-bold">
          {total > 0 ? `${value1}:${value2}` : 'No data'}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Proportionality Law and Calculator</h2>
      
      {/* SVG Visualization */}
      <svg viewBox="0 0 400 200" className="w-full mb-8">
        <rect width="400" height="200" fill="#f0f0f0"/>
        <text x="200" y="30" fontSize="18" textAnchor="middle" fontWeight="bold">Proportionality Law</text>
        <text x="200" y="60" fontSize="24" textAnchor="middle">a : b :: c : d</text>
        <line x1="50" y1="100" x2="350" y2="140" stroke="red" strokeWidth="2"/>
        <line x1="50" y1="140" x2="350" y2="100" stroke="blue" strokeWidth="2"/>
        <text x="30" y="95" fontSize="24" fill="red">a</text>
        <text x="370" y="145" fontSize="24" fill="red">d</text>
        <text x="30" y="145" fontSize="24" fill="blue">b</text>
        <text x="370" y="95" fontSize="24" fill="blue">c</text>
        <text x="200" y="180" fontSize="24" textAnchor="middle">ad = bc</text>
      </svg>

      {/* Calculator */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input 
          type="number" 
          name="a" 
          value={values.a} 
          onChange={handleInputChange} 
          placeholder="Enter a"
        />
        <Input 
          type="number" 
          name="b" 
          value={values.b} 
          onChange={handleInputChange} 
          placeholder="Enter b"
        />
        <Input 
          type="number" 
          name="c" 
          value={values.c} 
          onChange={handleInputChange} 
          placeholder="Enter c"
        />
        <Input 
          type="number" 
          name="d" 
          value={values.d} 
          onChange={handleInputChange} 
          placeholder="Enter d"
        />
      </div>
      <Button onClick={checkProportionality} className="w-full mb-4">Check Proportionality</Button>

      {/* Pie Chart Representation */}
      <div className="flex justify-around mb-4">
        <PieChartRatio value1={values.a} value2={values.b} label="a : b" />
        <PieChartRatio value1={values.c} value2={values.d} label="c : d" />
      </div>

      {/* Result */}
      {result !== null && (
        <Alert variant={result ? "default" : "destructive"}>
          <AlertTitle className="text-2xl mb-2">{result ? "Proportional!" : "Not Proportional"}</AlertTitle>
          <AlertDescription>
            <p className="text-xl mb-2">
              {result 
                ? `The ratios ${values.a}:${values.b} and ${values.c}:${values.d} are proportional.` 
                : `The ratios ${values.a}:${values.b} and ${values.c}:${values.d} are not proportional.`
              }
            </p>
            <p className="text-3xl font-bold">
              {`${values.a} × ${values.d} ${result ? '=' : '≠'} ${values.b} × ${values.c}`}
            </p>
            <p className="text-3xl font-bold">
              {`${Number(values.a) * Number(values.d)} ${result ? '=' : '≠'} ${Number(values.b) * Number(values.c)}`}
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProportionalityVisualAndCalculator;
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const AlgebraicExpressionVisualizer = () => {
  const [expressions, setExpressions] = useState(['x', '2*x', 'x**2', '3*x + 1']);
  const [xValue, setXValue] = useState(1);
  const [chartData, setChartData] = useState([]);

  const evaluateExpression = (expression, x) => {
    try {
      if (!/^[\d\s+\-*/()x.]+$/.test(expression)) {
        return null;
      }
      const safeEval = new Function('x', `return ${expression}`);
      const result = safeEval(x);
      return isNaN(result) || !isFinite(result) ? null : result;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const newChartData = [{
      name: `x = ${xValue}`,
      ...expressions.reduce((acc, exp, index) => {
        acc[`exp${index + 1}`] = evaluateExpression(exp, xValue);
        return acc;
      }, {})
    }];
    setChartData(newChartData);
  }, [expressions, xValue]);

  const handleExpressionChange = (index, value) => {
    const newExpressions = [...expressions];
    newExpressions[index] = value;
    setExpressions(newExpressions);
  };

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const CustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <g>
        <rect x={x + width / 2 - 20} y={y - 30} width="40" height="20" fill="white" stroke="#888" rx="4" ry="4" />
        <text x={x + width / 2} y={y - 20} fill="#333" textAnchor="middle" dominantBaseline="middle" fontSize="12">
          {value !== null ? value.toFixed(2) : 'Invalid'}
        </text>
      </g>
    );
  };

  return (
    <Card className="w-full h-screen max-w-3xl mx-auto p-4 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Algebraic Expression Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-2 overflow-hidden">
        <div className="grid grid-cols-2 gap-2">
          {expressions.map((exp, index) => (
            <div key={index} className="flex items-center">
              <label htmlFor={`expression-${index}`} className="text-sm w-24 shrink-0">
                Expression {index + 1}:
              </label>
              <Input
                id={`expression-${index}`}
                value={exp}
                onChange={(e) => handleExpressionChange(index, e.target.value)}
                placeholder="e.g., 2*x + 1"
                className="text-sm h-8"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="xValue" className="text-sm w-24 shrink-0">x value: {xValue}</label>
          <Slider
            id="xValue"
            min={-20}
            max={20}
            step={1}
            value={[xValue]}
            onValueChange={(value) => setXValue(Math.round(value[0]))}
            className="flex-grow"
          />
        </div>

        <div className="flex-grow min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {expressions.map((exp, index) => (
                <Bar
                  key={`exp${index + 1}`}
                  dataKey={`exp${index + 1}`}
                  fill={colors[index % colors.length]}
                  name={exp}
                >
                  <LabelList dataKey={`exp${index + 1}`} content={<CustomizedLabel />} position="top" />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgebraicExpressionVisualizer;

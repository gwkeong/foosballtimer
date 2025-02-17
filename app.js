import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import { MinusCircle, PlusCircle } from 'lucide-react';

const TimerCounterApp = () => {
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [counters, setCounters] = useState([
    { id: 1, name: 'Jar 1', value: 0 },
    { id: 2, name: 'Jar 2', value: 0 }
  ]);

  useEffect(() => {
    let interval;
    if (isRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0.01) {
            setIsRunning(false);
            return 0;
          }
          return Math.max(0, prev - 0.01);
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, countdown]);

  const startTimer = (seconds) => {
    setCountdown(seconds);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const wholeSeconds = Math.floor(seconds);
    const milliseconds = Math.floor((seconds - wholeSeconds) * 100);
    return `${wholeSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const incrementCounter = (id) => {
    setCounters(prevCounters =>
      prevCounters.map(counter =>
        counter.id === id ? { ...counter, value: counter.value + 1 } : counter
      )
    );
  };

  const decrementCounter = (id) => {
    setCounters(prevCounters =>
      prevCounters.map(counter =>
        counter.id === id ? { ...counter, value: Math.max(0, counter.value - 1) } : counter
      )
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={() => startTimer(30)} className="w-48 h-12 text-xl" variant="outlined">
          30s
        </Button>
        <Button onClick={() => startTimer(90)} className="w-48 h-12 text-xl" variant="outlined">
          90s
        </Button>
      </div>
      <div className="mb-8 p-8 transition-colors duration-200">
        <div className="flex justify-center items-center">
          <div className="text-7xl font-mono font-bold">
            {formatTime(countdown)}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        {counters.map(counter => (
          <div key={counter.id} className="p-4 w-52">
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-lg font-semibold">{counter.name}</h2>
              <div className="text-2xl">{counter.value}</div>
              <div className="flex space-x-4">
                <Button onClick={() => decrementCounter(counter.id)} variant="outlined" size="small">
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <Button onClick={() => incrementCounter(counter.id)} variant="outlined" size="small">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-12">
        <Button onClick={() => startTimer(10)} className="w-96 h-96 flex items-center justify-center text-9xl font-bold bg-white text-black hover:bg-gray-100" variant="outlined">
          10s
        </Button>
        <Button onClick={() => startTimer(15)} className="w-96 h-96 flex items-center justify-center text-9xl font-bold bg-white text-black hover:bg-gray-100" variant="outlined">
          15s
        </Button>
      </div>
    </div>
  );
};

export default TimerCounterApp;

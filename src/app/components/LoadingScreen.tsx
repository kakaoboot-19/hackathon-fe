import { useState, useEffect, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './LoadingScreen.css';
import ProgressBar from '@ramonak/react-progress-bar';

const loadingSteps = [
  'ANALYZING GITHUB PROFILE',
  'CALCULATING STATS',
  'GENERATING CHARACTER',
  'CREATING CARD',
  'FINALIZING DATA'
];

interface LoadingScreenProps {
  estimatedDurationMs?: number;
  apiProgress?: number; // 0~100
}

export function LoadingScreen({ estimatedDurationMs = 15000, apiProgress = 0 }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');
  const [timeProgress, setTimeProgress] = useState(0);

  // Cycle through loading steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);

    return () => clearInterval(stepInterval);
  }, []);

  // Animate dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  // Time-based progress: climb toward 85% over estimatedDurationMs, then wait for API
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const ratio = Math.min(elapsed / estimatedDurationMs, 1);
      const next = Math.min(85, ratio * 85);
      setTimeProgress((prev) => (next > prev ? next : prev));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [estimatedDurationMs]);

  // Combine API progress with time progress
  const displayProgress = useMemo(() => {
    const clampedApi = Math.min(Math.max(apiProgress, 0), 100);
    const combined = Math.max(timeProgress, clampedApi);
    return Math.min(combined, 100);
  }, [apiProgress, timeProgress]);

  return (
    <div className="loading-container">
      {/* Animated Pixel Grid Pattern */}
      <div className="pixel-grid-pattern"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              backgroundColor: i % 3 === 0 ? 'rgba(242, 229, 48, 0.8)' : i % 3 === 1 ? 'rgba(242, 39, 134, 0.8)' : 'rgba(62, 178, 255, 0.8)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 10px currentColor`
            }}
          ></div>
        ))}
      </div>

      {/* Main Loading Container */}
      <div className="loading-content">
        {/* Title */}
        <div className="loading-title">
          <h1>LOADING</h1>
        </div>

        {/* Loading Box */}
        <div className="loading-box">
          {/* Inner Glow */}
          <div className="loading-box-glow"></div>

          {/* Content */}
          <div className="loading-box-content">
            {/* Pixel Loading Spinner */}
            <div className="spinner-container">
              {/* Rotating Outer Ring */}
              <div className="spinner-ring">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`spinner-pixel ${i % 2 === 0 ? 'spinner-pixel-pink' : 'spinner-pixel-blue'}`}
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-36px)`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Loading Text */}
            <div className="loading-text">
              <div className="loading-text-content">
                {loadingSteps[currentStep]}{dots}
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="progress-container">
              {/* Progress Label */}
              <div className="progress-label">
                <span>PROGRESS</span>
                <span>{Math.min(Math.floor(displayProgress), 100)}%</span>
              </div>

              {/* Progress Bar Background */}
              <div className="progress-bar-bg">
                {/* Progress Fill */}
                <div 
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min(displayProgress, 100)}%`
                  }}
                >
                  {/* Animated Stripes */}
                  <div className="progress-bar-stripes"></div>
                </div>
              </div>
            </div>

            {/* Additional Status Text */}
            <div className="status-text">
              Please wait...
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="bottom-hint">
          ▼ PROCESSING DATA ▼
        </div>
      </div>
    </div>
  );
}

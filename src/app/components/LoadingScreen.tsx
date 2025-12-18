import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './LoadingScreen.css';

interface LoadingScreenProps {
  totalUsers: number;
  completedCount: number;
  onProgressComplete?: () => void;
}

// 진행률에 따른 메시지
const getLoadingMessage = (progress: number) => {
  if (progress < 30) return 'PREPARING CHARACTERS';
  if (progress < 60) return 'WARMING UP';
  if (progress < 90) return 'READY TO MEET YOU';
  return 'ALMOST THERE';
};

export function LoadingScreen({ totalUsers, completedCount, onProgressComplete }: LoadingScreenProps) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());

  // 예상 소요 시간 계산 (사용자 수에 따라 동적)
  const estimatedSeconds = totalUsers * 5 + 10; // 1명=15초, 6명=40초

  // Animate dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  // 진행률 업데이트 (시간 기반 + API 진행률)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;

      // 시간 기반 진행률 (0% → 85%)
      const timeProgress = Math.min((elapsedSeconds / estimatedSeconds) * 85, 85);

      // API 진행률 (85% → 99%)
      const apiProgress = completedCount > 0
        ? 85 + (completedCount / totalUsers) * 14
        : 0;

      // 최종 진행률: 둘 중 큰 값 사용
      let newProgress = Math.max(timeProgress, apiProgress);

      // 모든 API 완료 시 100%
      if (completedCount === totalUsers && totalUsers > 0) {
        newProgress = 100;
      }

      setProgress(newProgress);

      // 100% 도달 시 콜백 호출
      if (newProgress >= 100 && onProgressComplete) {
        onProgressComplete();
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [completedCount, totalUsers, startTime, estimatedSeconds, onProgressComplete]);

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
                      transform: `rotate(${i * 45}deg) translateY(-36px) translateX(-50%)`
                    }}
                  ></div>
                ))}
              </div>

              {/* Center Core (Fixed, no animation) */}
              <div className="spinner-core-wrapper">
                <div className="spinner-core">
                  <div className="spinner-core-inner"></div>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="loading-text">
              <div className="loading-text-content">
                {getLoadingMessage(progress)}{dots}
              </div>
            </div>

            {/* API Progress Info */}
            <div className="loading-text" style={{ fontSize: '0.8em', opacity: 0.7, marginTop: '8px' }}>
              <div className="loading-text-content">
                LOADED: {completedCount} / {totalUsers}
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="progress-container">
              {/* Progress Label */}
              <div className="progress-label">
                <span>PROGRESS</span>
                <span>{Math.min(Math.floor(progress), 100)}%</span>
              </div>

              {/* Progress Bar Background */}
              <div className="progress-bar-bg">
                {/* Progress Fill */}
                <div 
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min(progress, 100)}%`
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
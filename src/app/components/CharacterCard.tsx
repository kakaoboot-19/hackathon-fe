import { useRef } from 'react';
import { Download } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CharacterCardData {
  id: string;
  name: string;
  role: {
    role_en: string;
    role_kr: string;
    type: string;
    description: string;
  };
  image: {
    url: string;
  };
  stats: {
    dayVsNight: number;
    steadyVsBurst: number;
    indieVsCrew: number;
    specialVsGeneral: number;
  };
}

interface CharacterCardProps {
  card: CharacterCardData;
  isFlipped: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function CharacterCard({ card, isFlipped, onClick }: CharacterCardProps) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const saveImage = async (element: HTMLElement, suffix: string) => {
      const iframe = document.createElement('iframe');
      Object.assign(iframe.style, {
        position: 'fixed',
        left: '-9999px',
        top: '0',
        width: '1440px',
        height: '900px',
        border: 'none',
        zIndex: '-9999',
        visibility: 'hidden',
      });
      document.body.appendChild(iframe);

      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) throw new Error('Iframe document not found');

        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        styles.forEach(style => {
          iframeDoc.head.appendChild(style.cloneNode(true));
        });

        const clonedElement = element.cloneNode(true) as HTMLElement;
        const width = 400;
        const height = 600;
        const buffer = 100;

        Object.assign(clonedElement.style, {
          width: `${width}px`,
          height: `${height}px`,
          margin: `${buffer / 2}px`,
          transform: 'none',
          position: 'absolute',
          top: '0',
          left: '0',
          maxWidth: 'none',
          maxHeight: 'none',
          overflow: 'hidden',
          borderRadius: 'inherit',
          boxSizing: 'border-box'
        });

        const wrapper = iframeDoc.createElement('div');
        Object.assign(wrapper.style, {
          position: 'relative',
          width: `${width + buffer}px`,
          height: `${height + buffer}px`,
          overflow: 'hidden'
        });
        wrapper.appendChild(clonedElement);
        iframeDoc.body.appendChild(wrapper);

        await new Promise(resolve => setTimeout(resolve, 800));

        const dataUrl = await domToPng(wrapper, {
          scale: 3,
          width: width + buffer,
          height: height + buffer,
          style: {
            transform: 'none',
            transformOrigin: 'top left',
          },
        });

        const link = document.createElement('a');
        link.download = `${card.name}-${suffix}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error(`Failed to save ${suffix} image:`, error);
      } finally {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }
    };

    if (frontRef.current) {
      await saveImage(frontRef.current, 'front');
    }

    if (backRef.current) {
      setTimeout(() => saveImage(backRef.current!, 'back'), 500);
    }
  };

  const calculateStats = (value: number) => {
    const right = value; // 0-100
    const left = 100 - value;
    return { left, right };
  };

  const dayNightStats = calculateStats(card.stats.dayVsNight);
  const steadyBurstStats = calculateStats(card.stats.steadyVsBurst);
  const indieCrewStats = calculateStats(card.stats.indieVsCrew);
  const specialGeneralStats = calculateStats(card.stats.specialVsGeneral);

  // Determine personality type based on stats 
  const personalityType = [
    card.stats.dayVsNight < 50 ? 'N' : 'D', // Night vs Day
    card.stats.steadyVsBurst > 50 ? 'A' : 'B', // Atom vs Bulk
    card.stats.indieVsCrew > 50 ? 'C' : 'I', // Crew vs Indie
    card.stats.specialVsGeneral > 50 ? 'S' : 'G', // special vs General
  ].join('');

  return (
    <div className="character-card">
      <div
        className={`character-card-flip-container ${isFlipped ? 'flipped' : ''}`}
        onClick={onClick}
      >
        {/* Front Side - Character Card */}
        <div className="character-card-inner character-card-front" ref={frontRef}>
          {/* Glow Effect */}
          <div className="card-glow"></div>

          {/* Card Content Wrapper */}
          <div className="card-content-wrapper">
            {/* Top 30% - Role Information */}
            <div className="card-role-section">
              {/* GitHub Name Tag */}
              <div className="card-name-tag">
                <span className="name-tag-bracket">[</span>
                {card.name}
                <span className="name-tag-bracket">]</span>
              </div>

              {/* Role Type - Main Title */}
              <div className="card-role-korean">
                {card.role.role_kr}
              </div>

              {/* Role Description - Subtitle */}
              <div className="card-role-english">
                {card.role.role_en}
              </div>
            </div>

            {/* Middle 50% - Image */}
            <div className="card-image-section">
              <div className="card-image-container">
                <ImageWithFallback
                  src={card.image.url}
                  alt={card.role.type}
                />
              </div>
            </div>

            {/* Bottom 20% - Description */}
            <div className="card-description-section">
              <div className="card-description-box">
                <p className="card-description-text">{card.role.description}</p>
              </div>
            </div>
          </div>

          {/* Flip Hint */}
          <div className="flip-hint-front">▲ FLIP ▲</div>
        </div>

        {/* Back Side - Stats Analysis */}
        <div className="character-card-inner character-card-back" ref={backRef}>
          {/* Card Content Wrapper */}
          <div className="card-content-wrapper">
            {/* Top 30% - Personality Type */}
            <div className="personality-type-section">
              <div className="personality-label">DEVELOPER TYPE</div>
              <div className="personality-type-code">{card.role.type}</div>
            </div>

            {/* Bottom 70% - Stats Bars */}
            <div className="stats-bars-section">

              {/* Day vs Night */}
              <div className="stat-bar-item">
                <div className="stat-bar-labels">
                  <div className={`stat-label stat-label-left ${dayNightStats.left > dayNightStats.right ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">☀️ 아침형</span>
                    {dayNightStats.left > dayNightStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${dayNightStats.right > dayNightStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">🌙 야행성</span>
                    {dayNightStats.right > dayNightStats.left && <span className="stat-badge"></span>}
                  </div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill stat-bar-left" style={{ width: `${dayNightStats.left}%` }}>
                      <span className="stat-value">{Math.round(dayNightStats.left)}%</span>
                    </div>
                    <div className="stat-bar-fill stat-bar-right" style={{ width: `${dayNightStats.right}%` }}>
                      <span className="stat-value">{Math.round(dayNightStats.right)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steady vs Burst */}
              <div className="stat-bar-item">
                <div className="stat-bar-labels">
                  <div className={`stat-label stat-label-left ${steadyBurstStats.left > steadyBurstStats.right ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">🧩 차곡차곡</span>
                    {steadyBurstStats.left > steadyBurstStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${steadyBurstStats.right > steadyBurstStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">💥 몰아치기</span>
                    {steadyBurstStats.right > steadyBurstStats.left && <span className="stat-badge"></span>}
                  </div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill stat-bar-left" style={{ width: `${steadyBurstStats.left}%` }}>
                      <span className="stat-value">{Math.round(steadyBurstStats.left)}%</span>
                    </div>
                    <div className="stat-bar-fill stat-bar-right" style={{ width: `${steadyBurstStats.right}%` }}>
                      <span className="stat-value">{Math.round(steadyBurstStats.right)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indie vs Crew */}
              <div className="stat-bar-item">
                <div className="stat-bar-labels">
                  <div className={`stat-label stat-label-left ${indieCrewStats.left > indieCrewStats.right ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">👥 파티 플레이</span>
                    {indieCrewStats.left > indieCrewStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${indieCrewStats.right > indieCrewStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">👤 솔로 플레이</span>
                    {indieCrewStats.right > indieCrewStats.left && <span className="stat-badge"></span>}
                  </div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill stat-bar-left" style={{ width: `${indieCrewStats.left}%` }}>
                      <span className="stat-value">{Math.round(indieCrewStats.left)}%</span>
                    </div>
                    <div className="stat-bar-fill stat-bar-right" style={{ width: `${indieCrewStats.right}%` }}>
                      <span className="stat-value">{Math.round(indieCrewStats.right)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special vs General */}
              <div className="stat-bar-item">
                <div className="stat-bar-labels">
                  <div className={`stat-label stat-label-left ${specialGeneralStats.left > specialGeneralStats.right ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">🎯 한 우물</span>
                    {specialGeneralStats.left > specialGeneralStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${specialGeneralStats.right > specialGeneralStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">🧰 올라운더</span>
                    {specialGeneralStats.right > specialGeneralStats.left && <span className="stat-badge"></span>}
                  </div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill stat-bar-left" style={{ width: `${specialGeneralStats.left}%` }}>
                      <span className="stat-value">{Math.round(specialGeneralStats.left)}%</span>
                    </div>
                    <div className="stat-bar-fill stat-bar-right" style={{ width: `${specialGeneralStats.right}%` }}>
                      <span className="stat-value">{Math.round(specialGeneralStats.right)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Flip Hint */}
          <div className="flip-hint-back">▼ FLIP ▼</div>
        </div>
      </div>

      <div className="character-card-actions">
        {/* Player Name */}
        <div className="card-player-name">
          {card.name}
        </div>

        {/* Download Button */}
        <button
          className="card-download-button"
          onClick={handleSave}
          title="Save Card Images"
        >
          <Download size={16} />
          <span>SAVE</span>
        </button>
      </div>
    </div >
  );
}
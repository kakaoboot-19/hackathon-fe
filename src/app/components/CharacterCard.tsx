import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CharacterCardData {
  id: string;
  name: string;
  role: {
    type: string;
    description: string;
  };
  image: {
    url: string;
    description: string;
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
  return (
    <div className="character-card">
      <div 
        className={`character-card-flip-container ${isFlipped ? 'flipped' : ''}`}
        onClick={onClick}
      >
        {/* Front Side - Character Card */}
        <div className="character-card-inner character-card-front">
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
              <div className="card-role-type">
                {card.role.type}
              </div>

              {/* Role Description - Subtitle */}
              <div className="card-role-description">
                {card.role.description}
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
                <p className="card-description-text">{card.image.description}</p>
              </div>
            </div>
          </div>

          {/* Flip Hint */}
          <div className="flip-hint-front">▲ FLIP ▲</div>
        </div>

        {/* Back Side - Stats Analysis */}
        <div className="character-card-inner character-card-back">
          {/* Stats Header */}
          <div className="stats-header">
            <div className="stats-title">STATS ANALYSIS</div>
            <div className="stats-name">{card.name}</div>
          </div>

          {/* Stats Spectrum Area */}
          <div className="stats-spectrum-area">
            
            {/* Day vs Night */}
            <div className="spectrum-item">
              <div className="spectrum-labels">
                <span className="spectrum-label-left">낮활동</span>
                <span className="spectrum-label-right">밤활동</span>
              </div>
              <div className="spectrum-bar">
                <div 
                  className="spectrum-indicator"
                  style={{ left: `${card.stats.dayVsNight}%` }}
                ></div>
              </div>
            </div>

            {/* Steady vs Burst */}
            <div className="spectrum-item">
              <div className="spectrum-labels">
                <span className="spectrum-label-left">꾸준함</span>
                <span className="spectrum-label-right">집중폭발</span>
              </div>
              <div className="spectrum-bar">
                <div 
                  className="spectrum-indicator"
                  style={{ left: `${card.stats.steadyVsBurst}%` }}
                ></div>
              </div>
            </div>

            {/* Indie vs Crew */}
            <div className="spectrum-item">
              <div className="spectrum-labels">
                <span className="spectrum-label-left">독립작업</span>
                <span className="spectrum-label-right">팀협업</span>
              </div>
              <div className="spectrum-bar">
                <div 
                  className="spectrum-indicator"
                  style={{ left: `${card.stats.indieVsCrew}%` }}
                ></div>
              </div>
            </div>

            {/* Special vs General */}
            <div className="spectrum-item">
              <div className="spectrum-labels">
                <span className="spectrum-label-left">전문화</span>
                <span className="spectrum-label-right">범용성</span>
              </div>
              <div className="spectrum-bar">
                <div 
                  className="spectrum-indicator"
                  style={{ left: `${card.stats.specialVsGeneral}%` }}
                ></div>
              </div>
            </div>

            {/* Flip Hint */}
            <div className="flip-hint-back">
              ▼ FLIP ▼
            </div>
          </div>
        </div>
      </div>

      {/* Player Name Below Card */}
      <div className="card-player-name">
        {card.name}
      </div>
    </div>
  );
}
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CharacterCardData {
  id: string;
  name: string;
  role: {
    role: string;
    roleKr: string;
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

    // Calculate percentages for each stat pair
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
        card.stats.dayVsNight > 50 ? 'N' : 'D', // Night vs Day
        card.stats.steadyVsBurst > 50 ? 'B' : 'S', // Burst vs Steady
        card.stats.indieVsCrew > 50 ? 'C' : 'I', // Crew vs Indie
        card.stats.specialVsGeneral > 50 ? 'G' : 'P', // General vs Professional
    ].join('');

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
                {card.role.roleKr}
              </div>

              {/* Role Description - Subtitle */}
              <div className="card-role-description">
                {card.role.role}
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
        <div className="character-card-inner character-card-back">
          {/* Card Content Wrapper */}
          <div className="card-content-wrapper">
            {/* Top 30% - Personality Type */}
            <div className="personality-type-section">
              <div className="personality-label">DEVELOPER TYPE</div>
              <div className="personality-type-code">{personalityType}</div>
              <div className="personality-type-name">{card.role.type}</div>
            </div>

            {/* Bottom 70% - Stats Bars */}
            <div className="stats-bars-section">

              {/* Day vs Night */}
              <div className="stat-bar-item">
                <div className="stat-bar-labels">
                  <div className={`stat-label stat-label-left ${dayNightStats.left > dayNightStats.right ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">낮활동</span>
                    {dayNightStats.left > dayNightStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${dayNightStats.right > dayNightStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">밤활동</span>
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
                    <span className="stat-label-text">꾸준함</span>
                    {steadyBurstStats.left > steadyBurstStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${steadyBurstStats.right > steadyBurstStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">집중폭발</span>
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
                    <span className="stat-label-text">독립작업</span>
                    {indieCrewStats.left > indieCrewStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${indieCrewStats.right > indieCrewStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">팀협업</span>
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
                    <span className="stat-label-text">전문화</span>
                    {specialGeneralStats.left > specialGeneralStats.right && <span className="stat-badge"></span>}
                  </div>
                  <div className={`stat-label stat-label-right ${specialGeneralStats.right > specialGeneralStats.left ? 'stat-dominant' : ''}`}>
                    <span className="stat-label-text">범용성</span>
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

      {/* Player Name Below Card */}
      <div className="card-player-name">
        {card.name}
      </div>
    </div>
  );
}
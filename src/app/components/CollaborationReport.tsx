import { Shield, Swords, Heart, AlertTriangle, MessageSquare, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './CollaborationReport.css';

interface CollaborationReportProps {
  usernames: string[];
  onClose?: () => void;
}

export function CollaborationReport({ usernames, onClose }: CollaborationReportProps) {
  // Mock data - in real app, this would come from AI analysis
  const roles = [
    {
      icon: '🛡️',
      title: 'TANK',
      role: 'Code Guardian',
      members: [usernames[0]],
    },
    {
      icon: '⚔️',
      title: 'DPS',
      role: 'Feature Builder',
      members: usernames.slice(1, 3),
    },
    {
      icon: '💚',
      title: 'SUPPORT',
      role: 'Team Helper',
      members: usernames.slice(3),
    },
  ].filter(role => role.members.length > 0);

  const strengths = [
    {
      title: 'Diverse Tech Stack Coverage',
      description: 'Team members bring expertise in different areas creating a well-rounded skillset.',
      power: 90,
    },
    {
      title: 'Complementary Work Styles',
      description: 'Mix of fast-paced and methodical approaches ensures quality and speed.',
      power: 85,
    },
    {
      title: 'Strong Communication Base',
      description: 'Active contributors with good documentation habits.',
      power: 75,
    },
  ];

  const warnings = [
    {
      title: 'Time Zone Differences',
      description: 'Consider scheduling overlap hours for real-time collaboration.',
      icon: '⏰',
    },
    {
      title: 'Different Coding Standards',
      description: 'Establish clear code review guidelines and style guides early.',
      icon: '📋',
    },
  ];

  const strategies = [
    'Set up daily async standups in a shared channel',
    'Use pair programming sessions for knowledge transfer',
    'Create detailed documentation for all major features',
    'Schedule weekly retrospectives to improve process',
  ];

  return (
    <div className="collaboration-report-container">
      {/* Close Button */}
      <button className="collaboration-close-button" onClick={onClose} aria-label="Close">
        <X size={24} />
      </button>

      {/* Pixel Grid Pattern */}
      <div className="collaboration-report-grid-pattern"></div>

      {/* Main Content */}
      <div className="collaboration-report-content">
        {/* Header */}
        <div className="collaboration-report-header">
          <h1 className="collaboration-report-title">PARTY STRATEGY REPORT</h1>
          <p className="collaboration-report-subtitle">AI-Generated Team Analysis</p>
        </div>

        {/* Team Overview */}
        <div className="team-overview">
          <div className="team-overview-glow"></div>
          <div className="quest-log-decoration">◆ QUEST LOG ◆</div>
          <h2 className="team-overview-title">▼ YOUR PARTY ▼</h2>
          <div className="team-members">
            {usernames.map((username, index) => (
              <div key={index} className="team-member-badge">
                {username}
              </div>
            ))}
          </div>
        </div>

        {/* Role Distribution */}
        <div className="report-section">
          <div className="report-section-glow"></div>
          <div className="quest-log-decoration">◆ ROLES ◆</div>
          <div className="report-section-header">
            <div className="report-section-icon">
              <Shield size={32} color="rgba(242, 229, 48, 1)" />
            </div>
            <h3 className="report-section-title">RECOMMENDED ROLE DISTRIBUTION</h3>
          </div>
          <div className="role-cards">
            {roles.map((role, index) => (
              <div key={index} className="role-card">
                <div className="role-card-icon">{role.icon}</div>
                <div className="role-card-title">{role.title}</div>
                <div className="role-card-title" style={{ color: 'rgba(62, 178, 255, 1)', fontSize: '0.625rem' }}>
                  {role.role}
                </div>
                <div className="role-card-members">
                  {role.members.map((member, idx) => (
                    <div key={idx}>{member}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Strengths */}
        <div className="report-section">
          <div className="report-section-glow"></div>
          <div className="quest-log-decoration">◆ BUFFS ◆</div>
          <div className="report-section-header">
            <div className="report-section-icon">
              <Swords size={32} color="rgba(62, 178, 255, 1)" />
            </div>
            <h3 className="report-section-title">TEAM STRENGTHS & SYNERGIES</h3>
          </div>
          <div className="strength-items">
            {strengths.map((strength, index) => (
              <div key={index} className="strength-item">
                <div className="strength-item-title">▶ {strength.title}</div>
                <div className="strength-item-desc">{strength.description}</div>
                <div className="strength-gauge">
                  <div className="strength-gauge-label">POWER</div>
                  <div className="strength-gauge-bar">
                    <div 
                      className="strength-gauge-fill" 
                      style={{ width: `${strength.power}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Conflicts */}
        <div className="report-section">
          <div className="report-section-glow"></div>
          <div className="quest-log-decoration">◆ RISKS ◆</div>
          <div className="report-section-header">
            <div className="report-section-icon">
              <AlertTriangle size={32} color="rgba(242, 39, 134, 1)" />
            </div>
            <h3 className="report-section-title">POTENTIAL CHALLENGES</h3>
          </div>
          <div className="warning-items">
            {warnings.map((warning, index) => (
              <div key={index} className="warning-item">
                <div className="warning-item-title">
                  <span>{warning.icon}</span>
                  {warning.title}
                </div>
                <div className="warning-item-desc">{warning.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Strategy */}
        <div className="report-section">
          <div className="report-section-glow"></div>
          <div className="quest-log-decoration">◆ TACTICS ◆</div>
          <div className="report-section-header">
            <div className="report-section-icon">
              <MessageSquare size={32} color="rgba(242, 229, 48, 1)" />
            </div>
            <h3 className="report-section-title">COMMUNICATION STRATEGIES</h3>
          </div>
          <div className="strategy-tips">
            {strategies.map((strategy, index) => (
              <div key={index} className="strategy-tip">
                <div className="strategy-tip-number">{index + 1}</div>
                <div className="strategy-tip-content">{strategy}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="collaboration-actions">
          <button className="action-button" onClick={onClose}>
            ◀ 돌아가기 ▶
          </button>
        </div>
      </div>
    </div>
  );
}
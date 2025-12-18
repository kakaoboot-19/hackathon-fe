import { Sparkles, AlertTriangle } from 'lucide-react';
import './CollaborationReport.css';

interface CollaborationReportProps {
  usernames: string[];
  teamReport?: { synergy: string; warning: string } | null;
  onClose?: () => void;
}

export function CollaborationReport({ usernames, teamReport }: CollaborationReportProps) {
  // Mock AI analysis data
  const synergyTips = [
    '팀원들의 활동 시간대가 다양하게 분포되어 있어, 24시간 프로젝트 진행이 가능합니다. 각자의 최적 시간대에 작업하면서도 전체 프로젝트 속도를 유지할 수 있습니다.',
    '독립적인 작업 성향과 팀 협업 성향이 균형있게 섞여 있습니다. 각자 맡은 모듈을 독립적으로 개발한 뒤, 통합 단계에서 협업하는 방식을 추천합니다.',
    '코드 집중 폭발형 멤버와 꾸준히 진행하는 멤버가 함께 있습니다. 마일스톤 중간에는 꾸준한 진행으로, 마감 직전에는 집중 폭발로 스프린트를 완성하는 전략이 효과적입니다.',
  ];

  const cautionPoints = [
    '밤에 활동하는 멤버와 낮에 활동하는 멤버가 섞여 있습니다. 실시간 소통이 필요한 작업은 겹치는 시간대(예: 오후 3시~6시)를 활용하고, 비동기 커뮤니케이션 규칙을 정해두세요.',
    '전문화된 개발자와 범용적인 개발자가 함께 있습니다. 전문 영역은 해당 멤버에게 맡기되, 다른 멤버들도 이해할 수 있도록 문서화와 코드 리뷰를 철저히 하세요.',
    '독립 작업 성향이 강한 멤버가 있다면, 정기적인 동기화 시간(주 2~3회)을 정해두어 프로젝트 방향이 어긋나지 않도록 주의하세요.',
  ];

  const synergyItems = teamReport?.synergy ? [teamReport.synergy] : synergyTips;
  const cautionItems = teamReport?.warning ? [teamReport.warning] : cautionPoints;

  return (
    <div className="collaboration-report-container-inline">
      {/* Header */}
      <div className="collaboration-inline-header">
        <h2 className="collaboration-inline-title">COLLABORATION REPORT</h2>
        <p className="collaboration-inline-subtitle">AI가 분석한 팀 협업 전략</p>
      </div>

      {/* Synergy Block */}
      <div className="collaboration-block collaboration-synergy-block">
        <div className="collaboration-block-header">
          <div className="collaboration-block-icon">
            <Sparkles size={28} color="rgb(233, 212, 48)" />
          </div>
          <h3 className="collaboration-block-title">우리 팀이 더 시너지를 낼 수 있는 방법은?</h3>
        </div>
        <div className="collaboration-block-content">
          {synergyItems.map((tip, index) => (
            <div key={index} className="collaboration-tip-item">
              <div className="collaboration-tip-number">{index + 1}</div>
              <p className="collaboration-tip-text">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Caution Block */}
      <div className="collaboration-block collaboration-caution-block">
        <div className="collaboration-block-header">
          <div className="collaboration-block-icon">
            <AlertTriangle size={28} color="rgba(242, 39, 134, 1)" />
          </div>
          <h3 className="collaboration-block-title">우리 팀이 주의해야 하는 지점은?</h3>
        </div>
        <div className="collaboration-block-content">
          {cautionItems.map((point, index) => (
            <div key={index} className="collaboration-tip-item">
              <div className="collaboration-tip-number caution-number">{index + 1}</div>
              <p className="collaboration-tip-text">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

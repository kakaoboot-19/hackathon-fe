import { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { CardResultPage } from './components/CardResultPage';
import { CollaborationReport } from './components/CollaborationReport';
import { type CharacterCardData } from './components/CharacterCard';

type AppState = 'input' | 'loading' | 'result' | 'collaboration';

const roleNames = [
  'NIGHT CODER',
  'CODE WARRIOR',
  'TECH WIZARD',
  'TEAM BUILDER',
  'SPECIALIST',
  'FULL STACKER',
];

const roleTypes = [
    'INTP', 
    'ENFP'
]

const roleDescriptions = [
  '달빛 아래 코드를 짜는 밤의 개발자',
  '빠르고 강력한 코드 전투의 달인',
  '마법같은 기술로 문제를 해결하는 마법사',
  '협업의 힘으로 팀을 이끄는 리더',
  '한 분야에 깊이 파고드는 전문가',
  '모든 영역을 넘나드는 만능 개발자',
];

const images = [
  'https://images.unsplash.com/photo-1558702834-68c6ea72e28b?w=400',
  'https://images.unsplash.com/photo-1746802423700-d85a98012dec?w=400',
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
  'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400',
];

const imageDescriptions = [
  '고요한 밤, 키보드 소리만이 울려퍼지는 작업실',
  '빠른 타이핑과 민첩한 사고로 코드를 완성하다',
  '복잡한 알고리즘을 우아하게 풀어내는 능력자',
  '함께 만들어가는 프로젝트, 시너지의 힘',
  '한 분야의 깊이를 파고들어 최고가 되다',
  '프론트엔드부터 백엔드까지 모두 섭렵한 개발자',
];

const generateCardData = (username: string, index: number): CharacterCardData => {
  const trimmedName = username.trim();
  const name = trimmedName !== '' ? trimmedName : `PLAYER_${index + 1}`;
  const id = `${name}-${index + 1}`;

  return {
    id,
    name,
    role: {
      type: roleTypes[index % roleTypes.length],
      name: roleNames[index % roleNames.length],
      description: roleDescriptions[index % roleDescriptions.length],
    },
    image: {
      url: images[index % images.length],
      description: imageDescriptions[index % imageDescriptions.length],
    },
    stats: {
      dayVsNight: Math.floor(Math.random() * 60) + 20,
      steadyVsBurst: Math.floor(Math.random() * 60) + 20,
      indieVsCrew: Math.floor(Math.random() * 60) + 20,
      specialVsGeneral: Math.floor(Math.random() * 60) + 20,
    },
  };
};

export default function App() {
  const [inputFields, setInputFields] = useState<string[]>(['']);
  const [appState, setAppState] = useState<AppState>('input');
  const maxFields = 6;
  const playerNames = useMemo(
    () => inputFields.map((field) => field.trim()).filter(Boolean),
    [inputFields]
  );
  const mockCards = useMemo(
    () => playerNames.map((name, index) => generateCardData(name, index)),
    [playerNames]
  );

  const handleAddField = () => {
    if (inputFields.length < maxFields) {
      setInputFields([...inputFields, '']);
    }
  };

  const handleRemoveField = (index: number) => {
    if (inputFields.length > 1) {
      const newFields = inputFields.filter((_, i) => i !== index);
      setInputFields(newFields);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newFields = [...inputFields];
    newFields[index] = value;
    setInputFields(newFields);
  };

  const handleStartQuest = () => {
    // Filter out empty fields
    const validFields = inputFields.filter(field => field.trim() !== '');
    if (validFields.length === 0) {
      return; // Don't proceed if no valid usernames
    }
    
    setAppState('loading');
    
    // Simulate loading time
    setTimeout(() => {
      setAppState('result');
    }, 3000);
  };

  const handleReset = () => {
    setInputFields(['']);
    setAppState('input');
  };

  const handleCollaboration = () => {
    setAppState('collaboration');
  };

  const handleBackToCards = () => {
    setAppState('result');
  };

  // Show loading screen if loading
  if (appState === 'loading') {
    return <LoadingScreen />;
  }

  // Show collaboration report
  if (appState === 'collaboration') {
    return (
      <CollaborationReport 
        usernames={playerNames} 
        onClose={handleBackToCards}
      />
    );
  }

  // Show result page if complete
  if (appState === 'result') {
    return (
      <CardResultPage 
        usernames={playerNames} 
        mockCards={mockCards}
        onReset={handleReset}
        onCollaboration={handleCollaboration}
      />
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ fontFamily: "'Press Start 2P', cursive", backgroundColor: 'rgba(25, 24, 38, 1)' }}>
      {/* Pixel Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(242, 39, 134, 0.5) 0px, rgba(242, 39, 134, 0.5) 2px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, rgba(62, 178, 255, 0.5) 0px, rgba(62, 178, 255, 0.5) 2px, transparent 2px, transparent 4px)',
        backgroundSize: '4px 4px'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 
              className="text-3xl md:text-4xl mb-4 animate-pulse"
              style={{ 
                color: 'rgba(242, 229, 48, 1)',
                textShadow: '4px 4px 0px rgba(140, 3, 117, 1), 8px 8px 0px rgba(25, 24, 38, 0.5)',
                lineHeight: '1.5'
              }}
            >
              QUEST START
            </h1>
            <p 
              className="text-xs md:text-sm"
              style={{ 
                color: 'rgba(62, 178, 255, 1)',
                textShadow: '2px 2px 0px rgba(25, 24, 38, 1)',
                lineHeight: '1.8'
              }}
            >
              Enter GitHub Heroes
            </p>
          </div>

          {/* Main Game Box */}
          <div 
            className="relative p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(25, 24, 38, 0.95)',
              boxShadow: `
                0 0 0 4px rgba(242, 39, 134, 1),
                0 0 0 8px rgba(140, 3, 117, 1),
                0 8px 0 8px rgba(140, 3, 117, 1),
                0 8px 32px rgba(242, 39, 134, 0.3)
              `,
              border: '4px solid rgba(62, 178, 255, 0.8)'
            }}
          >
            {/* Inner Glow */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px rgba(62, 178, 255, 0.2)'
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 
                className="text-sm md:text-base mb-6"
                style={{ 
                  color: 'rgba(242, 229, 48, 1)',
                  textShadow: '2px 2px 0px rgba(140, 3, 117, 1)',
                  lineHeight: '1.8'
                }}
              >
                SELECT PLAYERS
              </h2>

              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                {inputFields.map((value, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    {/* Player Number Badge */}
                    <div 
                      className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: 'rgba(140, 3, 117, 1)',
                        color: 'rgba(242, 229, 48, 1)',
                        boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(242, 39, 134, 0.3)',
                        border: '2px solid rgba(242, 39, 134, 1)'
                      }}
                    >
                      P{index + 1}
                    </div>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="github-username"
                      className="flex-1 px-4 py-3 md:py-4 text-xs outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(25, 24, 38, 1)',
                        color: 'rgba(62, 178, 255, 1)',
                        border: '3px solid rgba(62, 178, 255, 0.6)',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)',
                        fontFamily: "'Press Start 2P', cursive",
                        lineHeight: '1.5'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '3px solid rgba(242, 229, 48, 1)';
                        e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(242, 229, 48, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '3px solid rgba(62, 178, 255, 0.6)';
                        e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.5)';
                      }}
                    />

                    {/* Delete Button */}
                    {inputFields.length > 1 && (
                      <button
                        onClick={() => handleRemoveField(index)}
                        className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                        style={{
                          backgroundColor: 'rgba(242, 39, 134, 1)',
                          color: 'rgba(255, 255, 255, 1)',
                          border: '2px solid rgba(140, 3, 117, 1)',
                          boxShadow: '2px 2px 0px rgba(140, 3, 117, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(140, 3, 117, 1)';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(242, 39, 134, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(242, 39, 134, 1)';
                          e.currentTarget.style.boxShadow = '2px 2px 0px rgba(140, 3, 117, 1)';
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Button */}
              {inputFields.length < maxFields && (
                <button
                  onClick={handleAddField}
                  className="w-full py-3 md:py-4 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 active:scale-95 text-xs"
                  style={{
                    backgroundColor: 'rgba(62, 178, 255, 1)',
                    color: 'rgba(25, 24, 38, 1)',
                    border: '3px solid rgba(242, 229, 48, 1)',
                    boxShadow: '0 4px 0 rgba(140, 3, 117, 1)',
                    fontFamily: "'Press Start 2P', cursive",
                    lineHeight: '1.5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(242, 229, 48, 1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 0 rgba(140, 3, 117, 1), 0 6px 30px rgba(242, 229, 48, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(62, 178, 255, 1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 0 rgba(140, 3, 117, 1)';
                  }}
                >
                  <Plus size={16} />
                  <span>ADD PLAYER</span>
                </button>
              )}

              {/* Player Count Info */}
              <div 
                className="mt-6 pt-6 text-center text-xs"
                style={{
                  color: 'rgba(62, 178, 255, 0.8)',
                  borderTop: '2px dashed rgba(62, 178, 255, 0.3)',
                  lineHeight: '1.8'
                }}
              >
                PLAYERS: {inputFields.length} / {maxFields}
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartQuest}
                className="w-full mt-6 py-4 md:py-5 transition-all duration-200 hover:scale-105 active:scale-95 text-xs md:text-sm"
                style={{
                  backgroundColor: 'rgba(242, 39, 134, 1)',
                  color: 'rgba(242, 229, 48, 1)',
                  border: '4px solid rgba(242, 229, 48, 1)',
                  boxShadow: '0 6px 0 rgba(140, 3, 117, 1), 0 6px 0 4px rgba(242, 229, 48, 0.5)',
                  fontFamily: "'Press Start 2P', cursive",
                  lineHeight: '1.5'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(140, 3, 117, 1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 0 rgba(242, 39, 134, 1), 0 10px 40px rgba(242, 229, 48, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(242, 39, 134, 1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 rgba(140, 3, 117, 1), 0 6px 0 4px rgba(242, 229, 48, 0.5)';
                }}
              >
                ▶ START QUEST ◀
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div 
            className="text-center mt-8 text-xs opacity-60"
            style={{ 
              color: 'rgba(62, 178, 255, 1)',
              lineHeight: '1.8'
            }}
          >
            Press START when ready
          </div>
        </div>
      </div>
    </div>
  );
}

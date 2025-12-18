import { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { CardResultPage } from './components/CardResultPage';
import { CollaborationReport } from './components/CollaborationReport';
import { type CharacterCardData } from './components/CharacterCard';
import { mapToCharacterCard } from './api/cardResultMapper';
import { type BackendCardResult } from './api/cardResultApi';
import {generateMockBackendResults} from './api/mock/mockCardResults';

type AppState = 'input' | 'loading' | 'result' | 'collaboration';

export default function App() {
  const [inputFields, setInputFields] = useState<string[]>(['']);
  const [appState, setAppState] = useState<AppState>('input');
  const maxFields = 6;
  const playerNames = useMemo(
    () =>
        inputFields
        .map((field, i) => field.trim() || `PLAYER_${i + 1}`)
        .filter(Boolean),
    [inputFields]
    );

    const mockBackendResults = useMemo(() => generateMockBackendResults(playerNames), [playerNames]);
    const mockCards: CharacterCardData[] = useMemo(() => mockBackendResults.map((result, index) =>
        mapToCharacterCard(result.username, index, result)),
        [mockBackendResults]
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
    
    // setAppState('loading');
    setAppState('result');
    
    // Simulate loading time
    // setTimeout(() => {
    //   setAppState('result');
    // }, 3000);
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
    <div className="min-h-screen w-full relative overflow-hidden" style={{ fontFamily: "var(--font-neo)", backgroundColor: 'rgba(25, 24, 38, 1)' }}>
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
                        fontFamily: "var(--font-neo)",
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
                    fontFamily: 'var(--font-neo)',
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
                  fontFamily: 'var(--font-press)',
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

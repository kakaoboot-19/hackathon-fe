import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CharacterCard, CharacterCardData } from './CharacterCard';
import { CollaborationReport } from './CollaborationReport';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardResultPage.css';

interface CardResultPageProps {
  usernames: string[];
  onReset?: () => void;
  onCollaboration?: () => void;
}

// Mock data generator - in real app, this would come from GitHub API
const generateMockCard = (username: string, index: number): CharacterCardData => {
  const roleTypes = [
    'NIGHT CODER',
    'CODE WARRIOR',
    'TECH WIZARD',
    'TEAM BUILDER',
    'SPECIALIST',
    'FULL STACKER',
  ];

  const roleDescriptions = [
    '달빛 아래 코드를 짜는 밤의 개발자',
    '빠르고 강력한 코드 전투의 달인',
    '마법같은 기술로 문제를 해결하는 마법사',
    '협업의 힘으로 팀을 이끄는 리더',
    '하나의 분야에 깊이 파고드는 전문가',
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
  
  return {
    id: username || `player-${index + 1}`,
    name: username || `PLAYER_${index + 1}`,
    role: {
      type: roleTypes[index % roleTypes.length],
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

export function CardResultPage({ usernames, onReset, onCollaboration }: CardResultPageProps) {
  const sliderRef = useRef<Slider>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cards = usernames.map((username, index) => generateMockCard(username, index));

  const handleCardClick = (cardId: string, e: React.MouseEvent) => {
    // Prevent event bubbling to avoid multiple cards flipping
    e.stopPropagation();
    
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: cards.length > 1,
    speed: 500,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    focusOnSelect: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    // Close modal when clicking the background (not the modal content)
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="card-result-container">
      {/* Pixel Grid Pattern */}
      <div className="card-result-grid-pattern"></div>

      {/* Main Content */}
      <div className="card-result-content">
        {/* Collaboration Strategy Button - Top */}
        <div className="collaboration-button-container">
          <button className="collaboration-strategy-button" onClick={handleOpenModal}>
            ▶ 협업 전략 수립하기 ◀
          </button>
        </div>

        {/* Title */}
        <div className="card-result-title">
          <h1>CHARACTER DECK</h1>
          <p className="card-result-subtitle">Your GitHub Heroes</p>
        </div>

        {/* Card Slider */}
        <div className="card-slider-container">
          {cards.length > 1 && (
            <>
              <button
                className="slider-nav-button slider-nav-button-prev"
                onClick={goToPrev}
                aria-label="Previous card"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="slider-nav-button slider-nav-button-next"
                onClick={goToNext}
                aria-label="Next card"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <Slider ref={sliderRef} {...sliderSettings}>
            {cards.map((card) => (
              <CharacterCard
                key={card.id}
                card={card}
                isFlipped={flippedCards.has(card.id)}
                onClick={(e) => handleCardClick(card.id, e)}
              />
            ))}
          </Slider>
        </div>

        {/* Actions */}
        <div className="card-result-actions">
          <button className="action-button" onClick={onReset}>
            ◀ CREATE NEW DECK ▶
          </button>
        </div>
      </div>

      {/* Collaboration Modal */}
      {isModalOpen && (
        <div className="collaboration-modal-overlay" onClick={handleModalBackgroundClick}>
          <div className="collaboration-modal-content">
            <CollaborationReport 
              usernames={usernames}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
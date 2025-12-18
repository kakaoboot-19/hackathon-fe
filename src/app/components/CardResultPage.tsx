import { useRef, useState, type MouseEvent } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CharacterCard, CharacterCardData } from './CharacterCard';
import { CollaborationReport } from './CollaborationReport';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardResultPage.css';

interface CardResultPageProps {
  cards: CharacterCardData[];
  onReset?: () => void;
  onCollaboration?: () => void;
}

export function CardResultPage({ cards, onReset, onCollaboration }: CardResultPageProps) {
  const sliderRef = useRef<Slider>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cardId: string, e: MouseEvent) => {
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

  // Fallback UI when no cards are available
  if (cards.length === 0) {
    return (
      <div className="card-result-container">
        <div className="card-result-grid-pattern"></div>
        <div className="card-result-content">
          <div className="card-result-title">
            <h1>CHARACTER DECK</h1>
            <p className="card-result-subtitle">No cards to show yet</p>
          </div>
          <div className="card-result-actions">
            {onReset && (
              <button className="action-button" onClick={onReset}>
                ◀ CREATE NEW DECK ▶
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              usernames={cards.map((card) => card.name)}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
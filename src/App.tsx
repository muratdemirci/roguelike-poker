import { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { Tutorial } from "./components/Tutorial";
import {
  createStarterDeck,
  shuffleDeck,
  calculateScore,
  GameCard,
  JokerCard,
  getHandName,
} from "./components/Deck";
import { Shop } from "./components/Shop";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [hand, setHand] = useState<GameCard[]>([]);
  const [played, setPlayed] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [chips, setChips] = useState(0);
  const [antes, setAntes] = useState(3);
  const [redraws, setRedraws] = useState(2);
  const [jokers, setJokers] = useState<JokerCard[]>([]);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [scoreChange, setScoreChange] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [deckAnimation, setDeckAnimation] = useState(false);
  const [animatingCards, setAnimatingCards] = useState<number[]>([]);
  const [handName, setHandName] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const targetScore = Math.floor(200 * (round * 1.5));

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        setGameStarted(false);
      }, 2000);
    }
  }, [isGameOver]);

  const startGame = () => {
    const newDeck = shuffleDeck(createStarterDeck());
    setDeck(newDeck);
    setDeckAnimation(true);
    setTimeout(() => setDeckAnimation(false), 800);
    drawInitialHand(newDeck);
    setGameStarted(true);
    setRound(1);
    setScore(0);
    setChips(100);
    setAntes(3);
    setRedraws(2);
    setPlayed([]);
    setSelectedCards([]);
    setJokers([]);
    setIsGameOver(false);
    setShowMessage("Game Started!");
    setTimeout(() => setShowMessage(""), 2000);
  };

  const drawInitialHand = (newDeck: GameCard[]) => {
    const drawnCards = newDeck.slice(0, 5);
    const remainingDeck = newDeck.slice(5);
    setHand(drawnCards);
    setDeck(remainingDeck);
    setHandName("");
  };

  const toggleCardSelection = (index: number) => {
    // Track which type of animation will be applied
    const willBeSelected = !selectedCards.includes(index);

    // Mark card as animating
    setAnimatingCards((prev) => [...prev, index]);

    setTimeout(() => {
      if (selectedCards.includes(index)) {
        // Deselecting the card
        setSelectedCards(selectedCards.filter((i) => i !== index));
      } else if (selectedCards.length < 3) {
        // Selecting the card
        setSelectedCards([...selectedCards, index]);
      } else {
        setShowMessage("Max 3 cards!");
        setTimeout(() => setShowMessage(""), 1500);
        // Remove from animating immediately if no action taken
        setAnimatingCards((prev) => prev.filter((i) => i !== index));
        return;
      }

      // Remove from animating after animation completes
      setTimeout(
        () => {
          setAnimatingCards((prev) => prev.filter((i) => i !== index));
        },
        willBeSelected ? 500 : 400 // Use appropriate timing for the animation
      );
    }, 10);
  };

  const playSelectedCards = () => {
    if (selectedCards.length === 0) {
      setShowMessage("Select cards first!");
      setTimeout(() => setShowMessage(""), 1500);
      return;
    }

    if (antes <= 0) {
      setShowMessage("No antes left!");
      setTimeout(() => setShowMessage(""), 1500);
      return;
    }

    const newHand = [...hand];
    const playedCards: GameCard[] = [];

    const sortedIndices = selectedCards.sort((a, b) => b - a);

    for (const index of sortedIndices) {
      playedCards.push(newHand[index]);
      newHand.splice(index, 1);
    }

    // Draw new cards if available
    while (newHand.length < 5 && deck.length > 0) {
      const newCard = deck.shift()!;
      newHand.push(newCard);
    }

    const handType = getHandName(playedCards);
    const turnScore = calculateScore(playedCards, jokers);

    setHandName(handType);
    setScoreChange(turnScore);
    setShowScoreAnimation(true);
    setTimeout(() => setShowScoreAnimation(false), 1000);

    // Show message based on score
    if (turnScore >= 800) {
      setShowMessage("EPIC COMBO!");
    } else if (turnScore >= 400) {
      setShowMessage("Great Combo!");
    } else if (turnScore >= 200) {
      setShowMessage("Nice Play!");
    }
    setTimeout(() => setShowMessage(""), 1500);

    setHand(newHand);
    setPlayed([...played, ...playedCards]);
    setScore(score + turnScore);
    setSelectedCards([]);
    setAntes(antes - 1);

    // Check end of round conditions after play
    setTimeout(() => {
      checkEndOfRound(score + turnScore);
    }, 1000);
  };

  const redrawCards = () => {
    if (redraws <= 0 || selectedCards.length === 0) {
      if (redraws <= 0) {
        setShowMessage("No redraws left!");
        setTimeout(() => setShowMessage(""), 1500);
      } else {
        setShowMessage("Select cards first!");
        setTimeout(() => setShowMessage(""), 1500);
      }
      return;
    }

    const newHand = [...hand];
    const newDeck = [...deck];

    const sortedIndices = selectedCards.sort((a, b) => b - a);

    for (const index of sortedIndices) {
      newHand.splice(index, 1);

      if (newDeck.length > 0) {
        const newCard = newDeck.shift()!;
        newHand.push(newCard);
      }
    }

    setShowMessage(`Redraw (${redraws - 1} left)`);
    setTimeout(() => setShowMessage(""), 1500);

    setHand(newHand);
    setDeck(newDeck);
    setSelectedCards([]);
    setRedraws(redraws - 1);
  };

  const checkEndOfRound = (currentScore: number) => {
    // Win round
    if (currentScore >= targetScore) {
      setShowMessage(`Level Up! Round ${round + 1}`);
      setTimeout(() => {
        setShowShop(true);
      }, 2000);
    }
    // Lose round (no more antes and didn't reach target score)
    else if (antes <= 0 && currentScore < targetScore) {
      setShowMessage("Game Over!");
      setIsGameOver(true);
    }
    // Lose round (no more cards)
    else if (
      (hand.length === 0 || deck.length === 0) &&
      currentScore < targetScore
    ) {
      setShowMessage("Game Over!");
      setIsGameOver(true);
    }
  };

  const advanceToNextRound = () => {
    setShowShop(false);

    // Award chips based on round
    const roundBonus = round * 50;
    setChips(chips + roundBonus);

    setRound(round + 1);
    setAntes(3 + Math.floor(round / 3)); // Increase antes as rounds progress
    setRedraws(2);
    setScore(0);

    // Add cards back to deck
    const newDeck = shuffleDeck([...deck, ...hand, ...played]);
    setDeck(newDeck);
    setDeckAnimation(true);
    setTimeout(() => setDeckAnimation(false), 800);

    drawInitialHand(newDeck);
    setPlayed([]);
    setSelectedCards([]);

    setShowMessage(`Round ${round + 1} Started! +${roundBonus} chips`);
    setTimeout(() => setShowMessage(""), 2000);
  };

  const addJoker = (joker: JokerCard) => {
    setJokers([...jokers, joker]);
  };

  const getCardAnimationClass = (index: number) => {
    if (!animatingCards.includes(index)) return "";

    // If card is being selected
    if (!selectedCards.includes(index)) {
      return "animate-card-pick";
    }
    // If card is being deselected
    else {
      return "animate-card-unpick";
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="absolute top-40 left-0 right-0 text-center">
          <div className="flex items-center justify-center">
            <img
              src="/coin.png"
              alt="Coin"
              className="h-24 mr-2 object-contain animate-spin-slow"
            />
            <h1
              className="text-6xl font-bold text-yellow-400 mb-2 mx-2"
              style={{
                textShadow:
                  "0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3)",
              }}
            >
              Roguelike Poker
            </h1>
            <img
              src="/joker.png"
              alt="Joker"
              className="h-24 ml-2 object-contain animate-pulse"
              style={{
                transform: "scaleX(-1)",
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
              }}
            />
          </div>
          <div className="w-64 h-1 bg-yellow-500 mx-auto rounded-full mt-2"></div>
        </div>

        {score > 0 && (
          <div className="balatro-panel w-full max-w-md mb-6 py-4 animate-fadeIn">
            <p className="text-2xl text-gray-400">Game Over!</p>
            <p className="text-4xl font-bold text-yellow-400">Score: {score}</p>
            <p className="text-xl text-purple-400">Rounds: {round - 1}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button onClick={() => startGame()} className="balatro-btn py-4">
            {score > 0 ? "Play Again" : "Start Game"}
          </button>
          <button
            onClick={() => setShowTutorial(true)}
            className="balatro-btn"
            style={{ backgroundColor: "#555" }}
          >
            How to Play
          </button>
          <button
            onClick={() => navigate("/about")}
            className="balatro-btn"
            style={{ backgroundColor: "#6B46C1" }}
          >
            About Me
          </button>
        </div>

        {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-row overflow-hidden">
      {/* Left sidebar */}
      <div className="w-72 bg-black/20 border-r-4 border-yellow-900/50 p-3 flex flex-col gap-3">
        {/* Game title */}
        <div className="balatro-header">
          <h1 className="text-2xl font-bold text-yellow-400">
            Roguelike Poker
          </h1>
        </div>

        {/* Score */}
        <div className="balatro-panel">
          <div className="text-sm mb-1 text-gray-300">Score at least</div>
          <div className="balatro-score flex justify-center">
            <span className="text-white">★</span>
            <span className="text-red-500">{targetScore}</span>
          </div>
          <div className="text-sm mt-1 text-yellow-500 text-center">
            to advance
          </div>
        </div>

        {/* Round score */}
        <div className="balatro-panel">
          <div className="text-lg text-gray-400">Round score</div>
          <div className="balatro-score text-center">
            <span className="text-white">★</span>
            <span className="text-white">{score}</span>
          </div>
        </div>

        {/* Active Jokers */}
        {jokers.length > 0 && (
          <div className="balatro-panel">
            <div className="text-lg text-yellow-400 mb-2">Active Jokers</div>
            <div className="flex flex-col gap-2">
              {jokers.map((joker, index) => (
                <div key={index} className="balatro-panel-inner">
                  <div className="text-sm text-yellow-400">
                    {joker.jokerType}
                  </div>
                  <div className="text-xs text-gray-300">
                    {joker.jokerEffect}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hand type */}
        {handName && (
          <div className="balatro-panel">
            <div className="text-lg text-white mb-2">
              {handName} <span className="text-sm text-gray-400">lvl.1</span>
            </div>
            <div className="balatro-multiplier">
              <div className="balatro-multiplier-left flex-1">
                {handName === "Flush"
                  ? "800"
                  : handName === "Straight"
                  ? "600"
                  : handName === "Three of a Kind"
                  ? "400"
                  : handName === "Pair"
                  ? "200"
                  : "0"}
              </div>
              <div className="balatro-multiplier-symbol">×</div>
              <div className="balatro-multiplier-right">
                {jokers.length > 0
                  ? jokers
                      .reduce((mult, joker) => mult * joker.multiplier, 1)
                      .toFixed(1)
                  : "1"}
              </div>
            </div>
          </div>
        )}

        {/* Game controls */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            className="balatro-btn"
            onClick={() => playSelectedCards()}
            disabled={antes <= 0}
            style={{
              opacity: antes <= 0 ? 0.5 : 1,
            }}
          >
            Play ({antes})
          </button>
          <button
            className="balatro-btn"
            onClick={() => redrawCards()}
            disabled={redraws <= 0 || selectedCards.length === 0}
            style={{
              opacity: redraws <= 0 || selectedCards.length === 0 ? 0.5 : 1,
            }}
          >
            Redraw ({redraws})
          </button>
        </div>

        {/* Round info */}
        <div className="flex justify-between text-center">
          <div className="balatro-panel flex-1 mx-1">
            <div className="text-xs text-gray-400">Round</div>
            <div className="text-2xl text-yellow-500">{round}</div>
          </div>
          <div className="balatro-panel flex-1 mx-1">
            <div className="text-xs text-gray-400">Chips</div>
            <div className="text-2xl text-blue-400">{chips}</div>
          </div>
        </div>
      </div>

      {/* Main game area */}
      <div className="flex-1 relative">
        {/* Message popup */}
        {showMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInOut">
            <div className="balatro-panel text-center px-6 py-3">
              <div className="text-xl text-yellow-400 font-bold">
                {showMessage}
              </div>
            </div>
          </div>
        )}

        {/* Score animation */}
        {showScoreAnimation && scoreChange > 0 && (
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scoreUp">
            <div className="text-4xl text-yellow-400 font-bold">
              +{scoreChange}
            </div>
          </div>
        )}

        {/* Played cards area - top */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex">
          {played.slice(-4).map((card, index) => (
            <div
              key={`${card.suit}-${card.value}-${index}`}
              className="animate-cardEntrance"
              style={{
                marginLeft: index > 0 ? "-30px" : "0",
                zIndex: index,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Card
                suit={card.suit}
                value={card.value}
                effect={card.effect}
                points={card.points}
              />
            </div>
          ))}
        </div>

        {/* Hand cards area - bottom */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex">
          {hand.map((card, index) => {
            const isSelected = selectedCards.includes(index);
            const isAnimating = animatingCards.includes(index);
            const animationClass = getCardAnimationClass(index);
            const isBeingSelected =
              isAnimating && animationClass === "animate-card-pick";
            const isBeingDeselected =
              isAnimating && animationClass === "animate-card-unpick";

            // If card is selected or being selected, we need to maintain its elevated position
            const shouldBeElevated = isSelected && !isBeingDeselected;

            return (
              <div
                key={`${card.suit}-${card.value}-${index}`}
                onClick={() => toggleCardSelection(index)}
                className={`animate-cardDeal ${animationClass} ${
                  isAnimating ? "animating" : ""
                } ${shouldBeElevated ? "card-elevated" : ""}`}
                style={{
                  marginLeft: index > 0 ? "-20px" : "0",
                  zIndex:
                    isSelected || isBeingSelected ? index + 20 : index + 10,
                  // Apply transform only if card is not animating
                  transform: isAnimating
                    ? undefined // Let the animation handle this
                    : isSelected
                    ? "translateY(-20px) rotate(0deg) scale(1.03)"
                    : undefined,
                  transition: isAnimating
                    ? "none"
                    : "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Card
                  suit={card.suit}
                  value={card.value as any}
                  effect={card.effect}
                  points={card.points}
                  isSelected={isSelected || isBeingSelected}
                />
              </div>
            );
          })}
        </div>

        {/* Jokers area - right side */}
        <div className="absolute top-10 right-8 flex flex-col gap-2">
          {jokers.slice(0, 3).map((joker, index) => (
            <div
              key={index}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <Card
                suit={joker.suit}
                value={joker.value}
                effect={joker.effect}
                isSmall={true}
              />
            </div>
          ))}
        </div>

        {/* Deck */}
        {deck.length > 0 && (
          <div
            className={`absolute bottom-16 right-8 ${
              deckAnimation ? "animate-deckShuffle" : ""
            }`}
          >
            <div className="relative">
              {[...Array(Math.min(3, deck.length))].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${i * 2}px`,
                    top: `${i * 2}px`,
                    transform: `rotate(${i * 1}deg)`,
                  }}
                >
                  <Card suit="hearts" value="K" isFlipped={true} />
                </div>
              ))}
            </div>
            <div className="text-xs font-medium text-white text-center mt-2">
              {deck.length}/{deck.length + hand.length + played.length}
            </div>
          </div>
        )}
      </div>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      {showShop && (
        <Shop
          onClose={advanceToNextRound}
          chips={chips}
          setChips={setChips}
          addJoker={addJoker}
          round={round}
        />
      )}
    </div>
  );
}

export default App;

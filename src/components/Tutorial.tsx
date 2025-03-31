import React, { useState } from "react";
import { X } from "lucide-react";

interface TutorialProps {
  onClose: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Welcome to Roguelike Poker!",
      content: (
        <>
          <p className="mb-3">
            This is a roguelike deck-building game inspired by Balatro. Your
            goal is to build a powerful deck and score enough points to beat
            each round's target.
          </p>
          <p className="mb-3">
            Each round has a{" "}
            <strong className="text-yellow-400">target score</strong> that you
            must reach to advance. You'll have a limited number of{" "}
            <strong className="text-yellow-400">antes (plays)</strong> to
            achieve this score.
          </p>
          <p>
            As you progress, you'll earn{" "}
            <strong className="text-yellow-400">chips</strong> to buy{" "}
            <strong className="text-yellow-400">Jokers</strong> and other
            upgrades, but the game will get more challenging!
          </p>
        </>
      ),
    },
    {
      title: "Playing Cards & Scoring",
      content: (
        <>
          <p className="mb-3">
            Select up to <strong className="text-yellow-400">3 cards</strong>{" "}
            from your hand, then click{" "}
            <strong className="text-yellow-400">Play</strong> to submit them.
          </p>
          <p className="mb-3">
            The game recognizes poker hands and awards points:
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>
              <strong className="text-yellow-400">Pair: 200 points</strong>
            </li>
            <li>
              <strong className="text-yellow-400">
                Three of a Kind: 400 points
              </strong>
            </li>
            <li>
              <strong className="text-yellow-400">Straight: 600 points</strong>
            </li>
            <li>
              <strong className="text-yellow-400">Flush: 800 points</strong>
            </li>
          </ul>
          <p>
            If you don't form a poker hand, you'll score based on the total
            value of your cards.
          </p>
        </>
      ),
    },
    {
      title: "Jokers & Multipliers",
      content: (
        <>
          <p className="mb-3">
            <strong className="text-yellow-400">Jokers</strong> are special
            cards that enhance your scoring potential.
          </p>
          <p className="mb-3">Jokers can:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>Increase the value of specific poker hands</li>
            <li>Boost cards of a certain suit</li>
            <li>Apply multipliers to your scores</li>
            <li>Provide special abilities and effects</li>
          </ul>
          <p>
            Collect and combine Jokers strategically to maximize your score
            potential!
          </p>
        </>
      ),
    },
    {
      title: "The Shop",
      content: (
        <>
          <p className="mb-3">
            After each successful round, you'll visit the{" "}
            <strong className="text-yellow-400">Shop</strong> where you can
            spend your chips on:
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>
              <strong className="text-yellow-400">Jokers</strong> - Special
              cards with unique effects
            </li>
            <li>
              <strong className="text-yellow-400">Card Upgrades</strong> -
              Improve your existing cards
            </li>
            <li>
              <strong className="text-yellow-400">Deck Management</strong> - Add
              or remove cards
            </li>
          </ul>
          <p>
            Choose your purchases wisely to build a synergistic deck that can
            handle the increasing difficulty!
          </p>
        </>
      ),
    },
    {
      title: "Game Progression",
      content: (
        <>
          <p className="mb-3">As you advance through rounds:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>Target scores increase</li>
            <li>You earn more chips</li>
            <li>More powerful Jokers become available</li>
            <li>You'll need better strategies to win</li>
          </ul>
          <p className="mb-3">
            If you fail to meet a round's target score, the game ends.
          </p>
          <p>How far can you go? Good luck!</p>
        </>
      ),
    },
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onClose();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="balatro-panel max-w-md w-full mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-yellow-400"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          {pages[currentPage].title}
        </h2>
        <div className="text-white mb-6">{pages[currentPage].content}</div>
        <div className="flex justify-between">
          <button
            onClick={prevPage}
            className="balatro-btn py-2 px-4"
            style={{
              backgroundColor: currentPage === 0 ? "#555" : undefined,
              opacity: currentPage === 0 ? 0.5 : 1,
            }}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button onClick={nextPage} className="balatro-btn py-2 px-4">
            {currentPage === pages.length - 1 ? "Got it!" : "Next"}
          </button>
        </div>
        <div className="text-center mt-4 text-gray-400">
          Page {currentPage + 1} of {pages.length}
        </div>
      </div>
    </div>
  );
};

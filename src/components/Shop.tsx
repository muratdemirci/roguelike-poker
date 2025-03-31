import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { JokerCard, getRandomJoker } from "./Deck";

interface ShopProps {
  onClose: () => void;
  chips: number;
  setChips: (chips: number) => void;
  addJoker: (joker: JokerCard) => void;
  round: number;
}

export const Shop: React.FC<ShopProps> = ({
  onClose,
  chips,
  setChips,
  addJoker,
  round,
}) => {
  const [shopJokers, setShopJokers] = useState<JokerCard[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState("");

  // Generate shop items when shop opens
  useEffect(() => {
    // Generate more jokers as rounds increase
    const numJokers = Math.min(3 + Math.floor(round / 2), 6);
    const jokers: JokerCard[] = [];

    for (let i = 0; i < numJokers; i++) {
      jokers.push(getRandomJoker());
    }

    setShopJokers(jokers);
  }, [round]);

  const calculatePrice = (joker: JokerCard) => {
    // Base price depends on joker multiplier
    const basePrice = Math.floor(joker.multiplier * 100);

    // Adjust based on round and type
    let modifier = 1.0;

    if (joker.targetHand) {
      modifier += 0.2; // Hand-specific jokers cost more
    }

    if (joker.targetSuit) {
      modifier += 0.1; // Suit-specific jokers cost more
    }

    return Math.floor(basePrice * modifier);
  };

  const purchaseJoker = (index: number) => {
    const joker = shopJokers[index];
    const price = calculatePrice(joker);

    if (chips >= price && !purchasedItems.includes(index)) {
      setChips(chips - price);
      addJoker(joker);
      setPurchasedItems([...purchasedItems, index]);

      setShowMessage(`Purchased ${joker.jokerType}!`);
      setTimeout(() => setShowMessage(""), 1500);
    } else if (purchasedItems.includes(index)) {
      setShowMessage("Already purchased!");
      setTimeout(() => setShowMessage(""), 1500);
    } else {
      setShowMessage("Not enough chips!");
      setTimeout(() => setShowMessage(""), 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="balatro-panel max-w-4xl w-full mx-4 p-6 relative">
        {/* Shop header */}
        <div className="balatro-header mb-4">
          <h2 className="text-2xl font-bold">Shop</h2>
          <div className="absolute top-4 right-4 text-xl text-yellow-400">
            Chips: {chips}
          </div>
        </div>

        {/* Message popup */}
        {showMessage && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 animate-fadeInOut">
            <div className="balatro-panel px-4 py-2">
              <p className="text-yellow-400">{showMessage}</p>
            </div>
          </div>
        )}

        {/* Shop items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {shopJokers.map((joker, index) => (
            <div
              key={index}
              className={`balatro-panel-inner cursor-pointer hover:bg-gray-800 transition-colors ${
                purchasedItems.includes(index) ? "opacity-50" : ""
              }`}
              onClick={() => purchaseJoker(index)}
            >
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Card
                    suit={joker.suit}
                    value={joker.value}
                    effect={joker.effect}
                    isSmall={true}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-yellow-400 text-lg">{joker.jokerType}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {joker.jokerEffect}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-lg">
                      {calculatePrice(joker)}{" "}
                      <span className="text-blue-400">chips</span>
                    </span>
                    {purchasedItems.includes(index) && (
                      <span className="text-green-500">Purchased</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button onClick={onClose} className="balatro-btn px-8 py-3 text-xl">
            Continue to Round {round + 1}
          </button>
        </div>
      </div>
    </div>
  );
};

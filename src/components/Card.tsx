import React from "react";

type Suit = "hearts" | "diamonds" | "clubs" | "spades" | "special";
type Value =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A"
  | "JOKER"
  | "BOOST"
  | "DEBUFF";
type CardEffect = "none" | "double" | "draw" | "discard" | "penalty";

interface CardProps {
  suit: Suit;
  value: Value;
  effect?: CardEffect;
  isFlipped?: boolean;
  isSelected?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
  points?: number;
}

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
  special: "★",
};

const suitColors = {
  hearts: "text-red-600",
  diamonds: "text-red-600",
  clubs: "text-blue-900",
  spades: "text-blue-900",
  special: "text-purple-600",
};

const effectColors = {
  double: "text-yellow-500",
  draw: "text-green-500",
  discard: "text-red-500",
  penalty: "text-red-500",
  none: "text-purple-500",
};

export const Card: React.FC<CardProps> = ({
  suit,
  value,
  effect = "none",
  isFlipped = false,
  isSelected = false,
  isSmall = false,
  onClick,
  points = 0,
}) => {
  const suitSymbol = suitSymbols[suit];
  const color = suitColors[suit];
  const effectColor = effectColors[effect];

  const cardSizeClasses = isSmall
    ? "w-10 h-14"
    : "w-14 h-20 xxs:w-16 xxs:h-24 xs:w-20 xs:h-30 sm:w-24 sm:h-36";

  if (isFlipped) {
    return (
      <div
        onClick={onClick}
        className={`${cardSizeClasses} balatro-card card-hover-effect ${
          isSelected ? "ring-2 ring-yellow-400 card-selected" : ""
        }`}
      >
        <div className="w-full h-full balatro-card-back flex items-center justify-center">
          <div className="text-white text-2xl font-bold pixelated">★</div>
        </div>
      </div>
    );
  }

  const textSizeClasses = isSmall
    ? "text-xs"
    : "text-xs xxs:text-sm sm:text-base";

  const centerTextSizeClasses = isSmall ? "text-xl" : "text-3xl sm:text-5xl";

  const numberCenterTextSizeClasses = isSmall
    ? "text-base"
    : "text-xl sm:text-3xl";

  return (
    <div
      onClick={onClick}
      className={`${cardSizeClasses} balatro-card card-hover-effect cursor-pointer relative ${
        isSelected ? "ring-2 ring-yellow-400 card-selected" : ""
      }`}
    >
      <div className="w-full h-full bg-white flex flex-col p-1 xxs:p-2 relative">
        {/* Top left corner */}
        <div className="absolute top-1 left-1 flex flex-col items-center">
          <div className={`${textSizeClasses} font-bold ${color}`}>{value}</div>
          <div className={`${textSizeClasses} ${color}`}>{suitSymbol}</div>
        </div>

        {/* Bottom right corner (rotated) */}
        <div className="absolute bottom-1 right-1 flex flex-col items-center transform rotate-180">
          <div className={`${textSizeClasses} font-bold ${color}`}>{value}</div>
          <div className={`${textSizeClasses} ${color}`}>{suitSymbol}</div>
        </div>

        {/* Card center */}
        <div className="flex-1 flex items-center justify-center">
          {["J", "Q", "K", "A"].includes(value) ? (
            // Face card
            <div className={`${centerTextSizeClasses} ${color}`}>
              {value === "J" && "J"}
              {value === "Q" && "Q"}
              {value === "K" && "K"}
              {value === "A" && "A"}
            </div>
          ) : (
            // Number card - center suit symbol
            <div className={`${numberCenterTextSizeClasses} ${color}`}>
              {suitSymbol}
            </div>
          )}
        </div>

        {/* Effect if present */}
        {effect !== "none" && !isSmall && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-md px-1 py-0.5">
            <div className={`text-[8px] xxs:text-xs font-bold ${effectColor}`}>
              {effect.toUpperCase()}
            </div>
          </div>
        )}

        {/* Points if present */}
        {points > 0 && !isSmall && (
          <div className="absolute bottom-1 xxs:bottom-2 left-1/2 transform -translate-x-1/2 text-[8px] xxs:text-[10px] font-bold text-yellow-500">
            {points} pts
          </div>
        )}
      </div>
    </div>
  );
};

export type { Suit, Value, CardEffect };

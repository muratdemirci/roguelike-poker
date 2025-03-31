import { Suit, Value, CardEffect } from "./Card";

export interface GameCard {
  suit: Suit;
  value: Value;
  effect: CardEffect;
  points: number;
  multiplier?: number;
  isJoker?: boolean;
  jokerType?: string;
  jokerEffect?: string;
}

export interface JokerCard extends GameCard {
  isJoker: true;
  jokerType: string;
  jokerEffect: string;
  multiplier: number;
  targetSuit?: Suit;
  targetValue?: Value;
  targetHand?: string;
}

const cardValues: { [key in Value]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
  JOKER: 0,
  BOOST: 0,
  DEBUFF: 0,
};

// Create a standard deck of 52 cards
export const createStarterDeck = (): GameCard[] => {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const values: Value[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const deck: GameCard[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        suit,
        value,
        effect: "none",
        points: cardValues[value],
      });
    }
  }

  // Add starter jokers
  deck.push(
    createJoker(
      "Bronze Joker",
      "All hands give +50 points",
      1.5,
      undefined,
      undefined,
      undefined
    )
  );

  return deck;
};

// Create different types of joker cards
export const createJoker = (
  jokerType: string,
  jokerEffect: string,
  multiplier: number = 1,
  targetSuit?: Suit,
  targetValue?: Value,
  targetHand?: string
): JokerCard => {
  return {
    suit: "special",
    value: "JOKER",
    effect: "none",
    points: 0,
    isJoker: true,
    jokerType,
    jokerEffect,
    multiplier,
    targetSuit,
    targetValue,
    targetHand,
  };
};

export const jokerCollection = [
  createJoker("Bronze Joker", "All hands give +50 points", 1.5),
  createJoker("Silver Joker", "All hands give +100 points", 2),
  createJoker("Gold Joker", "All hands give +200 points", 3),
  createJoker(
    "Diamond Joker",
    "Increases Flush value by 100%",
    2,
    undefined,
    undefined,
    "Flush"
  ),
  createJoker(
    "Heart Joker",
    "Increases all Hearts cards' value by 50%",
    1.5,
    "hearts"
  ),
  createJoker(
    "Club Joker",
    "Increases all Clubs cards' value by 50%",
    1.5,
    "clubs"
  ),
  createJoker(
    "Spade Joker",
    "Increases all Spades cards' value by 50%",
    1.5,
    "spades"
  ),
  createJoker(
    "Royal Joker",
    "Doubles the value of all face cards",
    2,
    undefined,
    undefined
  ),
  createJoker(
    "Straight Joker",
    "Increases Straight value by 100%",
    2,
    undefined,
    undefined,
    "Straight"
  ),
  createJoker(
    "Pair Joker",
    "Increases Pair value by 100%",
    2,
    undefined,
    undefined,
    "Pair"
  ),
  createJoker(
    "Triple Joker",
    "Increases Three of a Kind value by 100%",
    2,
    undefined,
    undefined,
    "Three of a Kind"
  ),
];

// Shuffle the deck
export const shuffleDeck = (deck: GameCard[]): GameCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get random Joker
export const getRandomJoker = (): JokerCard => {
  const randomIndex = Math.floor(Math.random() * jokerCollection.length);
  return { ...jokerCollection[randomIndex] };
};

// Check if cards form a valid poker hand
const isPair = (cards: GameCard[]): boolean => {
  const valueCount: { [key: string]: number } = {};

  for (const card of cards) {
    if (valueCount[card.value]) {
      valueCount[card.value]++;
    } else {
      valueCount[card.value] = 1;
    }
  }

  return Object.values(valueCount).some((count) => count === 2);
};

const isThreeOfAKind = (cards: GameCard[]): boolean => {
  const valueCount: { [key: string]: number } = {};

  for (const card of cards) {
    if (valueCount[card.value]) {
      valueCount[card.value]++;
    } else {
      valueCount[card.value] = 1;
    }
  }

  return Object.values(valueCount).some((count) => count === 3);
};

const isStraight = (cards: GameCard[]): boolean => {
  if (cards.length < 3) return false;

  const values = cards
    .map((card) => cardValues[card.value as Value])
    .sort((a, b) => a - b);

  // Check for continuous sequence
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) {
      return false;
    }
  }

  return true;
};

const isFlush = (cards: GameCard[]): boolean => {
  if (cards.length < 3) return false;

  const firstSuit = cards[0].suit;
  return cards.every((card) => card.suit === firstSuit);
};

// Calculate score based on the hand played
export const calculateScore = (
  cards: GameCard[],
  jokers: JokerCard[] = []
): number => {
  if (cards.length === 0) return 0;

  let baseScore = 0;
  let handType = "";

  // Determine hand type and base score
  if (isFlush(cards)) {
    baseScore = 800;
    handType = "Flush";
  } else if (isStraight(cards)) {
    baseScore = 600;
    handType = "Straight";
  } else if (isThreeOfAKind(cards)) {
    baseScore = 400;
    handType = "Three of a Kind";
  } else if (isPair(cards)) {
    baseScore = 200;
    handType = "Pair";
  } else {
    // If no specific hand, score is sum of card values
    baseScore = cards.reduce((sum, card) => sum + card.points, 0);
    handType = "High Card";
  }

  // Apply joker effects
  let finalScore = baseScore;

  for (const joker of jokers) {
    // Apply global joker effects
    if (!joker.targetHand && !joker.targetSuit && !joker.targetValue) {
      finalScore = Math.floor(finalScore * joker.multiplier);
      continue;
    }

    // Apply hand-specific joker effects
    if (joker.targetHand && joker.targetHand === handType) {
      finalScore = Math.floor(finalScore * joker.multiplier);
      continue;
    }

    // Apply suit-specific joker effects
    if (
      joker.targetSuit &&
      cards.some((card) => card.suit === joker.targetSuit)
    ) {
      finalScore = Math.floor(finalScore * joker.multiplier);
      continue;
    }

    // Apply value-specific joker effects
    if (
      joker.targetValue &&
      cards.some((card) => card.value === joker.targetValue)
    ) {
      finalScore = Math.floor(finalScore * joker.multiplier);
      continue;
    }
  }

  return finalScore;
};

// Get the name of the poker hand
export const getHandName = (cards: GameCard[]): string => {
  if (isFlush(cards)) return "Flush";
  if (isStraight(cards)) return "Straight";
  if (isThreeOfAKind(cards)) return "Three of a Kind";
  if (isPair(cards)) return "Pair";
  return "High Card";
};

import React from "react";
import {
  Trophy,
  Heart,
  SkipForward,
  RotateCcw,
  HelpCircle,
  Home,
} from "lucide-react";

interface GameUIProps {
  score: number;
  round: number;
  targetScore: number;
  onEndTurn: () => void;
  onRedraw: () => void;
  canRedraw: boolean;
  onReset: () => void;
  onHelp: () => void;
  scoreChange?: number;
  showScoreAnimation?: boolean;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  round,
  targetScore,
  onEndTurn,
  onRedraw,
  canRedraw,
  onReset,
  onHelp,
  scoreChange = 0,
  showScoreAnimation = false,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 p-1 xxs:p-2 sm:p-3 border-b border-gray-800 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 xxs:w-5 xxs:h-5 text-yellow-400" />
            <span className="text-base xxs:text-lg font-bold text-yellow-400">
              {score}
            </span>
            {showScoreAnimation && scoreChange > 0 && (
              <span className="absolute -bottom-4 left-6 text-green-400 font-bold animate-scoreUp">
                +{scoreChange}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 xxs:w-5 xxs:h-5 text-red-400" />
            <span className="text-base xxs:text-lg font-bold text-white">
              R{round}
            </span>
          </div>
          <div className="text-xs text-gray-400">Target: {targetScore}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRedraw}
            disabled={!canRedraw}
            className="px-2 py-1 text-xs xxs:text-sm rounded-md bg-blue-700 text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 xxs:w-4 xxs:h-4" />
            <span className="hidden xxs:inline">Redraw</span>
          </button>

          <button
            onClick={onEndTurn}
            className="px-2 py-1 text-xs xxs:text-sm rounded-md bg-purple-700 text-white font-bold hover:bg-purple-600 transition-colors flex items-center gap-1"
          >
            <SkipForward className="w-3 h-3 xxs:w-4 xxs:h-4" />
            <span className="hidden xxs:inline">End Turn</span>
          </button>

          <button
            onClick={onReset}
            className="p-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <Home className="w-3 h-3 xxs:w-4 xxs:h-4" />
          </button>

          <button
            onClick={onHelp}
            className="p-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <HelpCircle className="w-3 h-3 xxs:w-4 xxs:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import { Book, GraduationCap } from 'lucide-react';

interface StoryPanelProps {
  currentLevel: number;
  isSuccess: boolean | null;
  treasureState: 'locked' | 'unlocking' | 'unlocked';
  storyText: string;
  challengeText: string;
  hintText: string | null;
}

const StoryPanel: React.FC<StoryPanelProps> = ({
  currentLevel,
  isSuccess,
  treasureState,
  storyText,
  challengeText,
  hintText
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Book className="mr-2 h-5 w-5" /> 
          Story Scene
        </h2>
        <div className="bg-java-primary/10 text-java-primary px-3 py-1 rounded-full flex items-center">
          <GraduationCap className="mr-1 h-4 w-4" />
          Level {currentLevel}
        </div>
      </div>

      <Card className="flex-grow relative bg-java-blue/50 border-java-primary/20 overflow-hidden">
        {/* Animation Scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Treasure chest */}
            <div className={`
              w-48 h-36 bg-amber-800 rounded-t-lg relative
              ${treasureState === 'unlocking' ? 'animate-unlock' : ''}
              ${treasureState === 'unlocked' ? 'transform rotateY(70deg)' : ''}
              transition-transform duration-1000
            `}>
              {/* Chest lid */}
              <div className="absolute top-0 left-0 w-full h-12 bg-amber-900 rounded-t-lg"></div>
              
              {/* Lock */}
              <div className={`absolute top-14 left-20 w-8 h-8 bg-yellow-600 rounded-sm 
                ${treasureState !== 'locked' ? 'opacity-0' : 'opacity-100'}
                transition-opacity duration-500
              `}></div>
              
              {/* Treasure/glow (only shown when unlocked) */}
              <div className={`absolute top-8 left-10 w-28 h-20
                ${treasureState === 'unlocked' ? 'bg-yellow-300/70 animate-pulse' : 'bg-transparent'}
                rounded-full blur-md transition-all duration-1000
              `}></div>
            </div>
            
            {/* Character */}
            <div className={`
              absolute bottom-0 left-0 w-12 h-24 ml-[-30px]
              ${isSuccess ? 'animate-celebrate' : 'animate-float'}
            `}>
              {/* Body */}
              <div className="w-12 h-16 bg-blue-700 rounded-t-full"></div>
              {/* Head */}
              <div className="w-10 h-10 bg-amber-200 rounded-full absolute top-[-6px] left-1"></div>
              {/* Arms */}
              <div className="w-4 h-12 bg-blue-700 absolute top-4 left-[-4px] rounded-l-full"></div>
              <div className="w-4 h-12 bg-blue-700 absolute top-4 right-[-4px] rounded-r-full"></div>
              {/* Expression */}
              <div className={`absolute top-1 left-3 w-4 h-1 ${isSuccess ? 'border-b-4 border-black rotate-180' : 'border-b-2 border-black'}`}></div>
            </div>
          </div>
        </div>

        {/* Success/failure indicators */}
        {isSuccess === true && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full animate-fade-in">
            Success!
          </div>
        )}
        {isSuccess === false && (
          <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full animate-fade-in">
            Try Again
          </div>
        )}
      </Card>

      <div className="mt-4 space-y-3">
        <div className="bg-white p-4 rounded-md border-l-4 border-java-primary">
          <h3 className="font-medium mb-1">Story:</h3>
          <p className="text-sm">{storyText}</p>
        </div>
        
        <div className="bg-java-light p-4 rounded-md border-l-4 border-java-primary">
          <h3 className="font-medium mb-1">Challenge:</h3>
          <p className="text-sm">{challengeText}</p>
        </div>
        
        {hintText && (
          <div className="bg-java-warning/20 p-4 rounded-md border-l-4 border-java-warning">
            <h3 className="font-medium mb-1">Hint:</h3>
            <p className="text-sm">{hintText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPanel;

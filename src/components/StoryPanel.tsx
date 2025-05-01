
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Book, GraduationCap, Sparkles, Trophy, Star } from 'lucide-react';

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
  // State for managing particles and environment effects
  const [showParticles, setShowParticles] = useState(false);
  
  // Reset particles when level changes or on success
  useEffect(() => {
    setShowParticles(false);
    
    if (isSuccess === true) {
      // Show celebration particles after a small delay
      const timer = setTimeout(() => setShowParticles(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, currentLevel]);
  
  // Get scene background based on level
  const getSceneBackground = () => {
    switch (currentLevel) {
      case 1:
        return 'bg-gradient-to-b from-java-light to-java-primary/30'; // Cave theme
      case 2:
        return 'bg-gradient-to-b from-amber-100 to-amber-300/50'; // Desert/gold theme
      case 3:
        return 'bg-gradient-to-b from-purple-100 to-purple-300/50'; // Magical realm theme
      case 4:
        return 'bg-gradient-to-b from-green-100 to-green-300/50'; // Staircase/jungle theme
      case 5:
        return 'bg-gradient-to-b from-blue-100 to-blue-300/50'; // Final challenge theme
      default:
        return 'bg-java-blue/50';
    }
  };

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

      <Card className={`flex-grow relative overflow-hidden border-java-primary/20 ${getSceneBackground()}`}>
        {/* Environment elements based on level */}
        <div className="absolute inset-0">
          {currentLevel === 1 && (
            <div className="w-full h-full">
              {/* Cave stalactites */}
              <div className="absolute top-0 left-1/4 w-2 h-16 bg-gray-800 rounded-b-lg"></div>
              <div className="absolute top-0 left-1/3 w-3 h-24 bg-gray-700 rounded-b-lg"></div>
              <div className="absolute top-0 right-1/4 w-2 h-12 bg-gray-800 rounded-b-lg"></div>
              <div className="absolute bottom-0 left-3/4 w-8 h-3 bg-gray-800 rounded-t-lg"></div>
            </div>
          )}
          
          {currentLevel === 2 && (
            <div className="w-full h-full">
              {/* Desert/sand dunes */}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-amber-300 rounded-t-[50%]"></div>
              <div className="absolute bottom-8 left-0 w-2/3 h-12 bg-amber-200 rounded-t-[40%]"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-70 blur-sm"></div> {/* Sun */}
            </div>
          )}
          
          {currentLevel === 3 && (
            <div className="w-full h-full">
              {/* Magical realm elements */}
              <div className="absolute top-3 left-6 w-8 h-8 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-6 right-12 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute bottom-12 left-1/4 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute bottom-6 right-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>
            </div>
          )}
          
          {currentLevel === 4 && (
            <div className="w-full h-full">
              {/* Staircase/jungle elements */}
              <div className="absolute bottom-0 left-0 w-full h-3 bg-green-800"></div> {/* Ground */}
              <div className="absolute bottom-3 left-1/4 w-1/2 h-2 bg-green-700"></div> {/* First step */}
              <div className="absolute bottom-5 left-1/3 w-1/3 h-2 bg-green-700"></div> {/* Second step */}
              <div className="absolute bottom-7 left-1/4 w-1/4 h-2 bg-green-700"></div> {/* Third step */}
              <div className="absolute bottom-9 left-1/5 w-1/5 h-2 bg-green-700"></div> {/* Fourth step */}
              <div className="absolute bottom-11 left-1/6 w-1/6 h-2 bg-green-700"></div> {/* Fifth step */}
              
              {/* Jungle foliage */}
              <div className="absolute top-2 left-2 w-8 h-8 bg-green-500 rounded-full opacity-60"></div>
              <div className="absolute top-3 right-3 w-10 h-6 bg-green-600 rounded-full opacity-40"></div>
            </div>
          )}
          
          {currentLevel === 5 && (
            <div className="w-full h-full">
              {/* Final challenge scene with mystical elements */}
              <div className="absolute top-4 left-1/4 w-1/2 h-1/2 rounded-full bg-blue-300 opacity-30 animate-pulse"></div>
              <div className="absolute top-6 left-1/3 w-1/3 h-1/3 rounded-full bg-blue-400 opacity-20 animate-pulse delay-300"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-blue-500 rounded-full opacity-40 animate-ping"></div>
              <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-90 animate-ping"></div> {/* Stars */}
              <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full opacity-90 animate-ping delay-700"></div>
              <div className="absolute top-3/4 right-1/2 w-1 h-1 bg-white rounded-full opacity-90 animate-ping delay-500"></div>
            </div>
          )}
        </div>

        {/* Main animation scene */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-48 h-48">
            {/* Treasure chest with improved animations */}
            <div className={`
              w-48 h-36 bg-amber-800 rounded-t-lg relative
              ${treasureState === 'unlocking' ? 'animate-pulse transition-transform duration-500' : ''}
              ${treasureState === 'unlocked' ? 'transform scale-110 rotateY(70deg)' : ''}
              transition-all duration-1000
            `}>
              {/* Chest details */}
              <div className="absolute top-0 left-0 w-full h-12 bg-amber-900 rounded-t-lg"></div>
              <div className="absolute top-12 left-0 w-full h-1 bg-amber-950"></div>
              <div className="absolute top-3 left-4 w-40 h-6 bg-amber-700 rounded-lg"></div>
              
              {/* Metal parts and details */}
              <div className="absolute top-14 left-2 w-44 h-1 bg-amber-600"></div>
              <div className="absolute top-20 left-2 w-44 h-1 bg-amber-600"></div>
              <div className="absolute top-26 left-2 w-44 h-1 bg-amber-600"></div>
              <div className="absolute top-14 left-0 w-1 h-22 bg-amber-600"></div>
              <div className="absolute top-14 right-0 w-1 h-22 bg-amber-600"></div>
              
              {/* Lock */}
              <div className={`absolute top-14 left-20 w-8 h-8 bg-yellow-600 rounded-sm 
                ${treasureState !== 'locked' ? 'opacity-0 transform translate-y-3' : 'opacity-100'}
                transition-all duration-500
              `}></div>
              
              {/* Inside glow (only shown when unlocked) */}
              <div className={`absolute top-8 left-10 w-28 h-20
                ${treasureState === 'unlocked' ? 'bg-yellow-300/70 animate-pulse' : 'bg-transparent'}
                rounded-full blur-md transition-all duration-1000
              `}></div>
              
              {/* Treasure sparkles (when unlocked) */}
              {treasureState === 'unlocked' && (
                <>
                  <div className="absolute top-10 left-15 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-16 left-20 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
                  <div className="absolute top-14 left-25 w-2 h-2 bg-white rounded-full animate-ping delay-500"></div>
                </>
              )}
            </div>
            
            {/* Character with improved animations */}
            <div className={`
              absolute bottom-0 left-0 w-12 h-24 ml-[-30px]
              ${isSuccess === true ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : 'animate-[float_3s_ease-in-out_infinite]'}
              transition-all duration-300
            `}>
              {/* Body with improved details */}
              <div className="w-12 h-16 bg-blue-700 rounded-t-full relative">
                {/* Belt */}
                <div className="absolute top-8 w-full h-2 bg-amber-800"></div>
                {/* Buttons */}
                <div className="absolute top-4 left-5 w-2 h-2 bg-amber-400 rounded-full"></div>
                <div className="absolute top-6 left-5 w-2 h-2 bg-amber-400 rounded-full"></div>
              </div>
              
              {/* Head with improved details */}
              <div className="w-10 h-10 bg-amber-200 rounded-full absolute top-[-6px] left-1 flex justify-center items-center">
                {/* Eyes */}
                <div className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                
                {/* Expression - changes based on success state */}
                <div className={`absolute top-6 w-4 h-1 
                  ${isSuccess === true ? 'bg-gray-800 rounded-full' : 
                    isSuccess === false ? 'border-t-2 border-gray-800 rounded-t-full' : 
                    'border-b-2 border-gray-800 rounded-b-full'}
                `}></div>
                
                {/* Hair */}
                <div className="absolute top-[-2px] left-2 w-6 h-2 bg-amber-800 rounded-t-md"></div>
              </div>
              
              {/* Arms with improved animations */}
              <div className={`w-4 h-12 bg-blue-700 absolute top-4 left-[-4px] rounded-l-full 
                ${isSuccess === true ? 'animate-[wave_1s_ease-in-out_infinite]' : ''}
              `}></div>
              <div className={`w-4 h-12 bg-blue-700 absolute top-4 right-[-4px] rounded-r-full
                ${isSuccess === true ? 'animate-[wave_1.2s_ease-in-out_infinite]' : ''}
              `}></div>
              
              {/* Legs */}
              <div className={`w-4 h-6 bg-blue-800 absolute bottom-0 left-1 rounded-b-lg
                ${isSuccess === true ? 'animate-[stomp_0.5s_ease-in-out_infinite_alternate]' : ''}
              `}></div>
              <div className={`w-4 h-6 bg-blue-800 absolute bottom-0 right-1 rounded-b-lg
                ${isSuccess === true ? 'animate-[stomp_0.5s_ease-in-out_infinite_alternate_delay-100]' : ''}
              `}></div>
            </div>
          </div>
        </div>

        {/* Success particle effects */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-100"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-200"></div>
            <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-300"></div>
            <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-400"></div>
          </div>
        )}

        {/* Success/failure indicators with improved animations */}
        {isSuccess === true && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center animate-scale-in">
            <Sparkles className="mr-1 h-4 w-4" />
            Success!
          </div>
        )}
        {isSuccess === false && (
          <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center animate-scale-in">
            Try Again
          </div>
        )}
        
        {/* Level identifier with icon */}
        <div className="absolute bottom-4 left-4 bg-java-primary/60 text-white px-3 py-1 rounded-full">
          {currentLevel === 5 ? (
            <Trophy className="inline-block mr-1 h-4 w-4" />
          ) : (
            <Star className="inline-block mr-1 h-4 w-4" />
          )}
          Level {currentLevel}
        </div>
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


import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Castle, Sparkles, Trophy, Diamond } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: number;
  completedLevels: number[];
  totalLevels: number;
  onSelectLevel: (level: number) => void;
}

// Level themes and icons for each level
const getLevelIcon = (level: number, isCompleted: boolean, isCurrent: boolean) => {
  switch (level) {
    case 1:
      return <Castle className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
    case 2:
      return <Diamond className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
    case 3:
      return <Sparkles className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
    case 4:
      return <GraduationCap className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
    case 5:
      return <Trophy className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
    default:
      return <GraduationCap className={`h-4 w-4 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-white' : 'text-gray-500'}`} />;
  }
};

const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  completedLevels,
  totalLevels,
  onSelectLevel
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 w-full py-4 px-4 bg-white border-b shadow-sm">
      <span className="font-medium flex items-center text-java-darker">
        <GraduationCap className="mr-2 h-5 w-5 text-java-primary" /> Progress Map:
      </span>
      
      <div className="flex items-center space-x-3 md:space-x-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto justify-start md:justify-center">
        {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level) => {
          const isCompleted = completedLevels.includes(level);
          const isCurrent = level === currentLevel;
          
          return (
            <div key={level} className="flex flex-col items-center">
              <Button
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                className={`
                  w-12 h-12 rounded-full p-0 relative group
                  ${isCompleted ? 'border-green-500 border-2' : ''}
                  ${isCurrent ? 'bg-java-primary text-white shadow-md' : ''}
                  ${!isCompleted && !isCurrent ? 'text-gray-500' : ''}
                  transition-all hover:scale-110
                `}
                onClick={() => onSelectLevel(level)}
                disabled={!isCompleted && !isCurrent && level !== Math.min(...completedLevels.map(l => l + 1), totalLevels)}
              >
                {getLevelIcon(level, isCompleted, isCurrent)}
                <span className="block mt-1">{level}</span>
                
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {isCurrent && (
                  <div className="absolute -top-1 -right-1 bg-java-primary rounded-full w-4 h-4 flex items-center justify-center border border-white animate-pulse">
                  </div>
                )}
              </Button>
              
              <span className="text-xs mt-1 text-gray-600 hidden md:block">
                {level === 1 ? 'Print' : 
                 level === 2 ? 'Strings' : 
                 level === 3 ? 'If/Else' : 
                 level === 4 ? 'Loops' : 
                 'Methods'}
              </span>
              
              {/* Connection line between levels */}
              {level < totalLevels && (
                <div className="hidden md:block absolute left-[calc(100%+8px)] w-3 h-0.5 bg-gray-300"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;

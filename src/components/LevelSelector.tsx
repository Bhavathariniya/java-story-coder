
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: number;
  completedLevels: number[];
  totalLevels: number;
  onSelectLevel: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  completedLevels,
  totalLevels,
  onSelectLevel
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 w-full py-3 bg-white border-b">
      <span className="mr-2 font-medium flex items-center text-gray-700">
        <GraduationCap className="mr-1 h-5 w-5" /> Progress:
      </span>
      
      {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level) => (
        <Button
          key={level}
          variant={level === currentLevel ? "default" : "outline"}
          size="sm"
          className={`
            w-10 h-10 rounded-full p-0 
            ${completedLevels.includes(level) ? 'border-green-500 text-green-500' : ''}
            ${level === currentLevel ? 'bg-java-primary text-white' : ''}
            ${!completedLevels.includes(level) && level !== currentLevel ? 'text-gray-500' : ''}
          `}
          onClick={() => onSelectLevel(level)}
        >
          {level}
        </Button>
      ))}
    </div>
  );
};

export default LevelSelector;

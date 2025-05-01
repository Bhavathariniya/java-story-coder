
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import StoryPanel from '@/components/StoryPanel';
import LevelSelector from '@/components/LevelSelector';
import { 
  executeJavaCode, 
  getDefaultCodeForLevel, 
  getStoryTextForLevel,
  getChallengeTextForLevel,
  getHintTextForLevel
} from '@/utils/javaExecutor';

// Add keyframe animations to the global style
const animationStyles = `
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(15deg); }
  }
  
  @keyframes stomp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-3px); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes celebrate {
    0% { transform: translateY(0) rotate(0); }
    25% { transform: translateY(-10px) rotate(-5deg); }
    50% { transform: translateY(0) rotate(0); }
    75% { transform: translateY(-10px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0); }
  }
  
  @keyframes scale-in {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes unlock {
    0% { transform: rotate(0); }
    25% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
    75% { transform: rotate(-2deg); }
    100% { transform: rotate(0); }
  }
`;

const Index = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [defaultCode, setDefaultCode] = useState(getDefaultCodeForLevel(1));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [treasureState, setTreasureState] = useState<'locked' | 'unlocking' | 'unlocked'>('locked');

  // Apply animation styles once when component mounts
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Reset state when level changes
    setDefaultCode(getDefaultCodeForLevel(currentLevel));
    setOutput('');
    setIsSuccess(null);
    setTreasureState('locked');
  }, [currentLevel]);

  const handleRunCode = async (code: string) => {
    setIsRunning(true);
    setIsSuccess(null);
    
    try {
      const result = await executeJavaCode(code, currentLevel);
      setOutput(result.output);
      
      if (result.success) {
        setIsSuccess(true);
        setTreasureState('unlocking');
        
        // Add a delay before marking the level as completed and unlocking the chest
        setTimeout(() => {
          setTreasureState('unlocked');
          
          if (!completedLevels.includes(currentLevel)) {
            setCompletedLevels([...completedLevels, currentLevel]);
            
            toast({
              title: "Level Completed!",
              description: `You've unlocked level ${currentLevel + 1}!`,
            });
          }
        }, 1500);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code');
      setIsSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <LevelSelector 
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        totalLevels={5}
        onSelectLevel={handleSelectLevel}
      />
      
      <main className="container mx-auto flex-grow p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Story Panel (Left Side) */}
          <div className="h-[500px] md:h-auto">
            <StoryPanel 
              currentLevel={currentLevel}
              isSuccess={isSuccess}
              treasureState={treasureState}
              storyText={getStoryTextForLevel(currentLevel)}
              challengeText={getChallengeTextForLevel(currentLevel)}
              hintText={getHintTextForLevel(currentLevel)}
            />
          </div>
          
          {/* Code Editor Panel (Right Side) */}
          <div className="h-[500px] md:h-auto">
            <CodeEditor 
              defaultCode={defaultCode}
              onRun={handleRunCode}
              output={output}
              isRunning={isRunning}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-java-darker text-white text-center py-4">
        <p className="text-sm text-gray-400">Java Story Coder - Learn Java through interactive stories</p>
      </footer>
    </div>
  );
};

export default Index;

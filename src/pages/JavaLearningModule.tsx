
import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Info, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const JavaLearningModule: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Define levels with increasing complexity
  const levels = [
    {
      title: "Hello World",
      description: "Let's start with a simple print statement",
      storyText: "Our adventurer approaches a small wooden door with a simple lock.",
      task: "Print 'hello world' to unlock the door",
      hint: "Use System.out.println(\"hello world\");",
      solution: "hello world",
      template: `public class Solution {
  public static void main(String[] args) {
    // Your code here
    
  }
}`,
      animation: "door-locked",
      successAnimation: "door-open"
    },
    {
      title: "String Reversal",
      description: "Learn to manipulate strings by reversing them",
      storyText: "A treasure chest with a complex lock stands before our hero.",
      task: "Reverse the string 'treasure' and print it",
      hint: "Try using StringBuilder's reverse() method",
      solution: "erusaert",
      template: `public class Solution {
  public static void main(String[] args) {
    String secret = "treasure";
    // Your code here - reverse the string and print it
    
  }
}`,
      animation: "chest-locked",
      successAnimation: "chest-open"
    },
    {
      title: "Loops and Counting",
      description: "Use for loops to solve problems",
      storyText: "Our adventurer must climb a steep staircase to reach the castle gate.",
      task: "Print the numbers 1 to 10, each on a new line",
      hint: "Use a for loop from 1 to 10",
      solution: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
      template: `public class Solution {
  public static void main(String[] args) {
    // Write a loop to print numbers 1 to 10
    
  }
}`,
      animation: "stairs-waiting",
      successAnimation: "climbing-stairs"
    },
    {
      title: "Conditional Logic",
      description: "Use if-else statements to make decisions",
      storyText: "A magical bridge appears broken. Our hero needs to fix it with code.",
      task: "Check if the number 7 is greater than 5 and print 'Bridge fixed!' if true, otherwise print 'Still broken'",
      hint: "Use an if-else statement to compare values",
      solution: "Bridge fixed!",
      template: `public class Solution {
  public static void main(String[] args) {
    int magicNumber = 7;
    // Use conditional logic here
    
  }
}`,
      animation: "bridge-broken",
      successAnimation: "bridge-fixed"
    },
    {
      title: "Functions",
      description: "Create and use methods to organize your code",
      storyText: "The final castle door requires a special key created by a function.",
      task: "Create a method called 'createKey' that returns the string 'golden_key' and print the result",
      hint: "Define a method with a return type of String",
      solution: "golden_key",
      template: `public class Solution {
  public static void main(String[] args) {
    // Call your createKey method and print the result
    
  }
  
  // Define your createKey method here
  
}`,
      animation: "castle-door-locked",
      successAnimation: "castle-door-open"
    }
  ];

  useEffect(() => {
    setCode(levels[currentLevel].template);
  }, [currentLevel]);

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate compiler execution
    setTimeout(() => {
      // For demo purposes, we'll check against predefined expected outputs
      // In a real implementation, this would connect to a Java compiler API
      
      // Simplified output validation
      let simulatedOutput = "";
      
      // Level 0: Hello World
      if (currentLevel === 0 && code.includes('System.out.println("hello world")')) {
        simulatedOutput = "hello world";
      }
      // Level 1: String Reversal
      else if (currentLevel === 1 && (
        code.includes('new StringBuilder(secret).reverse().toString()') || 
        code.includes('for') && code.includes('charAt') || 
        code.includes('erusaert')
      )) {
        simulatedOutput = "erusaert";
      }
      // Level 2: Loops
      else if (currentLevel === 2 && 
        code.includes('for') && code.includes('i') && 
        code.includes('System.out.println')
      ) {
        simulatedOutput = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      }
      // Level 3: Conditionals
      else if (currentLevel === 3 && 
        code.includes('if') && 
        code.includes('magicNumber > 5') &&
        code.includes('Bridge fixed')
      ) {
        simulatedOutput = "Bridge fixed!";
      }
      // Level 4: Functions
      else if (currentLevel === 4 && 
        code.includes('createKey') && 
        code.includes('return') && 
        code.includes('golden_key')
      ) {
        simulatedOutput = "golden_key";
      }
      else {
        simulatedOutput = "Compilation error or incorrect output.\nTry again!";
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
      
      // Check if the solution is correct
      const isOutputCorrect = simulatedOutput === levels[currentLevel].solution;
      setIsCorrect(isOutputCorrect);
      
      if (isOutputCorrect) {
        if (!completedLevels.includes(currentLevel)) {
          setCompletedLevels([...completedLevels, currentLevel]);
        }
        setShowLevelComplete(true);
        
        toast({
          title: "Success!",
          description: "You've solved the challenge!",
          variant: "success"
        });
        
        // Reset after showing completion for a moment
        setTimeout(() => {
          setShowLevelComplete(false);
        }, 3000);
      }
    }, 1500);
  };

  const advanceToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setIsCorrect(false);
      setOutput('');
      setShowHint(false);
    }
  };

  // Animation component based on current level and correctness
  const StoryAnimation = () => {
    const currentAnim = isCorrect 
      ? levels[currentLevel].successAnimation 
      : levels[currentLevel].animation;
    
    // Enhanced animations
    const animationContent = () => {
      switch (currentAnim) {
        case 'door-locked':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg"></div>
              
              {/* Door */}
              <div className="absolute w-48 h-64 bg-amber-800 rounded-t-lg shadow-lg mx-auto">
                <div className="absolute w-full h-1 bg-amber-950 top-16"></div>
                <div className="absolute w-full h-1 bg-amber-950 top-32"></div>
                <div className="absolute w-full h-1 bg-amber-950 top-48"></div>
                
                {/* Door handle and lock */}
                <div className="absolute top-28 right-4 w-6 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-950 rounded-full"></div>
                </div>
                
                {/* Lock */}
                <div className="absolute top-28 left-4 w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center border-2 border-gray-800">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* Character */}
              <div className="absolute bottom-2 left-12 animate-[float_3s_ease-in-out_infinite]">
                <div className="w-12 h-16 bg-blue-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-10 h-10 bg-amber-200 rounded-full absolute -top-9 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    
                    {/* Mouth - thinking expression */}
                    <div className="absolute top-6 w-4 h-1 border-t border-gray-800"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute top-2 -left-5 w-5 h-3 bg-blue-700 rounded-l-full"></div>
                  <div className="absolute top-2 -right-5 w-5 h-3 bg-blue-700 rounded-r-full"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-3 h-4 bg-blue-900"></div>
                  <div className="absolute bottom-0 right-2 w-3 h-4 bg-blue-900"></div>
                </div>
              </div>
              
              {/* Thought bubble */}
              <div className="absolute top-4 left-24 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs">How do I unlock this?</div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-gray-300">Door is locked</div>
            </div>
          );
        case 'door-open':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Background with light streaming in */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-300/50 rounded-lg"></div>
              <div className="absolute inset-0 bg-yellow-100 opacity-20 animate-pulse rounded-lg"></div>
              
              {/* Open door */}
              <div className="absolute w-48 h-64 bg-amber-800 rounded-t-lg shadow-lg mx-auto transform origin-left rotate-30 animate-[unlock_1s_ease-in-out_forwards]">
                <div className="absolute w-full h-1 bg-amber-950 top-16"></div>
                <div className="absolute w-full h-1 bg-amber-950 top-32"></div>
                <div className="absolute w-full h-1 bg-amber-950 top-48"></div>
                
                {/* Door handle */}
                <div className="absolute top-28 right-4 w-6 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-950 rounded-full"></div>
                </div>
                
                {/* Open lock */}
                <div className="absolute top-28 left-4 w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center border-2 border-gray-800 opacity-80">
                  <div className="w-6 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* Doorway light */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-48 bg-yellow-100 opacity-50"></div>
              
              {/* Character celebrating */}
              <div className="absolute bottom-2 left-32 animate-[celebrate_1s_ease-in-out_infinite]">
                <div className="w-12 h-16 bg-blue-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-10 h-10 bg-amber-200 rounded-full absolute -top-9 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    
                    {/* Smile */}
                    <div className="absolute top-5 w-6 h-2 border-b-2 border-gray-800 rounded-b-full"></div>
                  </div>
                  
                  {/* Arms waving */}
                  <div className="absolute top-2 -left-5 w-5 h-3 bg-blue-700 rounded-l-full transform rotate-45 origin-right animate-[wave_0.5s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute top-2 -right-5 w-5 h-3 bg-blue-700 rounded-r-full transform -rotate-45 origin-left animate-[wave_0.5s_ease-in-out_infinite_alternate_delay-100]"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-3 h-4 bg-blue-900 animate-[stomp_0.3s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute bottom-0 right-2 w-3 h-4 bg-blue-900 animate-[stomp_0.3s_ease-in-out_infinite_alternate_delay-150]"></div>
                </div>
              </div>
              
              {/* Success particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-100"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-200"></div>
              
              <div className="absolute bottom-0 w-full text-center text-green-600 font-bold">Door opened!</div>
            </div>
          );
        case 'chest-locked':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Cave background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg">
                {/* Stalactites */}
                <div className="absolute top-0 left-1/4 w-2 h-16 bg-gray-700 rounded-b-lg"></div>
                <div className="absolute top-0 left-1/3 w-3 h-24 bg-gray-600 rounded-b-lg"></div>
                <div className="absolute top-0 right-1/4 w-2 h-12 bg-gray-700 rounded-b-lg"></div>
              </div>
              
              {/* Chest */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-36 bg-amber-800 rounded-t-lg relative">
                  {/* Chest top */}
                  <div className="absolute top-0 left-0 w-full h-12 bg-amber-900 rounded-t-lg"></div>
                  <div className="absolute top-12 left-0 w-full h-1 bg-amber-950"></div>
                  <div className="absolute top-3 left-4 w-40 h-6 bg-amber-700 rounded-lg"></div>
                  
                  {/* Metal parts */}
                  <div className="absolute top-14 left-2 w-44 h-1 bg-amber-600"></div>
                  <div className="absolute top-20 left-2 w-44 h-1 bg-amber-600"></div>
                  <div className="absolute top-26 left-2 w-44 h-1 bg-amber-600"></div>
                  <div className="absolute top-14 left-0 w-1 h-22 bg-amber-600"></div>
                  <div className="absolute top-14 right-0 w-1 h-22 bg-amber-600"></div>
                  
                  {/* Lock */}
                  <div className="absolute top-14 left-20 w-8 h-8 bg-yellow-600 rounded-sm"></div>
                </div>
              </div>
              
              {/* Character thinking */}
              <div className="absolute bottom-2 left-12 animate-[float_3s_ease-in-out_infinite]">
                <div className="w-12 h-16 bg-amber-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-10 h-10 bg-amber-200 rounded-full absolute -top-9 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    
                    {/* Thinking mouth */}
                    <div className="absolute top-6 w-4 h-1 border-t border-gray-800 rounded"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute top-4 left-[-4px] w-4 h-4 bg-amber-700 rounded-full"></div>
                  <div className="absolute top-4 right-[-4px] w-4 h-4 bg-amber-700 rounded-full"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-3 h-4 bg-amber-800"></div>
                  <div className="absolute bottom-0 right-2 w-3 h-4 bg-amber-800"></div>
                </div>
              </div>
              
              {/* Thought bubble */}
              <div className="absolute top-5 left-20 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs">How to unlock this chest?</div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-gray-300">Chest is locked</div>
            </div>
          );
        case 'chest-open':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Cave background with light */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg"></div>
              
              {/* Chest bottom */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/3">
                <div className="w-48 h-36 bg-amber-800 rounded-b-lg relative">
                  {/* Metal parts */}
                  <div className="absolute top-6 left-2 w-44 h-1 bg-amber-600"></div>
                  <div className="absolute top-12 left-2 w-44 h-1 bg-amber-600"></div>
                  <div className="absolute top-18 left-2 w-44 h-1 bg-amber-600"></div>
                  
                  {/* Treasure glow */}
                  <div className="absolute top-6 left-10 w-28 h-20 bg-yellow-300/70 animate-pulse rounded-full blur-md"></div>
                  
                  {/* Treasure */}
                  <div className="absolute top-6 left-16 w-16 h-16">
                    <div className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 left-8 w-6 h-6 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                    <div className="absolute top-2 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
              
              {/* Chest lid open */}
              <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-full -rotate-90 origin-bottom">
                <div className="w-48 h-12 bg-amber-900 rounded-t-lg relative">
                  <div className="absolute top-3 left-4 w-40 h-6 bg-amber-700 rounded-lg"></div>
                  
                  {/* Lock open */}
                  <div className="absolute -top-8 left-20 w-8 h-8 bg-yellow-600 rounded-sm transform rotate-90"></div>
                </div>
              </div>
              
              {/* Character celebrating */}
              <div className="absolute bottom-6 right-12 animate-[celebrate_1s_ease-in-out_infinite]">
                <div className="w-12 h-16 bg-amber-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-10 h-10 bg-amber-200 rounded-full absolute -top-9 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
                    
                    {/* Smile */}
                    <div className="absolute top-5 w-6 h-2 border-b-2 border-gray-800 rounded-b-full"></div>
                  </div>
                  
                  {/* Arms celebrating */}
                  <div className="absolute top-2 -left-6 w-6 h-3 bg-amber-700 rounded-l-full transform -rotate-45 origin-right animate-[wave_0.5s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute top-2 -right-6 w-6 h-3 bg-amber-700 rounded-r-full transform rotate-45 origin-left animate-[wave_0.5s_ease-in-out_infinite_alternate_delay-100]"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-3 h-4 bg-amber-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute bottom-0 right-2 w-3 h-4 bg-amber-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate_delay-150]"></div>
                </div>
              </div>
              
              {/* Treasure sparkles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-600"></div>
              
              <div className="absolute bottom-0 w-full text-center text-green-400 font-bold">Treasure found!</div>
            </div>
          );
        case 'stairs-waiting':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-green-950 rounded-lg opacity-80"></div>
              
              {/* Stairs */}
              <div className="absolute bottom-2 left-0 w-full">
                <div className="w-full h-48 flex flex-col-reverse">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex justify-end">
                      <div 
                        className="h-4 bg-gray-400 border border-gray-600" 
                        style={{width: `${100 - i*8}%`, marginBottom: `${i === 0 ? 0 : 1}px`}}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Castle at top of stairs */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-40 h-20 bg-gray-700 rounded relative">
                  {/* Castle towers */}
                  <div className="absolute -top-8 -left-2 w-8 h-12 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-6 left-8 w-8 h-10 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-10 right-12 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-4 -right-2 w-8 h-8 bg-gray-600 rounded-t-lg"></div>
                  
                  {/* Castle door */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-amber-900 rounded-t-lg"></div>
                  
                  {/* Windows */}
                  <div className="absolute top-2 left-6 w-3 h-3 bg-yellow-300 rounded-full opacity-50"></div>
                  <div className="absolute top-2 right-6 w-3 h-3 bg-yellow-300 rounded-full opacity-50"></div>
                </div>
              </div>
              
              {/* Character looking up at stairs */}
              <div className="absolute bottom-6 left-6 animate-[float_2s_ease-in-out_infinite]">
                <div className="w-10 h-14 bg-green-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    
                    {/* Face expression - determination */}
                    <div className="absolute top-5 w-4 h-0.5 bg-gray-800"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute top-2 -left-4 w-4 h-3 bg-green-700 rounded-l-full"></div>
                  <div className="absolute top-2 -right-4 w-4 h-3 bg-green-700 rounded-r-full"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-2 h-3 bg-green-800"></div>
                  <div className="absolute bottom-0 right-2 w-2 h-3 bg-green-800"></div>
                </div>
              </div>
              
              {/* Thought bubble */}
              <div className="absolute top-12 left-12 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs">That's a lot of stairs...</div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-gray-300">The staircase awaits</div>
            </div>
          );
        case 'climbing-stairs':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-green-900 rounded-lg opacity-80"></div>
              
              {/* Stairs */}
              <div className="absolute bottom-2 left-0 w-full">
                <div className="w-full h-48 flex flex-col-reverse">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex justify-end">
                      <div 
                        className={`h-4 ${i < 7 ? 'bg-green-500 border-green-600' : 'bg-gray-400 border-gray-600'} border`}
                        style={{width: `${100 - i*8}%`, marginBottom: `${i === 0 ? 0 : 1}px`}}
                      ></div>
                      {i === 7 && (
                        <div className="absolute animate-[stomp_0.3s_ease-in-out_infinite_alternate]">
                          <div className="w-10 h-14 bg-green-700 rounded-t-full relative">
                            {/* Head */}
                            <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                              {/* Eyes */}
                              <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                              
                              {/* Face expression - effort */}
                              <div className="absolute top-5 w-4 h-0.5 bg-gray-800"></div>
                            </div>
                            
                            {/* Arms in climbing motion */}
                            <div className="absolute top-0 -left-4 w-4 h-3 bg-green-700 rounded-l-full animate-[wave_0.5s_ease-in-out_infinite_alternate]"></div>
                            <div className="absolute top-4 -right-4 w-4 h-3 bg-green-700 rounded-r-full animate-[wave_0.5s_ease-in-out_infinite_alternate_delay-250]"></div>
                            
                            {/* Legs */}
                            <div className="absolute bottom-0 left-2 w-2 h-3 bg-green-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate]"></div>
                            <div className="absolute bottom-0 right-2 w-2 h-3 bg-green-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate_delay-150]"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Castle at top of stairs */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-40 h-20 bg-gray-700 rounded relative">
                  {/* Castle towers */}
                  <div className="absolute -top-8 -left-2 w-8 h-12 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-6 left-8 w-8 h-10 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-10 right-12 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                  <div className="absolute -top-4 -right-2 w-8 h-8 bg-gray-600 rounded-t-lg"></div>
                  
                  {/* Castle door */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-amber-900 rounded-t-lg"></div>
                  
                  {/* Windows with light */}
                  <div className="absolute top-2 left-6 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse"></div>
                  <div className="absolute top-2 right-6 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse delay-500"></div>
                </div>
              </div>
              
              {/* Progress trackers */}
              <div className="absolute left-2 top-16 flex flex-col space-y-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                ))}
              </div>
              
              {/* Footprint trail */}
              <div className="absolute bottom-10 left-10 flex flex-col space-y-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-3 bg-gray-700 rounded-full opacity-50"></div>
                ))}
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-green-400 font-bold">Climbing the stairs!</div>
            </div>
          );
        case 'bridge-broken':
          return (
            <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
              {/* Background - canyon scene */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-800 to-purple-950 rounded-lg"></div>
              
              {/* Water/canyon bottom */}
              <div className="absolute w-full h-16 bg-blue-900 bottom-0"></div>
              <div className="absolute w-full h-1 bg-blue-300 bottom-16"></div>
              
              {/* Canyon walls */}
              <div className="absolute h-full w-1/3 bg-amber-800 left-0"></div>
              <div className="absolute h-full w-1/3 bg-amber-800 right-0"></div>
              
              {/* Broken bridge parts */}
              <div className="absolute w-1/3 h-4 bg-brown-700 left-0 top-1/2 border-t-2 border-brown-900"></div>
              <div className="absolute w-1/3 h-4 bg-brown-700 right-0 top-1/2 border-t-2 border-brown-900"></div>
              
              {/* Broken middle section */}
              <div className="absolute w-8 h-4 bg-brown-700 left-1/3 top-1/2 transform rotate-12 origin-left border-t-2 border-brown-900"></div>
              <div className="absolute w-8 h-4 bg-brown-700 right-1/3 top-1/2 transform -rotate-12 origin-right border-t-2 border-brown-900"></div>
              
              {/* Ropes hanging */}
              <div className="absolute h-10 w-0.5 bg-amber-600 left-calc-1/3 top-1/2"></div>
              <div className="absolute h-10 w-0.5 bg-amber-600 right-calc-1/3 top-1/2"></div>
              
              {/* Character looking worried */}
              <div className="absolute left-12 top-1/3 animate-[float_2s_ease-in-out_infinite]">
                <div className="w-10 h-14 bg-purple-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    
                    {/* Worried mouth */}
                    <div className="absolute top-5 w-4 h-1 border-t border-gray-800 rounded-t-full"></div>
                  </div>
                  
                  {/* Arms in thinking pose */}
                  <div className="absolute top-2 left-10 w-4 h-3 bg-purple-700 rounded-r-full transform rotate-45"></div>
                  <div className="absolute top-6 right-0 w-4 h-3 bg-purple-700 transform rotate-90 rounded-r-full"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-2 h-3 bg-purple-800"></div>
                  <div className="absolute bottom-0 right-2 w-2 h-3 bg-purple-800"></div>
                </div>
              </div>
              
              {/* Thought bubble */}
              <div className="absolute top-10 left-20 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs">How can I fix this bridge?</div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-gray-300">The bridge is broken</div>
            </div>
          );
        case 'bridge-fixed':
          return (
            <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
              {/* Background - bright sky */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-700 rounded-lg"></div>
              
              {/* Water/canyon bottom */}
              <div className="absolute w-full h-16 bg-blue-700 bottom-0"></div>
              <div className="absolute w-full h-2 bg-blue-300 bottom-16 animate-pulse"></div>
              
              {/* Canyon walls */}
              <div className="absolute h-full w-1/3 bg-amber-800 left-0"></div>
              <div className="absolute h-full w-1/3 bg-amber-800 right-0"></div>
              
              {/* Fixed bridge */}
              <div className="absolute w-full h-4 bg-brown-700 left-0 top-1/2 border-t-2 border-brown-900"></div>
              <div className="absolute w-full h-1 bg-green-500 left-0 top-1/2 animate-pulse opacity-50"></div>
              
              {/* Support beams */}
              <div className="absolute h-12 w-1 bg-brown-800 left-1/3 top-1/2 transform origin-top"></div>
              <div className="absolute h-12 w-1 bg-brown-800 right-1/3 top-1/2 transform origin-top"></div>
              
              {/* Character celebrating */}
              <div className="absolute right-14 top-1/3 animate-[celebrate_1s_ease-in-out_infinite]">
                <div className="w-10 h-14 bg-purple-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    
                    {/* Happy mouth */}
                    <div className="absolute top-5 w-4 h-1 border-b border-gray-800 rounded-b-full"></div>
                  </div>
                  
                  {/* Arms celebrating */}
                  <div className="absolute top-0 left-10 w-4 h-3 bg-purple-700 rounded-r-full animate-[wave_0.5s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute top-0 -left-4 w-4 h-3 bg-purple-700 rounded-l-full transform animate-[wave_0.5s_ease-in-out_infinite_alternate_delay-250]"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-2 h-3 bg-purple-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute bottom-0 right-2 w-2 h-3 bg-purple-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate_delay-150]"></div>
                </div>
              </div>
              
              {/* Magic sparkles */}
              <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-green-500 rounded-full animate-ping delay-600"></div>
              
              <div className="absolute bottom-0 w-full text-center text-green-300 font-bold">Bridge fixed!</div>
            </div>
          );
        case 'castle-door-locked':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Sky background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg"></div>
              
              {/* Castle */}
              <div className="absolute w-56 h-48 bg-gray-700 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-t-lg border-t-4 border-gray-600">
                {/* Castle towers */}
                <div className="absolute -top-10 -left-2 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-12 left-12 w-8 h-16 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-10 h-18 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-12 right-12 w-8 h-16 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-10 -right-2 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                
                {/* Castle windows */}
                <div className="absolute top-4 left-6 w-6 h-8 bg-blue-900 rounded-t-lg"></div>
                <div className="absolute top-4 right-6 w-6 h-8 bg-blue-900 rounded-t-lg"></div>
                <div className="absolute top-16 left-16 w-6 h-8 bg-blue-900 rounded-t-lg"></div>
                <div className="absolute top-16 right-16 w-6 h-8 bg-blue-900 rounded-t-lg"></div>
                
                {/* Castle door (locked) */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-20 bg-amber-900 rounded-t-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-600 rounded-full border-2 border-yellow-800"></div>
                </div>
              </div>
              
              {/* Character with key */}
              <div className="absolute bottom-10 left-10 animate-[float_2s_ease-in-out_infinite]">
                <div className="w-10 h-14 bg-blue-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    
                    {/* Thinking mouth */}
                    <div className="absolute top-5 w-4 h-1 bg-gray-800"></div>
                  </div>
                  
                  {/* Arms with key */}
                  <div className="absolute top-2 -right-4 w-4 h-3 bg-blue-700 rounded-r-full"></div>
                  <div className="absolute top-2 -left-4 w-4 h-3 bg-blue-700 rounded-l-full">
                    {/* Key */}
                    <div className="absolute top-0 left-0 w-4 h-2 bg-yellow-500"></div>
                    <div className="absolute top-0 left-1 w-1 h-4 bg-yellow-500"></div>
                  </div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-2 h-3 bg-blue-800"></div>
                  <div className="absolute bottom-0 right-2 w-2 h-3 bg-blue-800"></div>
                </div>
              </div>
              
              {/* Thought bubble */}
              <div className="absolute top-12 left-16 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs">I need to create a key...</div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-white">The castle gate is locked</div>
            </div>
          );
        case 'castle-door-open':
          return (
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Sunset background */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-300 to-pink-500 rounded-lg"></div>
              
              {/* Castle */}
              <div className="absolute w-56 h-48 bg-gray-700 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-t-lg border-t-4 border-gray-600">
                {/* Castle towers */}
                <div className="absolute -top-10 -left-2 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-12 left-12 w-8 h-16 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-10 h-18 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-12 right-12 w-8 h-16 bg-gray-600 rounded-t-lg"></div>
                <div className="absolute -top-10 -right-2 w-8 h-14 bg-gray-600 rounded-t-lg"></div>
                
                {/* Castle windows with light */}
                <div className="absolute top-4 left-6 w-6 h-8 bg-yellow-400 rounded-t-lg animate-pulse opacity-70"></div>
                <div className="absolute top-4 right-6 w-6 h-8 bg-yellow-400 rounded-t-lg animate-pulse opacity-70 delay-300"></div>
                <div className="absolute top-16 left-16 w-6 h-8 bg-yellow-400 rounded-t-lg animate-pulse opacity-70 delay-600"></div>
                <div className="absolute top-16 right-16 w-6 h-8 bg-yellow-400 rounded-t-lg animate-pulse opacity-70 delay-900"></div>
                
                {/* Castle door (open) */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-20">
                  {/* Dark entrance */}
                  <div className="w-full h-full bg-gray-900 rounded-t-lg"></div>
                  
                  {/* Door swung open */}
                  <div className="absolute -left-14 w-14 h-20 bg-amber-900 rounded-t-lg transform origin-left rotate-45">
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 bg-yellow-600 rounded-full border-2 border-yellow-800"></div>
                  </div>
                  
                  {/* Light from inside */}
                  <div className="absolute inset-0 bg-yellow-500 opacity-20 animate-pulse rounded-t-lg"></div>
                </div>
              </div>
              
              {/* Character with golden key */}
              <div className="absolute bottom-10 right-16 animate-[celebrate_1s_ease-in-out_infinite]">
                <div className="w-10 h-14 bg-blue-700 rounded-t-full relative">
                  {/* Head */}
                  <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-8 left-1 flex justify-center items-center">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    
                    {/* Happy mouth */}
                    <div className="absolute top-5 w-4 h-1 border-b border-gray-800 rounded-b-full"></div>
                  </div>
                  
                  {/* Arms celebrating */}
                  <div className="absolute top-0 -left-5 w-5 h-3 bg-blue-700 rounded-l-full animate-[wave_0.5s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute top-0 -right-5 w-5 h-3 bg-blue-700 rounded-r-full animate-[wave_0.5s_ease-in-out_infinite_alternate_delay-250]">
                    {/* Golden key */}
                    <div className="absolute top-0 right-0 w-6 h-3 bg-yellow-500 animate-pulse rounded-sm"></div>
                  </div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-2 h-3 bg-blue-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate]"></div>
                  <div className="absolute bottom-0 right-2 w-2 h-3 bg-blue-800 animate-[stomp_0.3s_ease-in-out_infinite_alternate_delay-150]"></div>
                </div>
              </div>
              
              {/* Magic sparkles */}
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-600"></div>
              
              {/* Victory banner */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-600 px-4 py-1 rounded-full text-white text-sm font-bold animate-bounce">
                Castle unlocked!
              </div>
              
              <div className="absolute bottom-0 w-full text-center text-yellow-300 font-bold">Adventure complete!</div>
            </div>
          );
        default:
          return <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">Animation placeholder</div>;
      }
    };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {animationContent()}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      
      {/* Level selector */}
      <div className="py-2 px-4 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-java-darker">Level {currentLevel + 1}: {levels[currentLevel].title}</h1>
          <div className="flex space-x-2">
            {[...Array(levels.length)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // Allow selecting completed levels or next available level
                  if (completedLevels.includes(idx) || 
                      idx === currentLevel || 
                      completedLevels.includes(idx - 1)) {
                    setCurrentLevel(idx);
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${idx === currentLevel 
                    ? 'bg-java-primary text-white' 
                    : completedLevels.includes(idx)
                      ? 'bg-green-100 text-green-800 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-400'
                  }
                  ${(completedLevels.includes(idx) || idx === currentLevel || completedLevels.includes(idx - 1))
                    ? 'hover:ring-2 hover:ring-offset-2 hover:ring-java-primary cursor-pointer'
                    : 'cursor-not-allowed opacity-50'
                  }
                `}
              >
                {completedLevels.includes(idx) ? '✓' : idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left panel - Story Animation */}
        <div className="w-1/2 bg-gray-900 p-4 flex flex-col relative overflow-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">{levels[currentLevel].title}</h2>
            <p className="text-gray-300 mt-2">{levels[currentLevel].storyText}</p>
            <div className="mt-4 p-3 bg-java-primary/30 rounded-lg text-white">
              <p><strong>Task:</strong> {levels[currentLevel].task}</p>
            </div>
          </div>
          
          {/* Animation area */}
          <div className="flex-grow flex items-center justify-center">
            <StoryAnimation />
          </div>
          
          {/* Success overlay */}
          {showLevelComplete && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 animate-fade-in">
              <div className="bg-java-darker p-6 rounded-lg text-white max-w-md text-center">
                <div className="text-5xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Level Complete!</h3>
                <p className="mb-4">You've successfully completed this challenge!</p>
                {currentLevel < levels.length - 1 ? (
                  <Button 
                    onClick={advanceToNextLevel}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 flex items-center justify-center mx-auto"
                  >
                    Next Level <ArrowRight className="ml-2" size={18} />
                  </Button>
                ) : (
                  <div className="bg-yellow-500 text-white px-6 py-2 rounded-lg">
                    You've completed all levels! Congratulations!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Right panel - Code Editor */}
        <div className="w-1/2 bg-gray-800 flex flex-col">
          {/* Code editor header */}
          <div className="bg-gray-900 p-2 flex justify-between items-center">
            <div className="text-white">Java Editor</div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-700"
              >
                <Info size={16} className="mr-1" /> Hint
              </Button>
              <Button 
                onClick={runCode}
                disabled={isRunning}
                className={`bg-java-primary hover:bg-java-primary/90 text-white ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Play size={16} className="mr-1" /> Run Code
              </Button>
            </div>
          </div>
          
          {/* Show hint if requested */}
          {showHint && (
            <div className="bg-java-warning/20 border-l-4 border-java-warning text-yellow-900 p-3 animate-fade-in">
              <p className="text-sm"><strong>Hint:</strong> {levels[currentLevel].hint}</p>
            </div>
          )}
          
          {/* Code editor */}
          <div className="flex-grow relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-800 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>
          
          {/* Output area */}
          <div className="bg-gray-900 p-2">
            <div className="flex justify-between items-center mb-1">
              <div className="text-white text-sm">Output</div>
              {isCorrect && (
                <div className="text-green-400 flex items-center text-sm">
                  <Check size={16} className="mr-1" /> Correct!
                </div>
              )}
              {output && !isCorrect && output.includes("error") && (
                <div className="text-red-400 flex items-center text-sm">
                  <X size={16} className="mr-1" /> Incorrect
                </div>
              )}
            </div>
            <div className="bg-black rounded p-2 font-mono text-sm max-h-32 overflow-auto">
              {isRunning ? (
                <div className="text-yellow-300">Running code...</div>
              ) : (
                <pre className={`whitespace-pre-wrap ${isCorrect ? 'text-green-400' : 'text-white'}`}>{output}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaLearningModule;

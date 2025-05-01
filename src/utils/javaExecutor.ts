// This is a mock Java executor since we can't actually run Java in the browser
// In a real application, you would integrate with a backend API like JDoodle

interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

// Simple Java code validator based on expected outputs for each level
export const executeJavaCode = async (code: string, level: number): Promise<ExecutionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // We'll do basic validation based on the expected output for each level
    const output = mockExecuteCode(code, level);
    
    // Check if the code produces the expected output
    const expectedOutput = getExpectedOutputForLevel(level);
    const success = output.includes(expectedOutput);
    
    return {
      success,
      output,
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

// Mock code execution by checking for specific patterns in the code
const mockExecuteCode = (code: string, level: number): string => {
  switch (level) {
    case 1: {
      // Level 1: Hello World
      if (code.includes('System.out.println') && code.includes('Hello, Java')) {
        return 'Hello, Java';
      }
      return 'No output or incorrect output';
    }
    case 2: {
      // Level 2: String reversal
      if (
        code.includes('StringBuilder') && 
        code.includes('reverse') && 
        code.includes('gold')
      ) {
        return 'dlog';
      }
      return 'No output or incorrect output';
    }
    case 3: {
      // Level 3: Conditional statements
      if (
        code.includes('if') && 
        code.includes('key.equals("open sesame")') &&
        code.includes('System.out.println("Correct key')
      ) {
        return 'Correct key! The chest unlocks.';
      }
      return 'Wrong key. The chest remains locked.';
    }
    case 4: {
      // Level 4: Loops
      if (
        (code.includes('for') || code.includes('while')) && 
        code.includes('i < 5') &&
        code.includes('System.out.println')
      ) {
        return 'Step 1\nStep 2\nStep 3\nStep 4\nStep 5\nReached the treasure!';
      }
      return 'Not enough steps to reach the treasure.';
    }
    case 5: {
      // Level 5: Methods
      if (
        code.includes('calculateSum') && 
        code.includes('int a') && 
        code.includes('int b') &&
        code.includes('return a + b') &&
        code.includes('System.out.println') &&
        code.includes('calculateSum(10, 15)')
      ) {
        return '25';
      }
      return 'Incorrect solution.';
    }
    default:
      return 'Level not implemented yet.';
  }
};

// Get expected output for each level
const getExpectedOutputForLevel = (level: number): string => {
  switch (level) {
    case 1:
      return 'Hello, Java';
    case 2:
      return 'dlog';
    case 3:
      return 'Correct key! The chest unlocks.';
    case 4:
      return 'Reached the treasure!';
    case 5:
      return '25';
    default:
      return '';
  }
};

// Get default code template for each level
export const getDefaultCodeForLevel = (level: number): string => {
  switch (level) {
    case 1:
      return `public class Solution {
    public static void main(String[] args) {
        // Write code to print "Hello, Java" to unlock the chest
        
    }
}`;
    case 2:
      return `public class Solution {
    public static void main(String[] args) {
        // Create a variable with the value "gold"
        // Reverse the string and print it
        // Hint: Look up StringBuilder class
        String secret = "gold";
        
    }
}`;
    case 3:
      return `public class Solution {
    public static void main(String[] args) {
        // Use an if statement to check if the key is "open sesame"
        // If it is, print "Correct key! The chest unlocks."
        // Otherwise, print "Wrong key. The chest remains locked."
        String key = "open sesame";
        
    }
}`;
    case 4:
      return `public class Solution {
    public static void main(String[] args) {
        // Use a loop to print "Step X" for 5 steps
        // After the loop, print "Reached the treasure!"
        
    }
}`;
    case 5:
      return `public class Solution {
    public static void main(String[] args) {
        // Create a method called calculateSum that takes two integers
        // and returns their sum
        // Call the method with values 10 and 15 and print the result
        
    }
    
    // Create the calculateSum method here
    
}`;
    default:
      return `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`;
  }
};

// Get story text for each level
export const getStoryTextForLevel = (level: number): string => {
  switch (level) {
    case 1:
      return 'Your adventure begins! Our hero has discovered an ancient treasure chest in a hidden cave. To unlock its secrets, you must first prove your Java skills.';
    case 2:
      return 'The chest has a curious lock with the word "gold" engraved on it, but the mechanism seems to require the word written backwards.';
    case 3:
      return 'A magical guardian appears! It will only let you open the chest if you know the secret password and can verify it with your code.';
    case 4:
      return 'The treasure is at the top of an ancient staircase. Your hero needs to climb each step carefully to reach it.';
    case 5:
      return 'The final challenge! The chest needs a specific numerical code calculated from two mystical numbers to reveal its ultimate treasure.';
    default:
      return 'New adventure awaits!';
  }
};

// Get challenge text for each level
export const getChallengeTextForLevel = (level: number): string => {
  switch (level) {
    case 1:
      return 'Create your first Java program that prints "Hello, Java" to begin your coding journey.';
    case 2:
      return 'The secret word is "gold". Write code to reverse this string and print the result.';
    case 3:
      return 'Use an if statement to check if the key variable equals "open sesame" and print the appropriate message.';
    case 4:
      return 'Write a loop that prints "Step X" for 5 steps, then print "Reached the treasure!" after the loop.';
    case 5:
      return 'Create a method called calculateSum that adds two numbers, then call it with 10 and 15 and print the result.';
    default:
      return 'Solve the coding challenge!';
  }
};

// Get hint text for each level
export const getHintTextForLevel = (level: number): string | null => {
  switch (level) {
    case 1:
      return 'Try using: System.out.println("Hello, Java");';
    case 2:
      return 'Look at the StringBuilder class. You can use: new StringBuilder(string).reverse().toString()';
    case 3:
      return 'Use the .equals() method to compare strings in Java, not the == operator.';
    case 4:
      return 'Try using a for loop: for (int i = 1; i <= 5; i++) { ... }';
    case 5:
      return 'Your method should look like: static int calculateSum(int a, int b) { return a + b; }';
    default:
      return null;
  }
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface CodeEditorProps {
  defaultCode: string;
  onRun: (code: string) => void;
  output: string;
  isRunning: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  defaultCode, 
  onRun, 
  output, 
  isRunning 
}) => {
  const [code, setCode] = useState<string>(defaultCode);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleRunCode = () => {
    onRun(code);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Java Code Editor</h2>
        <Button 
          onClick={handleRunCode} 
          disabled={isRunning}
          className="bg-java-primary hover:bg-java-primary/90"
        >
          <Play className="mr-2 h-4 w-4" /> Run Code
        </Button>
      </div>
      
      <Card className="flex-grow mb-4 overflow-hidden border-java-primary/20">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="code-editor w-full h-full p-4 bg-java-darker text-white resize-none outline-none"
          style={{ minHeight: '300px' }}
        />
      </Card>
      
      <div className="bg-gray-100 p-4 rounded-md h-32 overflow-auto">
        <h3 className="font-medium mb-2">Output:</h3>
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {isRunning ? "Running..." : output || "// Your code output will appear here"}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;

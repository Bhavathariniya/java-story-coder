
import React from 'react';
import { Book, Code, GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-java-darker text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Book className="h-7 w-7 text-java-primary absolute" style={{ transform: 'rotate(-10deg)' }} />
            <Code className="h-7 w-7 text-white opacity-70 absolute" style={{ transform: 'rotate(5deg) translateX(3px) translateY(1px)' }} />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              Java Story Coder
              <span className="ml-2 bg-java-primary text-xs px-1.5 py-0.5 rounded text-white font-normal">BETA</span>
            </h1>
            <div className="text-xs text-java-primary/80 -mt-1">Interactive coding adventures</div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-1 text-sm">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-java-primary/10 text-java-primary">
            <GraduationCap className="h-4 w-4 mr-1" />
            <span>Learning Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

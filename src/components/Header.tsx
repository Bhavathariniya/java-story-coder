
import React from 'react';
import { Book } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-java-darker text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Book className="h-6 w-6 mr-2 text-java-primary" />
          <h1 className="text-xl font-bold">Java Story Coder</h1>
        </div>
        <div className="text-sm text-java-primary">Learn Java through interactive stories</div>
      </div>
    </header>
  );
};

export default Header;

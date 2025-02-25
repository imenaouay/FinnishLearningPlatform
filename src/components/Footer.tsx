import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          © {currentYear} Created by{' '}
          <a 
            href="https://imdevart.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            IMDevArt
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer
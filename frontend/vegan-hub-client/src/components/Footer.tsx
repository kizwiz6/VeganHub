import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/kizwiz6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kizwiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:kizwiz@hotmail.co.uk"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright Text */}
          <div className="text-sm text-gray-500">
            © {currentYear} Kieran Emery. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
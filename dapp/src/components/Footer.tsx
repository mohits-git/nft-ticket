import React from 'react'
import { Twitter, Github, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 p-6 font-['Orbitron'] border-t-2 border-pink-500">
          <div className="container mx-auto flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} NFTicket. All rights reserved.
            </p>
          </div>
        </footer>
    );
}

export default Footer
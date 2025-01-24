import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} NFTicket. All rights reserved.</p>
          </div>
        </footer>
      );
}

export default Footer
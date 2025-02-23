import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Nav() {
  return (
    <nav className="relative flex items-center justify-between p-4">
      {/* Left: App Icon */}
      <div className="flex items-center">
        <img src="/icon.png" alt="App Icon" className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold">Angkat</span>
      </div>

      {/* Middle: Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button variant="link">
          Home
        </Button>
        <Button variant="link">
          About
        </Button>
        <Button variant="link">
          Services
        </Button>
        <Button variant="link">
          Contact
        </Button>
      </div>

      {/* Right: Profile Icon */}
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="/path/to/profile-image.jpg" alt="Profile" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
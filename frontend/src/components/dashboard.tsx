import React from 'react';
import { VideoFeed } from './VideoFeed';
import { AlertList } from './AlertList';
import { Stats } from './Stats';

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ElderCare Monitoring</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Video feed */}
        <div>
          <VideoFeed />
        </div>
        
        {/* Right column - Stats and Alerts */}
        <div className="space-y-8">
          <Stats />
          <AlertList />
        </div>
      </div>
    </div>
  );
}
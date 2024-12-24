import { VideoFeed } from '../components/VideoFeed';
import { AlertList } from '../components/AlertList';

export default function Monitor() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">Video Monitor</h1>
      <VideoFeed />
      <AlertList />
    </div>
  );
}
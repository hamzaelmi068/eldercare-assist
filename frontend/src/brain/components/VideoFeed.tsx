import React, { useCallback } from 'react';
import brain from 'brain';
import { toast } from 'sonner';

export function VideoFeed() {
  const processFrame = useCallback(async (frameData: string) => {
    try {
      const result = await brain.process_frame(frameData);
      if (result.detected_fall) {
        toast.error(`Fall detected! Confidence: ${result.confidence.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error processing frame:', error);
      toast.error('Failed to process video frame');
    }
  }, []);

  return (
    <div className="card mt-6">
      {/* Your video feed implementation */}
    </div>
  );
}
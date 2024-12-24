import React, { useEffect, useState } from 'react';
import { MOCK_VIDEO_FEED } from '../utils/constants';
import { useStore } from '../utils/store';
import brain from 'brain';
import { toast } from 'sonner';

export function VideoFeed() {
  const addAlert = useStore((state) => state.addAlert);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processFrame = async () => {
      if (isProcessing) return;
      
      setIsProcessing(true);
      try {
        // In production, this would process real video frames
        const response = await brain.process_frame({
          frame_data: MOCK_VIDEO_FEED,
          timestamp: new Date().toISOString(),
          charAt: function (pos: number): string {
            throw new Error('Function not implemented.');
          },
          charCodeAt: function (index: number): number {
            throw new Error('Function not implemented.');
          },
          concat: function (...strings: string[]): string {
            throw new Error('Function not implemented.');
          },
          indexOf: function (searchString: string, position?: number): number {
            throw new Error('Function not implemented.');
          },
          lastIndexOf: function (searchString: string, position?: number): number {
            throw new Error('Function not implemented.');
          },
          localeCompare: function (that: string): number {
            throw new Error('Function not implemented.');
          },
          match: function (regexp: string | RegExp): RegExpMatchArray | null {
            throw new Error('Function not implemented.');
          },
          replace: function (searchValue: string | RegExp, replaceValue: string): string {
            throw new Error('Function not implemented.');
          },
          search: function (regexp: string | RegExp): number {
            throw new Error('Function not implemented.');
          },
          slice: function (start?: number, end?: number): string {
            throw new Error('Function not implemented.');
          },
          split: function (separator: string | RegExp, limit?: number): string[] {
            throw new Error('Function not implemented.');
          },
          substring: function (start: number, end?: number): string {
            throw new Error('Function not implemented.');
          },
          toLowerCase: function (): string {
            throw new Error('Function not implemented.');
          },
          toLocaleLowerCase: function (locales?: string | string[]): string {
            throw new Error('Function not implemented.');
          },
          toUpperCase: function (): string {
            throw new Error('Function not implemented.');
          },
          toLocaleUpperCase: function (locales?: string | string[]): string {
            throw new Error('Function not implemented.');
          },
          trim: function (): string {
            throw new Error('Function not implemented.');
          },
          length: 0,
          substr: function (from: number, length?: number): string {
            throw new Error('Function not implemented.');
          },
          codePointAt: function (pos: number): number | undefined {
            throw new Error('Function not implemented.');
          },
          includes: function (searchString: string, position?: number): boolean {
            throw new Error('Function not implemented.');
          },
          endsWith: function (searchString: string, endPosition?: number): boolean {
            throw new Error('Function not implemented.');
          },
          normalize: function (form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
            throw new Error('Function not implemented.');
          },
          repeat: function (count: number): string {
            throw new Error('Function not implemented.');
          },
          startsWith: function (searchString: string, position?: number): boolean {
            throw new Error('Function not implemented.');
          },
          anchor: function (name: string): string {
            throw new Error('Function not implemented.');
          },
          big: function (): string {
            throw new Error('Function not implemented.');
          },
          blink: function (): string {
            throw new Error('Function not implemented.');
          },
          bold: function (): string {
            throw new Error('Function not implemented.');
          },
          fixed: function (): string {
            throw new Error('Function not implemented.');
          },
          fontcolor: function (color: string): string {
            throw new Error('Function not implemented.');
          },
          fontsize: function (size: number): string {
            throw new Error('Function not implemented.');
          },
          italics: function (): string {
            throw new Error('Function not implemented.');
          },
          link: function (url: string): string {
            throw new Error('Function not implemented.');
          },
          small: function (): string {
            throw new Error('Function not implemented.');
          },
          strike: function (): string {
            throw new Error('Function not implemented.');
          },
          sub: function (): string {
            throw new Error('Function not implemented.');
          },
          sup: function (): string {
            throw new Error('Function not implemented.');
          },
          padStart: function (maxLength: number, fillString?: string): string {
            throw new Error('Function not implemented.');
          },
          padEnd: function (maxLength: number, fillString?: string): string {
            throw new Error('Function not implemented.');
          },
          trimEnd: function (): string {
            throw new Error('Function not implemented.');
          },
          trimStart: function (): string {
            throw new Error('Function not implemented.');
          },
          trimLeft: function (): string {
            throw new Error('Function not implemented.');
          },
          trimRight: function (): string {
            throw new Error('Function not implemented.');
          },
          matchAll: function (regexp: RegExp): RegExpStringIterator<RegExpExecArray> {
            throw new Error('Function not implemented.');
          },
          [Symbol.iterator]: function (): StringIterator<string> {
            throw new Error('Function not implemented.');
          },
          at: function (index: number): string | undefined {
            throw new Error('Function not implemented.');
          }
        });
        
        const result = await response.json();
        
        if (result.detected_fall) {
          addAlert({
            id: Date.now().toString(),
            type: 'fall',
            timestamp: new Date().toISOString(),
            status: 'active',
            description: 'Possible fall detected - Confidence: ' + (result.confidence * 100).toFixed(1) + '%'
          });
          toast.error('Fall detected!');
        }
      } catch (error) {
        console.error('Error processing frame:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    const interval = setInterval(processFrame, 5000);
    return () => clearInterval(interval);
  }, [addAlert, isProcessing]);

  return (
    <div className="card">
      <h2 className="mb-4">Live Video Feed</h2>
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={MOCK_VIDEO_FEED}
          alt="Video feed"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
          LIVE
        </div>
        {isProcessing && (
          <div className="absolute bottom-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-lg text-sm">
            Processing...
          </div>
        )}
      </div>
    </div>
  );
}
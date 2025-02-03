'use client';

import EventEmitter from 'eventemitter3';
import { useEffect } from 'react';

export interface ResizeEvents {
  resize: [];
}

export const windowResizeEvents = new EventEmitter<ResizeEvents>();

export function WindowResizeEvents() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    function onResize() {
      windowResizeEvents.emit('resize');
    }
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return null;
}

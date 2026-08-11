'use client';

import { useEffect } from 'react';

export default function ChunkErrorHandler() {
  useEffect(() => {
    const RELOAD_KEY = 'chunk-reload';
    const RESET_DELAY = 3000;

    const resetTimer = setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        // Ignore storage access errors
      }
    }, RESET_DELAY);

    const handleChunkError = () => {
      let hasReloaded = false;

      try {
        hasReloaded = sessionStorage.getItem(RELOAD_KEY) === 'true';
      } catch {
        // If storage is unavailable, do not repeatedly reload.
        hasReloaded = true;
      }

      if (!hasReloaded) {
        console.warn(
          'Chunk loading error detected. Reloading application once...'
        );

        try {
          sessionStorage.setItem(RELOAD_KEY, 'true');
        } catch {
          // Ignore storage write errors
        }

        window.location.reload();
      } else {
        console.error(
          'Chunk loading error persists after reload. Automatic reload stopped.'
        );
      }
    };

    const isChunkError = (value) => {
      if (!value) return false;

      const name =
        typeof value === 'object' && value.name
          ? String(value.name)
          : '';

      const message =
        typeof value === 'object' && value.message
          ? String(value.message)
          : String(value);

      const combined = `${name} ${message}`.toLowerCase();

      return (
        combined.includes('chunkloaderror') ||
        combined.includes('loading chunk') ||
        combined.includes('loading css chunk') ||
        combined.includes('failed to load chunk')
      );
    };

    const handleUnhandledRejection = (event) => {
      if (isChunkError(event.reason)) {
        handleChunkError();
      }
    };

    const handleError = (event) => {
      if (isChunkError(event.error) || isChunkError(event.message)) {
        handleChunkError();
      }
    };

    window.addEventListener(
      'unhandledrejection',
      handleUnhandledRejection
    );

    window.addEventListener('error', handleError);

    return () => {
      clearTimeout(resetTimer);

      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );

      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}

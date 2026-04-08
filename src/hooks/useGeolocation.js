import { useState, useCallback } from 'react';

/**
 * Custom hook for browser Geolocation API.
 * Returns { position, loading, error, getCurrentPosition }
 *
 * @param {object} options - PositionOptions for the Geolocation API
 * @returns {{ position: { lat: number, lng: number } | null, loading: boolean, error: string | null, getCurrentPosition: () => void }}
 */
export default function useGeolocation(options = {}) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        const messages = {
          1: 'Location permission denied. Please allow location access.',
          2: 'Location unavailable. Please try again.',
          3: 'Location request timed out. Please try again.',
        };
        setError(messages[err.code] || 'An unknown error occurred.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
        ...options,
      },
    );
  }, [options]);

  return { position, loading, error, getCurrentPosition };
}

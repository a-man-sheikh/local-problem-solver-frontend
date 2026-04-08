import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css';

/* ─── Fix Leaflet's default marker icon path issue with bundlers ─── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ─── Custom marker icon matching the app's primary color scheme ─── */
const primaryMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* ────────────────────────────────────────────────────────────────────
 * Internal: ClickHandler — Captures map click to place marker
 * ─────────────────────────────────────────────────────────────────── */
function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

/* ────────────────────────────────────────────────────────────────────
 * Internal: RecenterMap — Smoothly flies to a new center
 * ─────────────────────────────────────────────────────────────────── */
function RecenterMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 16, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

/* ────────────────────────────────────────────────────────────────────
 * DraggableMarker — A marker that can be dragged to fine-tune position
 * ─────────────────────────────────────────────────────────────────── */
function DraggableMarker({ position, onDragEnd }) {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const latlng = marker.getLatLng();
          onDragEnd({ lat: latlng.lat, lng: latlng.lng });
        }
      },
    }),
    [onDragEnd],
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={primaryMarkerIcon}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════
 * LocationPicker — Main exported component
 *
 * Props:
 *   value       : { lat, lng } | null   — controlled position
 *   onChange     : (pos) => void         — callback on position change
 *   geoLoading  : boolean               — is geolocation in progress?
 *   geoError    : string | null         — geolocation error message
 *   onUseMyLocation : () => void        — trigger browser geolocation
 *   className   : string                — extra wrapper classes
 * ════════════════════════════════════════════════════════════════════ */
export default function LocationPicker({
  value,
  onChange,
  geoLoading = false,
  geoError = null,
  onUseMyLocation,
  className = '',
}) {
  const [mapReady, setMapReady] = useState(false);

  /* Default center: India center if no value set */
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  const center = value || defaultCenter;
  const zoom = value ? 16 : 5;

  const handleLocationSelect = useCallback(
    (pos) => {
      onChange?.(pos);
    },
    [onChange],
  );

  return (
    <div className={`location-picker ${className}`}>
      {/* ─── Map Container ─── */}
      <div className="location-picker__map-wrapper">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          scrollWheelZoom
          className="location-picker__map"
          whenReady={() => setMapReady(true)}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler onLocationSelect={handleLocationSelect} />

          {value && (
            <>
              <RecenterMap center={[value.lat, value.lng]} zoom={16} />
              <DraggableMarker position={[value.lat, value.lng]} onDragEnd={handleLocationSelect} />
            </>
          )}
        </MapContainer>

        {/* Crosshair hint when no marker */}
        {!value && mapReady && (
          <div className="location-picker__hint">
            <span className="material-symbols-outlined location-picker__hint-icon">touch_app</span>
            <span>Tap on the map to drop a pin</span>
          </div>
        )}

        {/* Loading overlay for geolocation */}
        {geoLoading && (
          <div className="location-picker__loading-overlay">
            <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
            <span>Detecting location…</span>
          </div>
        )}
      </div>

      {/* ─── Controls Bar ─── */}
      <div className="location-picker__controls">
        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={geoLoading}
          className="location-picker__my-location-btn"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            my_location
          </span>
          <span>{geoLoading ? 'Detecting…' : 'Use My Location'}</span>
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange?.(null)}
            className="location-picker__clear-btn"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* ─── Selected Coordinates Display ─── */}
      {value && (
        <div className="location-picker__coords">
          <span className="material-symbols-outlined text-sm text-primary">location_on</span>
          <span>
            {value.lat.toFixed(6)}°, {value.lng.toFixed(6)}°
          </span>
        </div>
      )}

      {/* ─── Error Message ─── */}
      {geoError && (
        <div className="location-picker__error">
          <span className="material-symbols-outlined text-sm">error</span>
          <span>{geoError}</span>
        </div>
      )}
    </div>
  );
}

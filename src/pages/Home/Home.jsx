import { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './Home.css';
import problemService from '@/services/problemService';

/* ─── Fix Leaflet default icon paths for bundlers ─── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ─── Status config for badges ─── */
const STATUS_CONFIG = {
  open: { label: 'Open', color: '#ef4444', bg: '#fef2f2' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: '#fffbeb' },
  resolved: { label: 'Resolved', color: '#22c55e', bg: '#f0fdf4' },
  closed: { label: 'Closed', color: '#64748b', bg: '#f8fafc' },
};

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: '#64748b' },
  medium: { label: 'Medium', color: '#f59e0b' },
  high: { label: 'High', color: '#ef4444' },
  critical: { label: 'Critical', color: '#dc2626' },
};

const PLACEHOLDER_IMAGE = '/report-placeholder.png';

/* ─── Custom marker icon based on status ─── */
function getMarkerIcon(status) {
  const color = STATUS_CONFIG[status]?.color || '#b02f00';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 26 16 26s16-14 16-26C32 7.2 24.8 0 16 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="6" fill="#fff"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'report-marker-icon',
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  });
}

/* ─── Captures the map instance into a ref for external use ─── */
function MapRefSetter({ mapRef }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

/* ─── Stores user location layers so they can be updated on re-locate ─── */
let userLocationLayers = [];

/* ─── Auto-locate user on load ─── */
function LocateUser() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 14, enableHighAccuracy: true });

    const onLocationFound = (e) => {
      /* Remove previous location layers before adding new ones */
      userLocationLayers.forEach((layer) => map.removeLayer(layer));
      userLocationLayers = [];

      const accuracyCircle = L.circle(e.latlng, {
        radius: e.accuracy / 2,
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        weight: 1,
      }).addTo(map);

      const dot = L.circleMarker(e.latlng, {
        radius: 8,
        color: '#fff',
        weight: 3,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        pane: 'markerPane',
      }).addTo(map).bindPopup(
        '<div style="font-family:Inter,sans-serif;font-weight:700;font-size:12px;text-align:center;padding:2px 0;">📍 You are here</div>'
      ).setZIndexOffset(1000);

      userLocationLayers = [accuracyCircle, dot];
    };

    map.on('locationfound', onLocationFound);
    return () => map.off('locationfound', onLocationFound);
  }, [map]);

  return null;
}

/* ─── Time-ago helper ─── */
function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count}${i.label} ago`;
  }
  return 'Just now';
}

/* ════════════════════════════════════════════════════════════════════
 * ReportPopup — Rich popup content for each report marker
 * ════════════════════════════════════════════════════════════════════ */
function ReportPopup({ report, onUpvote }) {
  const status = STATUS_CONFIG[report.status] || STATUS_CONFIG.open;
  const priority = PRIORITY_CONFIG[report.priority] || PRIORITY_CONFIG.low;
  const image = report.images?.length > 0 ? report.images[0] : PLACEHOLDER_IMAGE;
  const categoryName = report.category?.name || 'Uncategorized';
  const categoryIcon = report.category?.icon || 'category';
  const reporterName = report.reportedBy?.name || 'Anonymous';
  const address = report.location?.address || '';

  return (
    <div className="report-popup">
      {/* Image */}
      <div className="report-popup__image-wrapper">
        <img src={image} alt={report.title} className="report-popup__image" />
        <div className="report-popup__status-badge" style={{ color: status.color, background: status.bg }}>
          {status.label}
        </div>
      </div>

      {/* Body */}
      <div className="report-popup__body">
        {/* Category + Priority */}
        <div className="report-popup__meta-row">
          <span className="report-popup__category">
            <span className="material-symbols-outlined report-popup__category-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
              {categoryIcon}
            </span>
            {categoryName}
          </span>
          <span className="report-popup__priority" style={{ color: priority.color }}>
            ● {priority.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="report-popup__title">{report.title}</h3>

        {/* Description */}
        <p className="report-popup__description">{report.description}</p>

        {/* Address */}
        {address && (
          <div className="report-popup__address">
            <span className="material-symbols-outlined report-popup__address-icon">location_on</span>
            {address}
          </div>
        )}

        {/* Footer: Reporter + Time + Upvote */}
        <div className="report-popup__footer">
          <div className="report-popup__reporter">
            <div className="report-popup__avatar">
              {reporterName.charAt(0).toUpperCase()}
            </div>
            <div className="report-popup__reporter-info">
              <span className="report-popup__reporter-name">{reporterName}</span>
              <span className="report-popup__time">{timeAgo(report.createdAt)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote?.(report._id);
            }}
            className="report-popup__upvote-btn"
          >
            <span className="material-symbols-outlined report-popup__upvote-icon">thumb_up</span>
            <span>{report.upvoteCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * Home Dashboard — Full-screen map with report markers
 * ════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─── Fetch reports ─── */
  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await problemService.getReports();
      if (res.data?.success) {
        setReports(res.data.data.reports || []);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  /* ─── Upvote handler (placeholder for future API) ─── */
  const handleUpvote = useCallback((reportId) => {
    console.log('Upvote clicked for:', reportId);
    /* TODO: Call upvote API and refresh the report */
  }, []);

  /* Default center: India */
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  return (
    <main className="home-map-container">
      {/* Full-screen Leaflet Map */}
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom
        zoomControl={false}
        className="home-map"
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRefSetter mapRef={mapRef} />
        <LocateUser />

        {/* ─── Clustered Report Markers ─── */}
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          zoomToBoundsOnClick
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            let size = 'small';
            let dimension = 36;
            if (count >= 10) { size = 'medium'; dimension = 44; }
            if (count >= 25) { size = 'large'; dimension = 52; }
            return L.divIcon({
              html: `<div class="cluster-marker cluster-marker--${size}"><span>${count}</span></div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(dimension, dimension),
            });
          }}
        >
          {reports.map((report) => {
            if (!report.location?.coordinates) return null;
            const [lng, lat] = report.location.coordinates;
            return (
              <Marker
                key={report._id}
                position={[lat, lng]}
                icon={getMarkerIcon(report.status)}
              >
                <Popup
                  className="report-popup-wrapper"
                  maxWidth={320}
                  minWidth={280}
                  closeButton={false}
                >
                  <ReportPopup report={report} onUpvote={handleUpvote} />
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* ─── Loading indicator ─── */}
      {loading && (
        <div className="home-loading-badge">
          <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
          Loading reports…
        </div>
      )}

      {/* ─── Report count badge ─── */}
      {!loading && reports.length > 0 && (
        <div className="home-count-badge">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
          {reports.length} {reports.length === 1 ? 'report' : 'reports'}
        </div>
      )}

      {/* ─── My Location FAB ─── */}
      {mapReady && (
        <button
          onClick={() => {
            const map = mapRef.current;
            if (map) {
              map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
            }
          }}
          className="home-fab-locate"
          title="My location"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            my_location
          </span>
        </button>
      )}

      {/* ─── Report Issue FAB ─── */}
      <Link
        to="/report"
        className="home-fab-report"
        title="Report an issue"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add
        </span>
      </Link>
    </main>
  );
}

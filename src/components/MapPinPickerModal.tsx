'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Crosshair, Check, X, Navigation, Locate, ChevronDown, Building2, Star, ExternalLink, Map, Loader2 } from 'lucide-react';

interface MapPinPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressText: string) => void;
}

// Srikalahasti default center
const SRIKALAHASTI_CENTER = { lat: 13.7492, lng: 79.7028 };

const LANDMARKS = [
  { name: 'Panagal', lat: 13.7535, lng: 79.6985, icon: '🏘️' },
  { name: 'Car Street (Temple)', lat: 13.7498, lng: 79.7032, icon: '🛕' },
  { name: 'RTC Bus Stand', lat: 13.7462, lng: 79.7011, icon: '🚌' },
  { name: 'Railway Station', lat: 13.7410, lng: 79.6970, icon: '🚉' },
  { name: 'Bapuji Nagar', lat: 13.7510, lng: 79.7110, icon: '🏠' },
  { name: 'Swarnamukhi Bank', lat: 13.7485, lng: 79.7045, icon: '🏦' },
  { name: 'Tirupati Road', lat: 13.7550, lng: 79.7060, icon: '🛣️' },
  { name: 'MS Car Wash Center', lat: 13.7505, lng: 79.6992, icon: '🚗' },
];

export default function MapPinPickerModal({
  isOpen,
  onClose,
  onConfirm,
}: MapPinPickerModalProps) {
  const [currentLat, setCurrentLat] = useState(SRIKALAHASTI_CENTER.lat);
  const [currentLng, setCurrentLng] = useState(SRIKALAHASTI_CENTER.lng);
  const [addressPreview, setAddressPreview] = useState('Tap on map to pick location...');
  const [isLocating, setIsLocating] = useState(false);
  const [doorNo, setDoorNo] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [hasTapped, setHasTapped] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Reverse geocode
  const updateLocationDetails = useCallback(async (lat: number, lng: number) => {
    setCurrentLat(lat);
    setCurrentLng(lng);
    setIsLoadingAddress(true);
    setHasTapped(true);

    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await res.json();
      const parts: string[] = [];
      if (data.localityInfo?.administrative) {
        const admins = data.localityInfo.administrative as Array<{ name: string; order: number }>;
        const sorted = admins.filter((a) => a.order >= 6).sort((a, b) => b.order - a.order);
        sorted.forEach((a) => {
          if (a.name && !parts.includes(a.name)) parts.push(a.name);
        });
      }
      if (parts.length === 0) {
        if (data.locality || data.city) parts.push(data.locality || data.city);
        if (data.principalSubdivision) parts.push(data.principalSubdivision);
      }
      const displayAddr = parts.length > 0 ? parts.join(', ') : 'Srikalahasti Area';
      setAddressPreview(`${displayAddr} (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
    } catch {
      setAddressPreview(`Srikalahasti Area (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!isOpen) return;

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [currentLat, currentLng],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // Zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Attribution bottom-right (compact)
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

      // Use ESRI World Imagery (satellite) + labels for Google Maps-like look
      const satellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19, attribution: 'Tiles © Esri' }
      );

      const labels = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      );

      const streets = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, attribution: '© OpenStreetMap © CARTO' }
      );

      // Default to streets, with satellite toggle
      streets.addTo(map);

      L.control.layers(
        { '🗺️ Street Map': streets, '🛰️ Satellite': satellite },
        { '🏷️ Labels': labels },
        { position: 'topleft', collapsed: true }
      ).addTo(map);

      // Large animated custom pin
      const customIcon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative;display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);filter:drop-shadow(0 6px 12px rgba(5,150,105,0.5));">
            <div style="background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:3px 10px;border-radius:10px;font-size:10px;font-weight:900;white-space:nowrap;margin-bottom:3px;letter-spacing:0.3px;border:1.5px solid rgba(255,255,255,0.5);">
              📍 TAP or DRAG
            </div>
            <div style="width:40px;height:40px;background:linear-gradient(135deg,#059669,#0d9488);border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:3px solid #fff;">
              <div style="width:12px;height:12px;background:#fff;border-radius:50%;transform:rotate(45deg);"></div>
            </div>
            <div style="width:6px;height:6px;background:rgba(5,150,105,0.3);border-radius:50%;margin-top:-2px;"></div>
          </div>
        `,
        iconSize: [40, 56],
        iconAnchor: [20, 56],
      });

      const marker = L.marker([currentLat, currentLng], {
        draggable: true,
        icon: customIcon,
        autoPan: true,
      }).addTo(map);

      markerRef.current = marker;
      mapInstanceRef.current = map;

      // ── CLICK ON MAP → move pin & get location ──
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng], { animate: true, duration: 0.4 });
        setSelectedLandmark(null);
        updateLocationDetails(lat, lng);
      });

      // ── DRAG PIN → get location ──
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        map.panTo([pos.lat, pos.lng], { animate: true, duration: 0.4 });
        setSelectedLandmark(null);
        updateLocationDetails(pos.lat, pos.lng);
      });

      setMapReady(true);
      updateLocationDetails(currentLat, currentLng);
    };

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setTimeout(initMap, 50);
      document.head.appendChild(script);
    } else {
      setTimeout(initMap, 80);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setMapReady(false);
    };
  }, [isOpen]);

  // GPS detection
  const handleUseCurrentGPS = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude, accuracy: acc } = pos.coords;
        setAccuracy(acc ? Math.round(acc) : null);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 18, { duration: 1.2 });
          markerRef.current.setLatLng([latitude, longitude]);
        }
        setSelectedLandmark(null);
        updateLocationDetails(latitude, longitude);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Landmark jump
  const handleSelectLandmark = (landmark: typeof LANDMARKS[0]) => {
    setSelectedLandmark(landmark.name);
    setAccuracy(null);

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([landmark.lat, landmark.lng], 17, { duration: 1 });
      markerRef.current.setLatLng([landmark.lat, landmark.lng]);
    }
    updateLocationDetails(landmark.lat, landmark.lng);
  };

  // Open current pin in Google Maps (new tab)
  const handleOpenInGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${currentLat.toFixed(6)},${currentLng.toFixed(6)}`, '_blank');
  };

  // Confirm
  const handleConfirm = () => {
    const door = doorNo ? `Flat/Door No: ${doorNo}, ` : '';
    const mapsUrl = `https://maps.google.com/?q=${currentLat.toFixed(6)},${currentLng.toFixed(6)}`;
    const fullText = `📍 [Exact Map Pin]: ${door}${addressPreview}\n🗺️ Google Maps: ${mapsUrl}`;
    onConfirm(fullText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-lg flex items-end sm:items-center justify-center sm:p-5">
      <div
        className="bg-white dark:bg-[#0B1120] w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-step-in"
        style={{ animationDuration: '0.35s' }}
      >
        {/* ── Header ── */}
        <div className="px-5 py-4 flex items-center justify-between bg-white dark:bg-[#0D131D] border-b border-black/5 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Set Pickup Location</h3>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Tap on map or drag the green pin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-500 flex items-center justify-center transition-all active:scale-90"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* ── Instruction Banner ── */}
        {!hasTapped && mapReady && (
          <div className="px-4 py-2.5 bg-emerald-500/10 dark:bg-emerald-500/15 border-b border-emerald-500/20 flex items-center gap-2 animate-fade-in-up">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              👆 Tap anywhere on the map to set your pickup point
            </span>
          </div>
        )}

        {/* ── Interactive Map ── */}
        <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] bg-slate-200 dark:bg-slate-900">
          <div ref={mapContainerRef} className="w-full h-full min-h-[260px] sm:min-h-[320px] z-0" />

          {/* Loading overlay */}
          {!mapReady && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <span className="text-xs font-bold text-slate-500">Loading interactive map...</span>
              </div>
            </div>
          )}

          {/* GPS Accuracy badge */}
          {accuracy && (
            <div className="absolute top-3 left-14 z-[500] px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-black/5 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 shadow-lg animate-fade-in-up">
              <Crosshair className="w-3 h-3 text-emerald-500" />
              ±{accuracy}m accuracy
            </div>
          )}

          {/* Floating action buttons */}
          <div className="absolute bottom-3 right-3 z-[500] flex flex-col gap-2">
            {/* GPS button */}
            <button
              type="button"
              onClick={handleUseCurrentGPS}
              disabled={isLocating}
              className="p-3 rounded-2xl bg-white/95 dark:bg-[#151D2A]/95 backdrop-blur-sm text-slate-900 dark:text-white shadow-xl shadow-black/15 border border-black/5 dark:border-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <div className={`w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center`}>
                <Locate className={`w-4.5 h-4.5 text-emerald-500 ${isLocating ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left pr-1">
                <span className="text-[11px] font-black block leading-tight">{isLocating ? 'Detecting...' : '📡 My GPS'}</span>
                <span className="text-[9px] font-medium text-slate-400 block leading-tight">Auto-detect</span>
              </div>
            </button>

            {/* Open in Google Maps */}
            <button
              type="button"
              onClick={handleOpenInGoogleMaps}
              className="p-3 rounded-2xl bg-white/95 dark:bg-[#151D2A]/95 backdrop-blur-sm text-slate-900 dark:text-white shadow-xl shadow-black/15 border border-black/5 dark:border-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-left pr-1">
                <span className="text-[11px] font-black block leading-tight">🗺️ Google Maps</span>
                <span className="text-[9px] font-medium text-slate-400 block leading-tight">View pin on Maps</span>
              </div>
            </button>
          </div>
        </div>

        {/* ── Landmark Quick Jumps ── */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-[#0D131D] border-t border-black/5 dark:border-white/5 shrink-0">
          <button
            type="button"
            onClick={() => setShowLandmarks(!showLandmarks)}
            className="w-full flex items-center justify-between mb-2"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-500" />
              Popular Srikalahasti Landmarks
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${showLandmarks ? 'rotate-180' : ''}`} />
          </button>
          {showLandmarks && (
            <div className="grid grid-cols-2 gap-1.5 animate-fade-in-up" style={{ animationDuration: '0.25s' }}>
              {LANDMARKS.map((landmark) => {
                const isActive = selectedLandmark === landmark.name;
                return (
                  <button
                    key={landmark.name}
                    type="button"
                    onClick={() => handleSelectLandmark(landmark)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200 active:scale-95 ${
                      isActive
                        ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 shadow-sm'
                        : 'bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-emerald-500/20'
                    }`}
                  >
                    <span className="text-base shrink-0">{landmark.icon}</span>
                    <span className={`text-[11px] font-bold truncate ${isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                      {landmark.name}
                    </span>
                    {isActive && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-4 pb-5 pt-3 bg-white dark:bg-[#0B1120] border-t border-black/5 dark:border-white/5 space-y-3 shrink-0">
          {/* Address preview */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
              {isLoadingAddress ? (
                <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {hasTapped ? '📍 Selected Location' : '📍 Default Location'}
              </span>
              <span className={`text-xs font-bold block ${isLoadingAddress ? 'text-slate-400 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
                {isLoadingAddress ? 'Resolving address...' : addressPreview}
              </span>
              {hasTapped && !isLoadingAddress && (
                <a
                  href={`https://www.google.com/maps?q=${currentLat.toFixed(6)},${currentLng.toFixed(6)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Door number */}
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Door / Flat No., Street Name (Optional)"
              value={doorNo}
              onChange={(e) => setDoorNo(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="w-1/3 py-3.5 rounded-2xl border border-black/8 dark:border-white/8 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="w-2/3 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:scale-[1.01]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

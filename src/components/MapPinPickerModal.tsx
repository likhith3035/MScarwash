'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Crosshair, Check, X, Navigation } from 'lucide-react';

interface MapPinPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressText: string) => void;
}

// Srikalahasti default center: 13.7492, 79.7028
const SRIKALAHASTI_CENTER = { lat: 13.7492, lng: 79.7028 };

export default function MapPinPickerModal({
  isOpen,
  onClose,
  onConfirm,
}: MapPinPickerModalProps) {
  const [currentLat, setCurrentLat] = useState(SRIKALAHASTI_CENTER.lat);
  const [currentLng, setCurrentLng] = useState(SRIKALAHASTI_CENTER.lng);
  const [addressPreview, setAddressPreview] = useState('Fetching Srikalahasti address...');
  const [isLocating, setIsLocating] = useState(false);
  const [doorNo, setDoorNo] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Load Leaflet dynamically & initialize map
  useEffect(() => {
    if (!isOpen) return;

    // Load Leaflet CSS if missing
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initLeaflet = () => {
      const L = (window as any).L;
      if (!L || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [currentLat, currentLng],
        zoom: 16,
        zoomControl: false,
      });

      // Lightweight OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(map);

      // Custom Rapido-style Emerald Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="background: #059669; color: white; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 900; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.4); white-space: nowrap; margin-bottom: 2px;">
              📍 Drag Pin
            </div>
            <div style="width: 32px; height: 32px; background: #059669; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(5,150,105,0.6); border: 2px solid #ffffff;">
              <div style="width: 10px; height: 10px; background: #ffffff; border-radius: 50%;"></div>
            </div>
          </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
      });

      // Draggable Marker
      const marker = L.marker([currentLat, currentLng], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);

      markerRef.current = marker;
      mapInstanceRef.current = map;

      // Event: Marker Drag End
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        updateLocationDetails(pos.lat, pos.lng);
      });

      // Event: Map Click
      map.on('click', (e: any) => {
        marker.setLatLng(e.latlng);
        updateLocationDetails(e.latlng.lat, e.latlng.lng);
      });

      updateLocationDetails(currentLat, currentLng);
    };

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initLeaflet;
      document.head.appendChild(script);
    } else {
      setTimeout(initLeaflet, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  const updateLocationDetails = async (lat: number, lng: number) => {
    setCurrentLat(lat);
    setCurrentLng(lng);

    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await res.json();
      const locality = data.locality || data.city || 'Srikalahasti';
      const state = data.principalSubdivision || 'Andhra Pradesh';
      setAddressPreview(`${locality}, ${state} (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
    } catch {
      setAddressPreview(`Srikalahasti Area (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
    }
  };

  const handleUseCurrentGPS = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;

        if (mapInstanceRef.current && markerRef.current) {
          const L = (window as any).L;
          mapInstanceRef.current.flyTo([latitude, longitude], 17);
          markerRef.current.setLatLng([latitude, longitude]);
        }
        updateLocationDetails(latitude, longitude);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectPredefinedArea = (lat: number, lng: number, name: string) => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 17);
      markerRef.current.setLatLng([lat, lng]);
    }
    updateLocationDetails(lat, lng);
  };

  const handleConfirm = () => {
    const door = doorNo ? `Flat/Door No: ${doorNo}, ` : '';
    const mapsUrl = `https://maps.google.com/?q=${currentLat.toFixed(6)},${currentLng.toFixed(6)}`;
    const fullText = `📍 [Exact Map Pin]: ${door}${addressPreview}\n🗺️ Google Maps Navigation: ${mapsUrl}`;
    onConfirm(fullText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white dark:bg-[#0D131D] w-full max-w-xl rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-[#151D2A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Adjust Pickup Location Pin</h3>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Drag green pin on map or tap GPS button</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Leaflet Fast Canvas Map View */}
        <div className="relative flex-1 min-h-[300px] bg-slate-900">
          <div ref={mapContainerRef} className="w-full h-full min-h-[300px] z-0" />

          {/* Floating GPS Button */}
          <button
            type="button"
            onClick={handleUseCurrentGPS}
            disabled={isLocating}
            className="absolute bottom-4 right-4 z-[400] p-3.5 rounded-2xl bg-white dark:bg-[#151D2A] text-slate-900 dark:text-white shadow-2xl border border-black/10 dark:border-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs font-black"
          >
            <Crosshair className={`w-4 h-4 text-emerald-500 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : '🎯 My Live GPS Pin'}</span>
          </button>
        </div>

        {/* 1-Tap Landmark Quick Jump Bar */}
        <div className="p-3 bg-slate-100 dark:bg-[#121924] border-t border-black/5 dark:border-white/5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
            ⚡ Quick Jump to Srikalahasti Landmarks:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { name: 'Panagal', lat: 13.7535, lng: 79.6985 },
              { name: 'Car Street Temple', lat: 13.7498, lng: 79.7032 },
              { name: 'RTC Bus Stand', lat: 13.7462, lng: 79.7011 },
              { name: 'Railway Station', lat: 13.7410, lng: 79.6970 },
              { name: 'Bapuji Nagar', lat: 13.7510, lng: 79.7110 },
              { name: 'Swarnamukhi Bank', lat: 13.7485, lng: 79.7045 },
            ].map((landmark) => (
              <button
                key={landmark.name}
                type="button"
                onClick={() => handleSelectPredefinedArea(landmark.lat, landmark.lng, landmark.name)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2332] text-slate-800 dark:text-slate-200 text-[11px] font-bold border border-black/10 dark:border-white/10 hover:border-emerald-500 shrink-0 transition-all active:scale-95"
              >
                📍 {landmark.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Confirm & Door No Bar */}
        <div className="p-4 bg-slate-50 dark:bg-[#151D2A] border-t border-black/10 dark:border-white/10 space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            <input
              type="text"
              placeholder="Door/Flat No. (Optional)"
              value={doorNo}
              onChange={(e) => setDoorNo(e.target.value)}
              className="sm:col-span-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white"
            />
            <div className="sm:col-span-2 p-2.5 rounded-xl bg-white dark:bg-[#0D131D] border border-black/5 dark:border-white/5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{addressPreview}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-1/3 py-3.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="w-2/3 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Pickup Location Pin</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

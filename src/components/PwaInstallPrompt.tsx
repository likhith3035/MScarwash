'use client';

import { useEffect, useState } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('PWA Service Worker registration failed:', err);
        });
      });
    }

    // Check standalone state
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user dismissed recently
      const dismissedTime = localStorage.getItem('ms_pwa_prompt_dismissed');
      if (!dismissedTime || Date.now() - parseInt(dismissedTime, 10) > 86400000 * 3) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setShowPrompt(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('ms_pwa_prompt_dismissed', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-emerald-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Fast App Access
              </div>
              <h4 className="font-bold text-sm text-white">Install MS Car Wash App</h4>
              <p className="text-xs text-slate-300">Book washes 10x faster & track status offline.</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Download className="w-4 h-4" /> Install App
          </button>
          <button
            onClick={handleDismiss}
            className="py-2 px-3 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs rounded-xl border border-slate-700/60 transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}

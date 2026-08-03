import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MS Car Wash Srikalahasti — Best Water & Car Wash';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #05080D 0%, #0E1420 50%, #06141B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(16, 185, 129, 0.25)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(6, 182, 212, 0.2)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />

        {/* Top Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            padding: '10px 24px',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '24px',
          }}
        >
          <span>⭐ 4.9 RATED • SRIKALAHASTI</span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '-2px',
            textAlign: 'center',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          MS CAR WASH
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#10B981',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          #1 Water Wash & Car Detailing Center in Srikalahasti (SKHT)
        </div>

        {/* Feature Badges Grid */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            🧼 100% Scratch-Free Foam
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            🏠 Doorstep Pickup Service
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            🎁 Free Water + Tissue Box
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

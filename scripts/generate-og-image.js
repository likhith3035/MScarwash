const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Read and resize the master emblem logo
  const logoBuffer = await sharp('public/ms-auto-care-logo.png')
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgText = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#05080E" />
        <stop offset="50%" stop-color="#0A1220" />
        <stop offset="100%" stop-color="#030508" />
      </linearGradient>
      <radialGradient id="glow" cx="20%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#059669" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#059669" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="blueGlow" cx="80%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#2563EB" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect width="100%" height="100%" fill="url(#glow)" />
    <rect width="100%" height="100%" fill="url(#blueGlow)" />

    <!-- Subtle Grid Overlay -->
    <g opacity="0.04" stroke="#FFFFFF" stroke-width="1">
      <line x1="0" y1="105" x2="1200" y2="105" />
      <line x1="0" y1="210" x2="1200" y2="210" />
      <line x1="0" y1="315" x2="1200" y2="315" />
      <line x1="0" y1="420" x2="1200" y2="420" />
      <line x1="0" y1="525" x2="1200" y2="525" />
      <line x1="200" y1="0" x2="200" y2="630" />
      <line x1="400" y1="0" x2="400" y2="630" />
      <line x1="600" y1="0" x2="600" y2="630" />
      <line x1="800" y1="0" x2="800" y2="630" />
      <line x1="1000" y1="0" x2="1000" y2="630" />
    </g>

    <!-- Decorative Border Outline -->
    <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

    <!-- Top Badge Pill -->
    <g transform="translate(480, 75)">
      <rect width="400" height="38" rx="19" fill="rgba(5, 150, 105, 0.15)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" />
      <circle cx="20" cy="19" r="5" fill="#10B981" />
      <text x="35" y="24" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">⭐ 4.9 RATED • SRIKALAHASTI (SKHT)</text>
    </g>

    <!-- Main Title -->
    <text x="480" y="180" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">MS AUTO CARE</text>
    
    <!-- Subtitle / Tagline -->
    <text x="480" y="225" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5">CAR MECHANIC, REPAIRS &amp; WATER WASH</text>

    <!-- Address Line -->
    <text x="480" y="265" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500">
      Panagal, Opp Old RTO Office, Beside Bharat Petroleum (Near Highway)
    </text>

    <!-- Service Bullet Chips -->
    <g transform="translate(480, 310)">
      <!-- Chip 1 -->
      <rect x="0" y="0" width="300" height="42" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <text x="14" y="26" fill="#F1F5F9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">✓ 100% Scratch-Free Foam Wash</text>

      <!-- Chip 2 -->
      <rect x="315" y="0" width="310" height="42" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <text x="329" y="26" fill="#F1F5F9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">✓ Complete Car Mechanic Repairs</text>

      <!-- Chip 3 -->
      <rect x="0" y="52" width="300" height="42" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <text x="14" y="78" fill="#F1F5F9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">✓ Underbody Pressure Blast</text>

      <!-- Chip 4 -->
      <rect x="315" y="52" width="310" height="42" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <text x="329" y="78" fill="#F1F5F9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">✓ Doorstep Pickup &amp; Drop</text>
    </g>

    <!-- Bottom Contact Bar -->
    <g transform="translate(480, 460)">
      <rect width="625" height="62" rx="16" fill="#059669" />
      <text x="24" y="38" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" letter-spacing="0.5">📞 Call: 8309390902</text>
      <text x="360" y="38" fill="#D1FAE5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">mscarwash.vercel.app</text>
    </g>
  </svg>
  `;

  const svgBuffer = Buffer.from(svgText);

  // Composite SVG with the logo
  await sharp(svgBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 135,
        left: 75,
      }
    ])
    .png()
    .toFile('public/og-image.png');

  // Copy to Next.js dynamic OG files and fallback logo.png
  fs.copyFileSync('public/og-image.png', 'src/app/opengraph-image.png');
  fs.copyFileSync('public/og-image.png', 'src/app/twitter-image.png');
  fs.copyFileSync('public/og-image.png', 'public/logo.png');

  console.log('✅ OpenGraph 1200x630 card generated successfully!');
}

createOgImage().catch(console.error);

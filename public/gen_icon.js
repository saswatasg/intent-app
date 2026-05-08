// Generate a simple SVG-based 192px PNG icon using canvas (via node-canvas if avail) or just create an SVG placeholder
const fs = require('fs')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="40" fill="#1B2A4A"/>
  <rect width="192" height="192" rx="40" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#243356"/>
      <stop offset="100%" stop-color="#0D1728"/>
    </linearGradient>
  </defs>
  <text x="96" y="115" text-anchor="middle" font-size="80" font-family="system-ui" fill="#7BA38C">◈</text>
</svg>`
fs.writeFileSync('icon.svg', svg)
console.log('SVG icon written')

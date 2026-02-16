const fs = require('node:fs')
const path = require('node:path')

let config
try {
  config = require('../tailwind.config.cjs')
} catch (_e) {
  console.error('Failed to load tailwind.config.cjs:', _e)
  process.exit(1)
}

function getBrandColor(config) {
  try {
    const colors = config.theme?.extend?.colors
    const brand = colors?.brand

    if (!brand) return '#22c55e'

    if (typeof brand === 'string') return brand

    if (typeof brand === 'object') {
      return brand[500] || brand.DEFAULT || brand.main || Object.values(brand)[0] || '#22c55e'
    }
  } catch (_e) {
    return '#22c55e'
  }
  return '#22c55e'
}

const brandColor = getBrandColor(config)
const darkBg = '#020617'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- Background: Rounded Square in Dark Code Editor Theme -->
  <rect width="512" height="512" rx="120" fill="${darkBg}"/>
  
  <!-- Code Symbols: < /> -->
  <g transform="translate(0, 0)" style="filter: drop-shadow(0 0 8px ${brandColor}40);">
    <!-- Less Than < -->
    <path d="M150 160 L70 256 L150 352" 
          stroke="${brandColor}" 
          stroke-width="56" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          fill="none"/>
          
    <!-- Greater Than > -->
    <path d="M362 160 L442 256 L362 352" 
          stroke="${brandColor}" 
          stroke-width="56" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          fill="none"/>
          
    <!-- Slash / -->
    <!-- Adjusted to look balanced -->
    <path d="M200 400 L312 112" 
          stroke="${brandColor}" 
          stroke-width="56" 
          stroke-linecap="round" 
          fill="none"/>
  </g>
</svg>`

const outputPath = path.resolve(__dirname, '../public/favicon.svg')

try {
  fs.writeFileSync(outputPath, svgContent.trim())
  console.log(`✅ Favicon generated at public/favicon.svg with brand color: ${brandColor}`)
} catch (e) {
  console.error('❌ Failed to write favicon:', e)
  process.exit(1)
}

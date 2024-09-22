<template>
  <CanvasRecordingBase :size="size" :points="points" :record="record" />
</template>

<script setup>
//==================================
// Import
//==================================
import {
  ref,
  reactive,
} from 'vue';
import {
  randInt,
  SCREEN_SIZE,
} from '../utils/globals.mjs';

import CanvasRecordingBase from '../components/CanvasRecordingBase.vue';


//==================================
// Const
//==================================
const TOT_POINTS = 100;
const WIDTH      = SCREEN_SIZE.yt_reel_width * 0.5;
const HEIGHT     = SCREEN_SIZE.yt_reel_height * 0.5;
const PT_WIDTH   = 10;
const PT_HEIGHT  = 10;

const size = reactive({
 width: WIDTH,
 height: HEIGHT
});

const points = reactive({
  width: PT_WIDTH,
  height: PT_HEIGHT,
  tot_points: TOT_POINTS,
  initPoints: initPoints,
});

const record = ref( false );


//==================================
// Functions
//==================================
function generateColorPalette() {
  const baseColor = getRandomColor();
  const color1 = adjustColor(baseColor, 30); // Modifica di 30 gradi
  const color2 = adjustColor(baseColor, -30); // Modifica di -30 gradi
  
  return [baseColor, color1, color2].map(color => colorToRgbFormat(color));
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function adjustColor(color, degree) {
  const rgb = color.match(/\d+/g).map(Number);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

  hsl[0] = (hsl[0] + degree) % 360;

  const newRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
}

function colorToRgbFormat(color) {
  const rgb = color.match(/\d+/g);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1/3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function initPoints() {
  const ret = [];
  const tot = 4;
  for (let t = 1; t <= tot; t++) {
    for (let i = 0; i < TOT_POINTS/tot; i++) {
      const radius = 2;
      ret.push({
        x: WIDTH * 0.5,
        y: t * HEIGHT/tot - (HEIGHT/tot*0.5),
        radius: radius,
        angle: randInt(0, 360),
        velocity: 0.3,
        gravity: 1,
        moveX: undefined,
        moveY: undefined,
        color: `rgb(22,${randInt(0, 255)},${randInt(0, 255)})`,
      });
    }
  }

  return ret;
}


</script>

//==================================
// Const
//==================================
export const SCREEN_SIZE = Object.freeze({
  yt_width: 1920,
  yt_height: 1080,
  yt_reel_width: 1080,
  yt_reel_height: 1920,
  instagram_reel_width: 1080,
  instagram_reel_height: 1920,
});


//==================================
// Functions
//==================================
export function getRgb( rgb ) {
  const match = rgb.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? { red: parseInt(match[1]), green: parseInt(match[2]), blue: parseInt(match[3]) } : {};
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomRGB() {
  const rgb = {
    red: randInt(0, 255),
    green: randInt(100, 255),
    blue: randInt(0, 255),
  }
  return `rgb(${ rgb.red },${ rgb.green },${ rgb.blue })`;
}

export function downloadFile(src, filename = 'untitled', format, width, height) {
  const a = document.createElement('a');
  a.href = src;
  a.download = `${filename}.${format}`;
  if (width && height) {
    a.style.width = `${width}px`;
    a.style.height = `${height}px`;
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
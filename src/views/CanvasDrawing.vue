<template>
  <div v-if="is_recording" class="toast-msg"><p>Recording 🔴</p></div>
</template>

<script setup>
//==================================
// Import
//==================================
import { ref, onMounted, onUnmounted } from "vue";
import { SCREEN_SIZE } from "../utils/globals.mjs";
import { Canvas } from "../utils/canvasUtils.mjs";
import { VideoRecorder } from "../utils/videoUtils.mjs";

//==================================
// Const
//==================================
const WIDTH         = SCREEN_SIZE.instagram_reel_width / 2.5;
const HEIGHT        = SCREEN_SIZE.instagram_reel_height / 2.5;
const TOT_POINTS    = 100;
const CAN_RECORD    = false;

let canvas          = undefined;
let canvas_dom_ref  = undefined;
let video           = undefined;
let animation_frame = undefined;

const is_recording = ref(false);

//==================================
// Functions
//==================================
function initLoop() {
  updateVideoFrame();
  canvas.update();
  animation_frame = window.requestAnimationFrame(initLoop);
}

function updateVideoFrame() {
  if (video) {
    video.getFrame();
  }
}

function initRecording() {
  video = new VideoRecorder(canvas_dom_ref);
  video.initRecord();
  is_recording.value = true;
}

function stopRecording() {
  is_recording.value = false;
  video.stopRecording();
}


//==================================
// Life cycle
//==================================
onMounted(() => {
  canvas = new Canvas(WIDTH, HEIGHT, TOT_POINTS);
  canvas_dom_ref = canvas.initCanvas();
  canvas.initPoints();
  initLoop();
  CAN_RECORD && initRecording();
});

onUnmounted(() => {
  CAN_RECORD && stopRecording();
  window.cancelAnimationFrame(animation_frame);
  canvas.unmount();
});


</script>

<style lang="scss" scoped>
</style>

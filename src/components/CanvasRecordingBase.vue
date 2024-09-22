<template>
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
// Props
//==================================
const props = defineProps({
  size: Object,
  points: Object,
  record: Boolean,
})


//==================================
// Const
//==================================
const WIDTH         = props.size?.width;
const HEIGHT        = props.size?.height;

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
  canvas = new Canvas(WIDTH, HEIGHT, props.points);
  canvas_dom_ref = canvas.initCanvas();
  canvas.initPoints();
  initLoop();
  if ( props.record ) {
    initRecording();
  }
});

onUnmounted(() => {
  if ( props.record ) {
    stopRecording();
  }
  window.cancelAnimationFrame(animation_frame);
  canvas.unmount();
});


</script>

<style lang="scss" scoped>
</style>

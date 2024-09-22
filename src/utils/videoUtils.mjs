//==================================
// Import
//==================================
import { downloadFile } from './globals.mjs';

//==================================
// Classes
//==================================
export class VideoRecorder {
  #VIDEO_OPTIONS;
  constructor(canvasRef) {
    this.canvasRef = canvasRef;
    this.videoStream = undefined;
    this.mediaRecorder = undefined;
    this.frames = [];
    this.fps = 60;
    this.w_resolution = Math.round(this.canvasRef.width * 1.5);
    this.h_resolution = Math.round(this.canvasRef.height * 1.5);
    this.aspect_ratio = this.w_resolution / this.h_resolution;

    this.#VIDEO_OPTIONS = {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 10000000,
      constraints: {
        width: this.w_resolution,
        height: this.h_resolution,
        advanced: [
          { width: this.w_resolution, height: this.h_resolution },
          { aspectRatio: this.aspect_ratio }
        ]
      }
    };
  }

  initRecord() {
    this.videoStream = this.canvasRef.captureStream(this.fps);
    this.mediaRecorder = new MediaRecorder(this.videoStream, this.#VIDEO_OPTIONS);
    this.mediaRecorder.ondataavailable = (e) => this.frames.push(e.data);
    this.mediaRecorder.onstop = () => this.handleStop();
    this.videoStream.getVideoTracks()[0].applyConstraints(this.#VIDEO_OPTIONS.constraints);
    this.startRecording();
  }

  startRecording() {
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }

  getFrame() {
    this.videoStream.getVideoTracks()[0].applyConstraints(this.#VIDEO_OPTIONS.constraints);
    this.videoStream.getVideoTracks()[0].requestFrame();
  }

  handleStop() {
    const blob = new Blob(this.frames, { type: 'video/mp4' });
    const href = URL.createObjectURL(blob);
    downloadFile(href, 'test', 'mp4');
    URL.revokeObjectURL(href);
    this.frames = [];
  }
}

/* === NOTE ===
  The aspect ratio of the exported video seems not to be correct: actually this is because the Windows Media Player add a left and right padding.
  The uploaded video on YouTube respect the given aspect ratio (!)
 */
/**
 * BYOC build-time stub for `sharp`.
 *
 * Why: the OVH Kimsufi node's CPU predates x64-v2 (AVX2) and wasm SIMD, so
 * neither the prebuilt napi binding nor the wasm32 build can load. Next only
 * needs sharp during `next build` to generate blur placeholders for
 * locally-imported images (next-image-loader → getBlurImage → optimizeImage).
 * The production frontend is a static export (`output: 'export'`) with
 * `images.unoptimized`, and no app code imports sharp — so a stub that
 * satisfies the optimizeImage chain (returning a tiny valid image) is
 * functionally identical for the shipped artifact.
 *
 * The blur data URL is never rendered in this app (no `placeholder="blur"`),
 * so the 1x1 placeholder is invisible in practice.
 */
'use strict';

// Minimal valid 1x1 images per content type (returned by toBuffer()).
const IMAGES = {
  png: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  ),
  jpeg: Buffer.from(
    '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==',
    'base64',
  ),
  webp: Buffer.from(
    'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    'base64',
  ),
  avif: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  ),
};

function sharp(input, options) {
  let type = 'png';

  const chain = {
    timeout() {
      return chain;
    },
    rotate() {
      return chain;
    },
    resize() {
      return chain;
    },
    avif() {
      type = 'avif';
      return chain;
    },
    webp() {
      type = 'webp';
      return chain;
    },
    png() {
      type = 'png';
      return chain;
    },
    jpeg() {
      type = 'jpeg';
      return chain;
    },
    toBuffer() {
      return Promise.resolve(IMAGES[type] || IMAGES.png);
    },
  };

  return chain;
}

// next's getSharp() also calls these statics; all no-ops for a stub.
sharp.block = () => {};
sharp.unblock = () => {};
sharp.cache = () => {};
sharp.concurrency = () => {};

module.exports = sharp;
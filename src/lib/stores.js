import { writable } from "svelte/store";

export let isCanvasPressed = writable(false);
export let isDrawingPlaying = writable(false);
export let drawing = writable([]);
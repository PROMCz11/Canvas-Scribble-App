import { writable } from "svelte/store";

export let isCanvasPressed = writable(false);
export let isDrawingPlaying = writable(false);
export let drawing = writable([]);
export let history = writable([]);
export let strokeColor = writable("white");
export let availableColors = writable([
    { name: "white", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Purple", hex: "#800080" }
])
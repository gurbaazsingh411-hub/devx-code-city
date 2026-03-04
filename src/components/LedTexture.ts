import * as THREE from "three";

const LED_H = 48;
const LED_DOT = 4;
const LED_FONT = 32;
const LED_VISIBLE = 256;

export function createLedTexture(text: string, color: string, bgColor: string) {
    const tmp = document.createElement("canvas");
    const tmpCtx = tmp.getContext("2d")!;
    tmpCtx.font = `bold ${LED_FONT}px monospace`;
    const rawTw = Math.ceil(tmpCtx.measureText(text).width);

    const needsScroll = rawTw > LED_VISIBLE - 30;

    // For continuous scrolling: tile = "TEXT ★ " so RepeatWrapping loops seamlessly
    const loopText = needsScroll ? text + "  ///  " : text;
    const tw = Math.ceil(tmpCtx.measureText(loopText).width);
    const W = needsScroll ? tw : LED_VISIBLE;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = LED_H;
    const ctx = canvas.getContext("2d")!;

    // Dark background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, LED_H);

    // Top/bottom LED border accent
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, 0, W, 2);
    ctx.fillRect(0, LED_H - 2, W, 2);
    ctx.globalAlpha = 1;

    // Text — bright colored on dark bg
    ctx.fillStyle = color;
    ctx.font = `bold ${LED_FONT}px monospace`;
    ctx.textBaseline = "middle";
    if (needsScroll) {
        ctx.textAlign = "left";
        ctx.fillText(loopText, 0, LED_H / 2);
    } else {
        ctx.textAlign = "center";
        ctx.fillText(loopText, W / 2, LED_H / 2);
    }

    // LED grid overlay — dark gaps between each dot cell
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.45;
    for (let x = LED_DOT - 1; x < W; x += LED_DOT) ctx.fillRect(x, 0, 1, LED_H);
    for (let y = LED_DOT - 1; y < LED_H; y += LED_DOT) ctx.fillRect(0, y, W, 1);
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    if (needsScroll) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.x = LED_VISIBLE / W;
    }

    return { tex, needsScroll };
}

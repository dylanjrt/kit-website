"use client";

import { useEffect, useRef } from "react";

export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(size, size);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    if (ref.current) {
      ref.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.055,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

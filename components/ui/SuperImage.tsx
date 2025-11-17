"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

interface SuperImageProps extends ImageProps {
  rounded?: string;       // es: "rounded-xl"
  shadow?: boolean;       // ombra elegante
  hoverZoom?: boolean;    // zoom leggero al passaggio
  className?: string;     
}

export default function SuperImage({
  rounded = "rounded-2xl",
  shadow = true,
  hoverZoom = true,
  className = "",
  ...props
}: SuperImageProps) {
  return (
    <div
      className={`
        overflow-hidden
        ${rounded}
        ${shadow ? "shadow-lg shadow-black/10" : ""}
        ${hoverZoom ? "transition-transform duration-500 hover:scale-[1.03]" : ""}
      `}
    >
      <Image
        {...props}
        alt={props.alt}
        placeholder="blur"
        blurDataURL="/placeholder.svg"
        className={`object-contain w-full h-full ${className}`}
      />
    </div>
  );
}

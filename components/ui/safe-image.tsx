"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null
  fallbackSrc?: string
}

export function SafeImage({ src, alt, fallbackSrc = DEFAULT_FALLBACK, ...props }: SafeImageProps) {
  const [hasError, setHasError] = React.useState(false)
  const [prevSrc, setPrevSrc] = React.useState(src)

  if (src !== prevSrc) {
    setPrevSrc(src)
    setHasError(false)
  }

  const formatSrc = (raw?: string | null): string => {
    if (!raw || typeof raw !== "string" || !raw.trim()) {
      return fallbackSrc
    }
    const trimmed = raw.trim()
    if (trimmed.includes("/uploads/")) {
      return trimmed.substring(trimmed.indexOf("/uploads/"))
    }
    return trimmed
  }

  const currentSrc = hasError ? fallbackSrc : formatSrc(src)

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || "Image"}
      onError={() => {
        if (!hasError) {
          setHasError(true)
        }
      }}
    />
  )
}

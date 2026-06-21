import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  isHovered: boolean
  portrait?: boolean
}

interface FrameComponentProps {
  video: string
  width: number | string
  height: number | string
  className?: string
  mediaSize: number
  isHovered: boolean
  portrait?: boolean
}

function FrameComponent({ video, width, height, className = "", isHovered, portrait }: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isHovered) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isHovered])

  const showPortrait = isHovered && portrait

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              height: '100%',
              width: showPortrait ? 'auto' : '100%',
              aspectRatio: showPortrait ? '9 / 16' : undefined,
              overflow: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={video}
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({
  frames,
  className,
  hoverSize = 6,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getSizes = (axis: "row" | "col") => {
    if (hovered === null) return "4fr 4fr 4fr"
    const idx = axis === "row" ? hovered.row : hovered.col
    const other = (12 - hoverSize) / 2
    return [0, 1, 2].map((i) => (i === idx ? `${hoverSize}fr` : `${other}fr`)).join(" ")
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getSizes("row"),
        gridTemplateColumns: getSizes("col"),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const isH = hovered?.row === row && hovered?.col === col

        return (
          <motion.div
            key={frame.id}
            className="relative"
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              video={frame.video}
              width="100%"
              height="100%"
              className="absolute inset-0"
              mediaSize={frame.mediaSize}
              isHovered={isH}
              portrait={frame.portrait}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

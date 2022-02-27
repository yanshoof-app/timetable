import { Wrapper } from '../types'

export interface SVGProps {
  className?: string
  viewbox?: string
  width?: number
  height?: number
}

export default function SVG({
  className = '',
  viewbox = '0 0 24 24',
  width,
  height,
  children,
}: SVGProps & Wrapper) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewbox}
      className={className}
      width={width}
      height={height}
    >
      {children}
    </svg>
  )
}

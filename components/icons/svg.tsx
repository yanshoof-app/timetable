import { ReactNode } from 'react'

export interface SVGProps {
  className?: string
  viewbox?: string
  width: number
  height: number
  children: ReactNode | ReactNode[]
}

export default function SVG({
  className = '',
  viewbox = '0 0 24 24',
  width = 24,
  height = 24,
  children,
}: SVGProps) {
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

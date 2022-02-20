import { ReactNode, useState } from 'react'

type Variant = 'default' | 'lesson'

export interface DropdownPickProps {
  variant?: Variant
  options: string[]
  defaultIndex?: number
  onChange?: unknown
  className?: string
}

export default function DropdownPick({
  variant = 'default',
  className = '',
  options,
  defaultIndex = 0,
}: DropdownPickProps) {
  const [selectedIndex, changeSelectedIndex] = useState(defaultIndex)
  const [opened, setOpen] = useState(false)

  return (
    <div className={`${className} bg-uiPrimary-200`}>
      <p>{options[selectedIndex]}</p>
      <div>
        {options.map((option, index) => (
          <p
            key={index}
            onClick={() => {
              changeSelectedIndex(index)
              setOpen(false)
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  )
}

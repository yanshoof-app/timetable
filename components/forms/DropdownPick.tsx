import { ReactNode, useState } from 'react'

type Variant = 'default' | 'lesson'

export interface DropdownPickProps {
  options: string[]
  defaultIndex?: number
  onChange?: unknown
  className?: string
}

export default function DropdownPick({
  className = '',
  options,
  defaultIndex = 0,
}: DropdownPickProps) {
  const [selectedIndex, changeSelectedIndex] = useState(defaultIndex)
  const [opened, setOpen] = useState(true)

  return (
    <div
      className={`${className} flex bg-uiPrimary-200 rounded-[5px] pr-[1rem] pl-[1rem] flex-col justify-around items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400 cursor-pointer`}
    >
      <div
        className="flex h-[3rem] w-[100%] items-center justify-between"
        onClick={() => {
          setOpen(!opened)
        }}
      >
        {' '}
        <p>{options[selectedIndex]}</p>
        <div className={`${opened && 'rotate-180'} w-4 h-4 `}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
          </svg>{' '}
        </div>
      </div>

      <div
        className={`${
          !opened && 'max-h-0'
        } overflow-hidden w-[100%] flex flex-col`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              changeSelectedIndex(index)
              setOpen(false)
            }}
            className="h-8 flex items-center justify-start "
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

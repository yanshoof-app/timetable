import { ReactNode, useEffect, useState } from 'react'

type Variant = 'default' | 'lesson'

export interface DropdownPickProps {
  options: string[]
  defaultIndex?: number
  onChange?(number): unknown
  className?: string
}

export default function DropdownPick({
  className = '',
  options,
  defaultIndex = 0,
  onChange = () => {},
}: DropdownPickProps) {
  const [selectedIndex, changeSelectedIndex] = useState(defaultIndex)
  const [opened, setOpen] = useState(true)

  useEffect(() => {
    onChange(selectedIndex)
  }, [selectedIndex])

  return (
    <div
      className={`${className} flex relative bg-uiPrimary-200 ${
        !opened && 'rounded-[5px]'
      } rounded-t-[5px] flex-col justify-start items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400`}
    >
      <div
        className="flex h-[3rem] w-[100%] items-center justify-between cursor-pointer pr-[1rem] pl-[1rem]"
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
        } overflow-hidden flex flex-col absolute w-full top-[3rem]  bg-uiPrimary-200 text-uiPrimary-400 rounded-b-[5px] z-10`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              changeSelectedIndex(index)
              setOpen(false)
            }}
            className="h-8 flex items-center justify-start w-full cursor-pointer pr-[1rem] pl-[1rem]"
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

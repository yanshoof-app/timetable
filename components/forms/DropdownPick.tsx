import { ReactNode, useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import Selected from './Selected'

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
  const [opened, setOpen] = useState(false)

  useEffect(() => {
    onChange(selectedIndex)
  }, [selectedIndex])

  return (
    <div
      className={`${className} flex relative bg-uiPrimary-200 ${
        !opened && 'rounded-[5px]'
      } rounded-t-[5px] flex-col justify-start items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400`}
    >
      <Selected
        options={options}
        selectedIndex={selectedIndex}
        opened={opened}
        setOpen={setOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
        </svg>{' '}
      </Selected>
      {opened && (
        <Dropdown
          options={options.filter((option) => option != options[selectedIndex])}
          onChange={onChange}
          selectedIndex={selectedIndex}
          changeSelectedIndex={changeSelectedIndex}
          setOpen={setOpen}
        ></Dropdown>
      )}
    </div>
  )
}

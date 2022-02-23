import { useEffect, useState } from 'react'
import { Expand } from '../../icons'
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
        <Expand width={24} className={opened ? 'rotate-180' : 'rotate-0'} />
      </Selected>
      {opened && (
        <Dropdown
          options={options}
          selectedIndex={selectedIndex}
          changeSelectedIndex={changeSelectedIndex}
          setOpen={setOpen}
        ></Dropdown>
      )}
    </div>
  )
}

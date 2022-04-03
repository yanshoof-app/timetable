import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef()

  const [selectedIndex, changeSelectedIndex] = useState(defaultIndex)
  const [opened, setOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        opened &&
        ref.current &&
        !(ref.current as HTMLElement).contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [opened])

  useEffect(() => {
    onChange(selectedIndex)
  }, [selectedIndex, onChange])

  return (
    <div
      className={`${className} flex relative bg-uiPrimary-200 ${
        opened ? 'rounded-t-lg' : 'rounded-lg'
      }  flex-col justify-start items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400`}
      role="menu"
      ref={ref}
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

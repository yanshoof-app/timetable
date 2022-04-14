import { useCallback, useEffect, useRef, useState } from 'react'
import { Expand } from '../../icons'
import Dropdown from './Dropdown'
import Selected from './Selected'

type Variant = 'default' | 'lesson'

export interface DropdownPickProps {
  options: string[]
  indexOfValue?: number
  onIndexChange?(number): unknown
  className?: string
}

export default function DropdownPick({
  className = '',
  options,
  indexOfValue = 0,
  onIndexChange = () => {},
}: DropdownPickProps) {
  const ref = useRef()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isOpen &&
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
  }, [isOpen])

  const changeSelectedIndex = useCallback(
    (newIndex: number) => {
      if (newIndex !== indexOfValue) onIndexChange(newIndex)
    },
    [indexOfValue, onIndexChange]
  )

  return (
    <div
      className={`${className} flex relative bg-uiPrimary-200 ${
        isOpen ? 'rounded-t-lg' : 'rounded-lg'
      }  flex-col justify-start items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400`}
      role="menu"
      ref={ref}
    >
      <Selected
        options={options}
        selectedIndex={indexOfValue}
        opened={isOpen}
        setOpen={setOpen}
      >
        <Expand width={24} className={isOpen ? 'rotate-180' : 'rotate-0'} />
      </Selected>
      {isOpen && (
        <Dropdown
          options={options}
          selectedIndex={indexOfValue}
          changeSelectedIndex={changeSelectedIndex}
          setOpen={setOpen}
        />
      )}
    </div>
  )
}

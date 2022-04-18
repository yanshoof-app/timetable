import { Wrapper } from '../../types'

export interface SelectedProps {
  options: string[]
  selectedIndex: number
  opened: boolean
  setOpen(boolean): unknown
}

export default function Selected({
  options,
  selectedIndex,
  opened,
  setOpen,
  children,
}: SelectedProps & Wrapper) {
  return (
    <div
      className="flex h-[3rem] w-full items-center justify-between cursor-pointer pr-[1rem] pl-[1rem] dark:text-gray-300 "
      onClick={() => {
        setOpen(!opened)
      }}
    >
      {' '}
      <p>{options[selectedIndex]}</p>
      <div>{children}</div>
    </div>
  )
}

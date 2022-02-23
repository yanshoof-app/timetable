import { ReactNode } from 'react'

type Variant = 'default' | 'lesson'

export interface SelectedProps {
  options: string[]
  selectedIndex: number
  opened: boolean
  setOpen(boolean): unknown
  children?: ReactNode | ReactNode[]
}

export default function Selected({
  options,
  selectedIndex,
  opened,
  setOpen,
  children,
}: SelectedProps) {
  return (
    <div
      className="flex h-[3rem] w-full items-center justify-between cursor-pointer pr-[1rem] pl-[1rem]"
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

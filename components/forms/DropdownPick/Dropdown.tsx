type Variant = 'default' | 'lesson'

export interface DropdownProps {
  options: string[]
  defaultIndex?: number
  onChange?(number): unknown
  onClick?(number): unknown
  selectedIndex: number
  changeSelectedIndex?(number): unknown
  setOpen(boolean): unknown
}

export default function Dropdown({
  options,
  onChange = () => {},
  onClick = () => {},
  selectedIndex,
  changeSelectedIndex = () => {},
  setOpen,
}: DropdownProps) {
  return (
    <div
      className={`overflow-hidden flex flex-col absolute w-full top-[3rem]  bg-uiPrimary-200 text-uiPrimary-400 rounded-b-[5px] z-10`}
    >
      {options.map(
        (option, index) =>
          index !== selectedIndex && (
            <div
              key={index}
              onClick={() => {
                changeSelectedIndex(index)
                onClick(index)
                setOpen(false)
              }}
              className="h-8 flex items-center justify-start w-full cursor-pointer pr-[1rem] pl-[1rem]"
            >
              <p>{option}</p>
            </div>
          )
      )}
    </div>
  )
}

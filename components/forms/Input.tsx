import { useEffect, useState } from 'react'

type Variant = 'default' | 'lesson'

export interface InputProps {
  onChange?(string): unknown
  value: string
  hint: string
  className?: string
}

export default function Input({
  value,
  onChange = () => {},
  hint,
  className = '',
}: InputProps) {
  const [input, setInput] = useState(value)

  useEffect(() => {
    onChange(input)
  }, [input])

  const [selected, setSelected] = useState(false)
  return (
    <div
      className={`flex relative bg-uiPrimary-200 rounded-[5px] flex-col justify-start items-center font-semibold text-uiPrimary-400 fill-uiPrimary-400 ${className}`}
    >
      <input
        className="bg-transparent h-[3rem] w-full pr-[1rem] pl-[1rem] appearance-none focus:outline-none font-semibold"
        type={'text'}
        onChange={(input) => setInput(input.target.value)}
        placeholder={selected ? '' : hint}
        onSelect={() => setSelected(true)}
        onBlur={() => setSelected(false)}
      ></input>
    </div>
  )
}

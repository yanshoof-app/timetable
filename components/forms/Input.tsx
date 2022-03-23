import { useEffect, useState } from 'react'

type Variant = 'default' | 'lesson'

export interface InputProps {
  onChange?(string): unknown
  value: string
  hint: string
  className?: string
  id?: string
}

export default function Input({
  value,
  onChange = () => {},
  hint,
  className = '',
  id = '',
}: InputProps) {
  const [input, setInput] = useState(value)

  useEffect(() => {
    onChange(input)
  }, [input, onChange])

  useEffect(() => {
    setInput(value)
  }, [value])

  const [selected, setSelected] = useState(false)
  return (
    <div
      className={`flex relative bg-uiPrimary-200 rounded-lg flex-col justify-start items-center text-uiPrimary-400 fill-uiPrimary-400 ${className}`}
    >
      <input
        className="bg-transparent h-[3rem] w-full pr-[1rem] pl-[1rem] appearance-none focus:outline-none"
        type={'text'}
        value={input}
        onChange={(input) => setInput(input.target.value)}
        placeholder={selected ? '' : hint}
        onSelect={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        id={id}
      ></input>
    </div>
  )
}

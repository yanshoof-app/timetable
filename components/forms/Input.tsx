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
  }, [input, onChange])

  useEffect(() => {
    setInput(value)
  }, [value])

  const [selected, setSelected] = useState(false)
  return (
    <div
      className={`flex relative bg-uiPrimary-200 dark:bg-slate-900 rounded-lg flex-col justify-start items-center text-uiPrimary-400 dark:text-gray-400 fill-uiPrimary-400  ${className}`}
    >
      <input
        className="bg-transparent h-12 w-full px-4 font-semibold appearance-none focus:outline-none dark:placeholder:text-gray-500"
        type={'text'}
        value={input}
        onChange={(input) => setInput(input.target.value)}
        placeholder={selected ? '' : hint}
        onSelect={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        spellCheck={false}
      ></input>
    </div>
  )
}

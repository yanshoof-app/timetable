import { options_example } from '../../../timetable_sample'
import RadioButton from '../../forms/RadioButton'

interface option {
  image: unknown
  label: string
  value: string | boolean
}

export interface OptionsLayoutProps {
  options: option[]
  onChange
  value
}

export default function OptionsLayout({
  options,
  onChange,
  value,
}: OptionsLayoutProps) {
  return (
    <div>
      {options.map((option) => (
        <div>
          {option.image}
          <RadioButton
            selected={value === option.value}
            label={option.label}
          ></RadioButton>
        </div>
      ))}
    </div>
  )
}

import { Done } from '../icons'
import Button from './Button'

const orientations = {
  horizontal: 'flex-col',
  vertical: 'flex-row',
}

export type RadioButtonOrientation = keyof typeof orientations

export interface RadioButtonProps {
  onClick?(): unknown
  selected: boolean
  orientation?: RadioButtonOrientation
  label: string
}

export default function RadioButton({
  onClick,
  selected,
  orientation = 'horizontal',
  label,
}: RadioButtonProps) {
  return (
    <div
      className={`flex justify-center items-center gap-2 ${orientations[orientation]}`}
    >
      <p className="font-semibold dark:text-white" onClick={() => onClick()}>
        {label}
      </p>
      <Button
        className={`rounded-full px-[3px] py-[3px] w-6 h-6 justify-center items-center ring-black dark:ring-gray-300 ${
          !selected && 'ring-2'
        }`}
        onClick={() => onClick()}
        variant={selected ? 'primary' : 'secondary'}
      >
        {selected && <Done></Done>}
      </Button>
    </div>
  )
}

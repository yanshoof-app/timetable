import { Done } from '../icons'
import Button from './Button'

const orientations = {
  horizontal: 'flex-col gap-1',
  vertical: 'flex-row gap-2',
}

export type RadioButtonOrientation = keyof typeof orientations

export interface RadioButtonProps {
  onClick?(): unknown
  selected: boolean
  orientation: RadioButtonOrientation
  label: string
}

export default function RadioButton({
  onClick,
  selected,
  orientation,
  label,
}: RadioButtonProps) {
  return (
    <div
      className={`flex justify-center items-center gap-1 ${orientations[orientation]}`}
    >
      <p className="font-semibold">{label}</p>
      <Button
        className={`rounded-full m-0 px-[3px] py-[3px] w-6 h-6 justify-center items-center ring-black ${
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

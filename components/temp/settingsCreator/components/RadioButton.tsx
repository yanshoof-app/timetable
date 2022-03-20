import { ReactNode } from 'react'
import Button from '../../../forms/Button'
import { Done } from '../../../icons'

const orientations = {
  horizontal: 'flex-col',
  vertical: 'flex-row',
}

type RadioButtonOrientation = keyof typeof orientations

interface RadioButtonProps {
  onClick?(): unknown
  selected: boolean
  orientation?: RadioButtonOrientation
  children: ReactNode
}

export default function LessonRadioButton({
  onClick,
  selected,
  orientation = 'vertical',
  children,
}: RadioButtonProps) {
  return (
    <div className={`flex justify-start items-center gap-2`}>
      <Button
        className={`rounded-full m-0 px-[3px] py-[3px] w-6 h-6 justify-center items-center ring-black ${
          !selected && 'ring-2'
        }`}
        onClick={() => onClick()}
        variant={selected ? 'primary' : 'secondary'}
      >
        {selected && <Done></Done>}
      </Button>
      {children}
    </div>
  )
}

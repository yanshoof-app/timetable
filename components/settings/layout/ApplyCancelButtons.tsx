import Button from '../../forms/Button'

export interface IApplyCancelButtonsProps {
  apply(): void
  cancel(): void
  className?: string
}

const APPLY = 'סיום'
const CANCEL = 'ביטול'

export default function ApplyCancelButtons({
  apply,
  cancel,
  className = '',
}: IApplyCancelButtonsProps) {
  return (
    <div className={'flex flex-row items-center gap-8 ' + className}>
      <Button onClick={cancel} variant="secondary" className="w-20">
        {CANCEL}
      </Button>
      <Button onClick={apply} className="w-20">
        {APPLY}
      </Button>
    </div>
  )
}

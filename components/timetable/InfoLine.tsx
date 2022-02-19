export interface InfoLineProps {
  info: string
  newInfo?: string
  bold?: boolean
  changed?: boolean
}

export default function InfoLine({
  info = '',
  newInfo = '',
  bold = false,
  changed = false,
}: InfoLineProps) {
  return (
    <div
      className={`flex flex-row gap-1 truncate mb-[-0.46rem] mt-[-0.46rem] ${
        bold ? 'font-bold' : 'font-semibold'
      }`}
    >
      <p className={`${(newInfo || changed) && 'line-through'}`}>{info}</p>
      {newInfo && <p className="truncate">{newInfo}</p>}
    </div>
  )
}

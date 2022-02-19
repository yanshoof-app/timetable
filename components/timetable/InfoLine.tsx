export interface InfoLineProps {
  info: string
  newInfo?: string
  bold?: boolean
  canceled?: boolean
}

export default function InfoLine({
  info = '',
  newInfo = '',
  bold = false,
  canceled = false,
}: InfoLineProps) {
  return (
    <div
      className={`flex flex-row gap-1 flex-wrap mb-[-0.46rem] mt-[-0.46rem] ${
        bold ? 'font-bold' : 'font-semibold'
      }`}
    >
      <p className={`${(newInfo || canceled) && 'line-through'}`}>{info}</p>
      {newInfo && <p>{newInfo}</p>}
    </div>
  )
}

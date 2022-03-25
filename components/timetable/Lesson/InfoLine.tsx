export interface InfoLineProps {
  info: string
  newInfo?: string | boolean
  bold?: boolean
}

export default function InfoLine({
  info = '',
  newInfo,
  bold = false,
}: InfoLineProps) {
  return (
    <div
      className={`truncate mb-[-0.46rem] mt-[-0.46rem] ${
        bold ? 'font-bold' : 'font-semibold'
      }`}
    >
      <span className={`${newInfo && 'line-through ml-1'}`}>{info}</span>
      {typeof newInfo === 'string' && <span>{newInfo}</span>}
    </div>
  )
}

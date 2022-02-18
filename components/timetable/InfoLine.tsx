export interface InfoLineProps {
  info: string
  newInfo?: string
  bold?: boolean
}

export default function InfoLine({
  info = '',
  newInfo = '',
  bold = false,
}: InfoLineProps) {
  return (
    <div
      className={`flex flex-row gap-1 flex-wrap ${
        bold ? 'font-bold' : 'font-semibold'
      }`}
    >
      <p className={`${newInfo && 'line-through'}`}>{info}</p>
      {newInfo && <p>{newInfo}</p>}
    </div>
  )
}

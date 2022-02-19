import useHebrewDate from '../../hooks/useHebrewDate'

export interface DayDateViewProps {
  ofDate?: Date
  className?: string
}

export default function DayDateView({
  ofDate = new Date(),
  className = '',
}: DayDateViewProps) {
  const hebrewDate = useHebrewDate(ofDate)
  return <p className={className}>{hebrewDate}</p>
}

import Confetti from 'react-confetti'
import useWindowSize from '../../hooks/useWindowSize'

const colors = ['#be123c', '#d97706', '#a3e635', '#0ea5e9']

export default function CancellationConfetti() {
  const [width, height] = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      colors={colors}
      recycle={false}
      numberOfPieces={400}
      gravity={0.2}
    />
  )
}

import { Wrapper } from '../types'

const variants = {
  primary: 'bg-sky-500 text-white sm:hover:bg-sky-700',
  secondary:
    'bg-transparent text-sky-500 ring-1 ring-sky-500 hover:text-sky-700 hover:ring-sky-700',
}

export type ButtonVariant = keyof typeof variants

export interface ButtonProps {
  variant?: ButtonVariant
  onClick?(): unknown
  className?: string
}

export default function Button({
  variant = 'primary',
  onClick = () => {},
  children,
  className = '',
}: ButtonProps & Wrapper) {
  return (
    <button
      className={`${variants[variant]} rounded-lg px-4 py-2 font-semibold m-2 ${className}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

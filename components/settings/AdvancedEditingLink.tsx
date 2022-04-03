import Link from 'next/link'

const ADVANCED_EDITING = 'עריכה מתקדמת'

const AdvancedEditingLink = ({ className = '' }: { className?: string }) => (
  <Link href="/settings/edit" passHref>
    <span
      className={`text-primary-500 font-semibold cursor-pointer ${className}`}
    >
      {ADVANCED_EDITING}
    </span>
  </Link>
)
export default AdvancedEditingLink

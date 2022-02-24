import Link from 'next/link'

const ADVANCED_EDITING = 'עריכה מתקדמת'

const AdvancedEditingLink = ({ className = '' }: { className?: string }) => (
  <Link href="/settings/edit">
    <span className={`text-primary-500 font-semibold ${className}`}>
      {ADVANCED_EDITING}
    </span>
  </Link>
)
export default AdvancedEditingLink

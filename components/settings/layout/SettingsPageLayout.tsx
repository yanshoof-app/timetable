import { BackRTL } from '../../icons'
import Layout from '../../Layout'
import { Wrapper } from '../../types'
import PageTitle from '../../ui/PageTitle'

export interface ISettingsPageLayoutProps extends Wrapper {
  onBackPress?(): void
  title: string
  hidePageTitle?: boolean
  centerContent?: boolean
  className?: string
}

export default function SettingsPageLayout({
  onBackPress,
  title,
  centerContent = false,
  hidePageTitle = false,
  children,
  className = '',
}: ISettingsPageLayoutProps) {
  let layoutClassName = 'px-4'
  let childrenDivClassName = ''
  if (centerContent) {
    layoutClassName += ` flex flex-col ${
      hidePageTitle ? 'justify-center' : 'justify-between'
    }`
    childrenDivClassName = hidePageTitle ? '' : 'mb-[40vh] '
  }
  childrenDivClassName += className
  return (
    <Layout title={title} className={layoutClassName}>
      {onBackPress && !hidePageTitle && (
        <PageTitle
          title={title}
          startIcon={BackRTL}
          onStartIconClick={onBackPress}
        />
      )}
      <div className={childrenDivClassName}>{children}</div>
    </Layout>
  )
}

import { BackRTL } from '../icons'
import Layout from '../Layout'
import { Wrapper } from '../types'
import PageTitle from '../ui/PageTitle'
import { ISettingsPageProps } from './types'

export interface ISettingsPageLayoutProps
  extends Required<ISettingsPageProps>,
    Wrapper {
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
  return (
    <Layout
      title={title}
      className={`px-4 ${centerContent ? 'flex flex-col justify-between' : ''}`}
    >
      {onBackPress && !hidePageTitle && (
        <PageTitle
          title={title}
          startIcon={BackRTL}
          onStartIconClick={onBackPress}
        />
      )}
      <div className={`${centerContent ? 'mb-[40vh]' : '0'} ${className}`}>
        {children}
      </div>
    </Layout>
  )
}

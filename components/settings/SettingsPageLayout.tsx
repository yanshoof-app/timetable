import { BackRTL } from '../icons'
import Layout from '../Layout'
import { Wrapper } from '../types'
import PageTitle from '../ui/PageTitle'
import { ISettingsPageProps } from './types'

export interface ISettingsPageLayoutProps
  extends Required<ISettingsPageProps>,
    Wrapper {
  title: string
  showPageTitle: boolean
  className?: string
}

export default function SettingsPageLayout({
  onBackPress,
  title,
  showPageTitle,
  children,
  className = '',
}: ISettingsPageLayoutProps) {
  return (
    <Layout
      title={title}
      className={`px-4 flex flex-col items-center ${
        showPageTitle ? 'justify-between' : 'justify-center'
      }`}
    >
      {showPageTitle && (
        <PageTitle
          title="בחירת כיתה"
          startIcon={BackRTL}
          onStartIconClick={onBackPress}
        />
      )}
      <div className={`${showPageTitle ? 'mb-[40vh]' : '0'} ${className}`}>
        {children}
      </div>
    </Layout>
  )
}

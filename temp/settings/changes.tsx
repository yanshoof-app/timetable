import asPage from '../../components/settings/layout/asPage'
import OtherChangesSetting from '../../components/settings/OtherChangesSetting'

const OthersChangesSettingPage = asPage(
  OtherChangesSetting,
  { title: 'שינויים של אחרים' },
  ({ showOthersChanges, setOthersChangesPreference }, router) => ({
    value: showOthersChanges,
    applyImmedietly: true,
    save: (value) => {
      setOthersChangesPreference(value)
    },
    navigateBack: () => router.push('/settings'),
  })
)

export default OthersChangesSettingPage

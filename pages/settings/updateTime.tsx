import asPage from '../../components/settings/layout/asPage'
import UpdateTimeSetting from '../../components/settings/UpdateTimeSetting'

const UpdateTimeSettingPage = asPage(
  UpdateTimeSetting,
  { title: 'מערכת של מחר', centerContent: true },
  ({ updateTime, setUpdateTime }, router) => ({
    value: updateTime,
    save: (value) => {
      setUpdateTime(value)
      router.push('/settings')
    },
  })
)

export default UpdateTimeSettingPage

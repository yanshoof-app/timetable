import asPage from '../../components/settings/layout/asPage'
import UpdateTimeSetting from '../../components/settings/UpdateTimeSetting'

const UpdateTimeSettingPage = asPage(
  UpdateTimeSetting,
  { title: 'מערכת של מחר', centerContent: true },
  ({ updateTime, setUpdateTime }, router) => ({
    isEditing: true,
    value: updateTime,
    save: (newUpdateTime) => {
      setUpdateTime(newUpdateTime)
      router.push('/settings')
    },
  })
)

export default UpdateTimeSettingPage

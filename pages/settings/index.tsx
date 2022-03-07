import Layout from '../../components/Layout'
import { useStorage } from '../../contexts/Storage'

const Settings = () => {
  const { school, classId, theme, updateTime, showOthersChanges, studyGroups } =
    useStorage()
  return <Layout></Layout>
}

export default Settings

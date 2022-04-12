import SchoolPick from '../../components/settings/SchoolPick'
import useBackPress from '../../hooks/useBackPress'

export default function SchoolSettingPage() {
  const { back } = useBackPress('/settings')
  return <SchoolPick onBackPress={back} />
}

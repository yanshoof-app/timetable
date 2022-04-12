import UpdateHourPick from '../../components/settings/UpdateHourPick'
import useBackPress from '../../hooks/useBackPress'

export default function UpdateTimeSettings() {
  const { back } = useBackPress('/settings')
  return <UpdateHourPick onBackPress={back} />
}

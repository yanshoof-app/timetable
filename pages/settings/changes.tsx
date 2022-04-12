import OthersChangesPick from '../../components/settings/OthersChangesPick'
import useBackPress from '../../hooks/useBackPress'

export default function OthersChangesSetting() {
  const { back } = useBackPress('/settings')
  return <OthersChangesPick onBackPress={back} />
}

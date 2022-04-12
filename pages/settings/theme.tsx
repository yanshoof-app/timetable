import ThemePreferencePick from '../../components/settings/ThemePreferencePick'
import useBackPress from '../../hooks/useBackPress'

export default function ThemePreferenceSetting() {
  const { back } = useBackPress('/settings')
  return <ThemePreferencePick onBackPress={back} />
}

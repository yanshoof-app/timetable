import { useRouter } from 'next/router'
import ClassPick from '../../components/settings/ClassPick'
import useBackPress from '../../hooks/useBackPress'

export default function ClassPickPage() {
  const { back } = useBackPress('/settings')
  const { push } = useRouter()
  return (
    <ClassPick
      onBackPress={back}
      onSchoolEditPress={() => push('/settings/school')}
    />
  )
}

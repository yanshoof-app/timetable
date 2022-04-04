import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { BackRTL } from '../../../components/icons'
import Layout from '../../../components/Layout'
import LessonsOfDay from '../../../components/settings/LessonsOfDay'
import LoadingScreen from '../../../components/ui/LoadingScreens'
import PageTitle from '../../../components/ui/PageTitle'
import { useStorage } from '../../../contexts/Storage'
import useLessonsOfStudyGroup from '../../../hooks/useLessonsOfStudyGroup'
import { DayOfWeek } from '../../../interfaces'

const LESSONS_IN_SCHEDULE = 'שיעורים במערכת'

const StudyGroup = () => {
  const { studyGroups } = useStorage()
  const router = useRouter()
  const { groupId } = router.query
  const studyGroupId = useMemo(() => Number(groupId), [groupId])
  const studyGroup = useMemo(
    () => studyGroups[Number(groupId)],
    [groupId, studyGroups]
  )
  const days = useLessonsOfStudyGroup(studyGroupId)
  return studyGroup ? (
    <Layout title={studyGroup[0]}>
      <PageTitle
        title={studyGroup[0]}
        orientation={'justify-start'}
        startIcon={BackRTL}
        onStartIconClick={() => router.back()}
      />
      <div className="px-4">
        <h2 className=" font-bold text-lg">{LESSONS_IN_SCHEDULE}</h2>
        {days.map(
          (hours, day) =>
            hours.length > 0 && (
              <LessonsOfDay day={day as DayOfWeek} hourSet={hours} key={day} />
            )
        )}
      </div>
    </Layout>
  ) : (
    <LoadingScreen label="קבוצות לימוד" />
  )
}

export default StudyGroup

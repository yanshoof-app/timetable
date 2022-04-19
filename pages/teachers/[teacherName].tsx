import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import useTeacherSchedule from '../../hooks/useTeacherSchedule'
import { useStorage } from '../../contexts/Storage'
import Timetable from '../../components/timetable/Timetable'
import TimetableSkeleton from '../../components/timetable/TimetableSkeleton'
import { DayOfWeek, isAnyLessonObj, ITeacherLesson } from '../../interfaces'
import { useMemo, useState } from 'react'
import DayPick from '../../components/forms/DayPick'
import PageTitle from '../../components/ui/PageTitle'
import { BackRTL } from '../../components/icons'
import useCurrentDay from '../../hooks/useCurrentDay'
import { useDayFilterer } from '../../hooks/useDayFilterer'
import { SkeletonLesson } from '../../components/timetable/Lesson/Skeleton'
import SearchingLessons from '../../components/ui/LoadingScreens/SearchingLessons'

const SCHEDULEOF = 'המערכת של'

const TeacherSchedule = () => {
  const router = useRouter()
  const { teacherName } = router.query
  const { lessons, isLoading, ...status } = useTeacherSchedule(
    teacherName as string
  )
  // const dayFilterer = useDayFilterer(lessons)
  const { currentDay } = useCurrentDay()
  const [day, updateDay] = useState(currentDay)

  return (
    <Layout title={`${SCHEDULEOF} ${teacherName}`}>
      <PageTitle
        title={teacherName as string}
        orientation={'justify-start'}
        startIcon={BackRTL}
        onStartIconClick={() => router.back()}
      />
      <div className="px-4 space-y-4">
        <DayPick day={day} onChange={updateDay} />
        <SearchingLessons {...status} isLoading={isLoading} />
        <Timetable
          timetable={lessons}
          day={currentDay}
          windowSkeleton={isLoading ? SkeletonLesson : null}
        />
      </div>
    </Layout>
  )
}

export default TeacherSchedule

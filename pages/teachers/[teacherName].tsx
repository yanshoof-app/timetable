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

const SCHEDULEOF = 'המערכת של'

const TeacherSchedule = () => {
  const router = useRouter()
  const { teacherName } = useMemo(() => router.query, [router.query])
  const { school } = useStorage()
  const { teacherSchedule } = useTeacherSchedule(school, teacherName as string)
  const dayFilterer = useDayFilterer(teacherSchedule)
  const { currentDay } = useCurrentDay(dayFilterer)
  const [day, updateDay] = useState(currentDay)

  console.log('Rerender')

  return (
    <Layout title={`${SCHEDULEOF} ${teacherName}`}>
      <PageTitle
        title={teacherName as string}
        orientation={'justify-start'}
        startIcon={BackRTL}
        onStartIconClick={() => router.back()}
      />
      <div className="px-4">
        <DayPick day={day} onChange={updateDay} dayFilterer={dayFilterer} />
        {teacherSchedule[0] ? (
          <Timetable className="py-4" day={day} timetable={teacherSchedule} />
        ) : (
          <TimetableSkeleton className={'py-4'} />
        )}
      </div>
    </Layout>
  )
}

export default TeacherSchedule

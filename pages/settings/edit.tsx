import { useRouter } from 'next/router'
import { useState } from 'react'
import DayPick from '../../components/forms/DayPick'
import { BackRTL } from '../../components/icons'
import Layout from '../../components/Layout'
import Timetable from '../../components/timetable/Timetable'
import TimetableSkeleton from '../../components/timetable/TimetableSkeleton'
import PageTitle from '../../components/ui/PageTitle'
import { useFullTimetable } from '../../contexts/FullTimetable'
import { DayOfWeek, isAnyLessonObj } from '../../interfaces'

const TITLE = 'עריכה מתקדמת'

export default function AdvancedEditingPage() {
  const router = useRouter()
  const [day, setDay] = useState(0 as DayOfWeek)
  const { isLoading, timetable } = useFullTimetable()
  return (
    <Layout title={TITLE}>
      <PageTitle
        title={TITLE}
        orientation="justify-start"
        startIcon={BackRTL}
        onStartIconClick={() => router.push('/settings')}
      />
      <DayPick
        day={day}
        onChange={setDay}
        className="px-5 w-full"
        dayFilterer={(_dayName, index) =>
          timetable[0] && timetable[index].some((lessons) => !!lessons.length)
        }
      />
      {isLoading ? (
        <TimetableSkeleton className="p-5" />
      ) : (
        <Timetable
          className="p-5 mb-10 overflow-y-scroll"
          day={day}
          timetable={timetable}
          isEditing
        />
      )}
    </Layout>
  )
}

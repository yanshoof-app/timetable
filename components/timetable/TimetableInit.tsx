import { useCallback } from 'react'
import { useFullTimetable } from '../../contexts/FullTimetable'
import { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import { useIteration } from '../../hooks/useIteration'
import { useEditableDays } from '../../hooks/useEditableDays'
import Button from '../forms/Button'
import TimetableSkeleton from './TimetableSkeleton'
import Timetable from './Timetable'
import { useTimetable } from '../../contexts/Timetable'
import Layout from '../Layout'
import { useStorage } from '../../contexts/Storage'

export default function TimetableInit() {
  const { timetable } = useFullTimetable()
  const days = useEditableDays(timetable)
  const { currentItem: currentDay, ...gestures } = useIteration(days)
  const { clearProblems } = useTimetable()
  const { setClassId } = useStorage()

  const onPrevClick = useCallback(() => {
    if (gestures.prevDisabled) setClassId(undefined)
    else gestures.prev()
  }, [gestures, setClassId])

  const onNextClick = useCallback(() => {
    if (gestures.nextDisabled) clearProblems()
    else gestures.next()
  }, [gestures, clearProblems])

  return (
    <Layout className="p-[18px] h-screen flex flex-col justify-between items-center gap-2 ">
      <p className="font-bold text-2xl">הוסיפו שיעורים במקומות הריקים</p>
      <p className="font-semibold text-xl">{HEBREW_DAYS[currentDay]}</p>
      <div
        className={`bg-stone-200 p-[18px] rounded-[30px] w-full h-full ${
          timetable.length ? 'overflow-scroll' : 'overflow-hidden'
        }`}
      >
        {timetable.length ? (
          <Timetable day={currentDay} timetable={timetable} />
        ) : (
          <TimetableSkeleton />
        )}
      </div>
      <div className="flex justify-between w-full p-0">
        <Button onClick={onPrevClick} className="my-2 w-24" variant="secondary">
          הקודם
        </Button>
        <Button onClick={onNextClick} className="my-2 w-24">
          הבא
        </Button>
      </div>
    </Layout>
  )
}

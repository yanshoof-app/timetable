import { useMemo, useState } from 'react'
import ChangesOfHour from '../components/changes'
import RadioButton from '../components/forms/RadioButton'
import Layout from '../components/Layout'
import Navbar from '../components/ui/Navbar'
import PageTitle from '../components/ui/PageTitle'
import { useStorage } from '../contexts/Storage'
import useChanges from '../hooks/useChanges'
import useCurrentDay from '../hooks/useCurrentDay'
import useDate from '../hooks/useDate'
import { useDayFilterer } from '../hooks/useDayFilterer'
import useHebrewDate, {
  HEBREW_DAYS,
  useHebrewDateNoMonth,
} from '../hooks/useHebrewDate'
import { DayOfWeek, ILesson } from '../interfaces'
import { timetable_example } from '../timetable_sample'

const NO_CHANGES = 'אין שינויים להצגה'

const ChangesPage = () => {
  const { lessons } = useStorage()
  const { changes, numOfChanges } = useChanges(lessons)

  const dayFilterer = useDayFilterer(lessons)
  const { currentDay, date } = useCurrentDay(dayFilterer)

  const [showAllChanges, setshowAllChanges] = useState(true)

  //TODO: Make filter work
  return (
    <Layout className="overflow-hidden flex flex-col text-center">
      <PageTitle title="שינויים" />
      <div className="flex flex-col gap-4  px-5">
        <div className="flex justify-evenly gap-4">
          <RadioButton
            selected={showAllChanges}
            label="כל השינויים"
            orientation="vertical"
            onClick={() => setshowAllChanges(true)}
          ></RadioButton>
          <RadioButton
            selected={!showAllChanges}
            label="שינויים של היום"
            orientation="vertical"
            onClick={() => setshowAllChanges(false)}
          ></RadioButton>
        </div>
        <div className="flex flex-col gap-2">
          {changes.map(
            (day, dayIndex) =>
              day.length > 0 && (
                <div
                  className="flex flex-col border-b-2 pb-2 border-gray-200 last:border-b-0"
                  key={dayIndex}
                >
                  {/* Date */}
                  <div className="flex gap-1">
                    <p
                      className={`font-semibold text-lg ${
                        dayIndex == currentDay && 'text-primary-500'
                      }`}
                    >
                      {`יום ${HEBREW_DAYS[dayIndex]}`},
                    </p>
                    <p className="font-medium text-lg">
                      {useHebrewDateNoMonth(
                        useDate(dayIndex as DayOfWeek, date.current)
                      )}
                    </p>
                  </div>

                  {/* Changes */}
                  <div className="flex flex-col gap-2 pr-2">
                    {day.map((hour, index) => (
                      <ChangesOfHour {...hour} key={index} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {numOfChanges == 0 && (
        <p className="font-semibold dark:text-white">{NO_CHANGES}</p>
      )}

      <Navbar />
    </Layout>
  )
}

export default ChangesPage

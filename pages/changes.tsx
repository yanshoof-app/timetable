import ChangesOfHour from '../components/changes'
import Layout from '../components/Layout'
import Navbar from '../components/ui/Navbar'
import PageTitle from '../components/ui/PageTitle'
import useChanges from '../hooks/useChanges'
import { HEBREW_DAYS } from '../hooks/useHebrewDate'
import { ILesson } from '../interfaces'
import { timetable_example } from '../timetable_sample'

const ChangesPage = () => {
  const lessons = timetable_example as ILesson[][]
  const changes = useChanges(lessons)

  return (
    <Layout className="overflow-hidden flex flex-col">
      <PageTitle title="שינויים" />
      <div className="flex flex-col px-5">
        {changes.map(
          (day, dayIndex) =>
            day.length > 0 && (
              <div className="flex flex-col" key={dayIndex}>
                <p className="font-semibold text-lg">{`יום ${HEBREW_DAYS[dayIndex]}`}</p>
                <div className="flex flex-col gap-2">
                  {day.map((hour, index) => (
                    <ChangesOfHour {...hour} key={index} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
      <Navbar />
    </Layout>
  )
}

export default ChangesPage

import { useCallback, useEffect, useState } from 'react'
import Button from '../../components/forms/Button'
import DayPick from '../../components/forms/DayPick'
import Input from '../../components/forms/Input'
import Layout from '../../components/Layout'
import SettingsPopup from '../../components/temp/settingsCreator/components/SettingsPopup'
import TempTimetable from '../../components/temp/settingsCreator/components/Timetable'
import appendScheduleSetting from '../../components/temp/settingsCreator/hooks/appendScheduleSetting'
import _appendScheduleSettings from '../../components/temp/settingsCreator/hooks/appendScheduleSetting'
import settingsToQuery from '../../components/temp/settingsCreator/hooks/settingsToQuery'
import useFullTimetable from '../../components/temp/settingsCreator/hooks/useFullTimetable'
import PageTitle from '../../components/ui/PageTitle'
import { DayOfWeek } from '../../interfaces'

const BASE_URL = '/api/timetable'

export default function SettingsExport() {
  const [studyGroups, setStudyGroups] = useState([])
  const [studyGroupMap, setStudyGroupMap] = useState(new Map())
  const [fulltimetable, updateFullTimeTable] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isSettingsPopupShown, showSettingsPopup] = useState(false)

  const [school, setSchool] = useState('460030')
  const [classId, setClassId] = useState('28')
  const [query, updateQuery] = useState(`school=${school}&classId=${classId}`)

  const requestTimeTable = useCallback(() => {
    setLoading(true)
    useFullTimetable(school, classId).then((res) => {
      updateFullTimeTable(res)
      setLoading(false)
    })
  }, [school, classId])

  useEffect(() => {
    setStudyGroups([])
    setStudyGroupMap(new Map())
  }, [school, classId])

  const handleLessonChange = useCallback(
    (info) => {
      const { day, hour, subject, teacher } = info
      _appendScheduleSettings(studyGroups, setStudyGroups, setStudyGroupMap, {
        day: day,
        hour: hour,
        subject: subject,
        teacher: teacher,
      })
    },
    [appendScheduleSetting, studyGroups]
  )

  const [date, updateDay] = useState(0 as DayOfWeek)

  const resetStudyGroups = async () => {
    for (let i = 0; i < 3; i++) {
      for (let day in fulltimetable) {
        updateDay(Number(day) as DayOfWeek)
        await setTimeout(() => {}, 200)
      }
    }
  }

  useEffect(() => {
    resetStudyGroups()
  }, [fulltimetable])

  const useQuery = () =>
    updateQuery(
      settingsToQuery({
        school: school,
        classId: classId,
        studyGroups: studyGroups,
        studyGroupsMap: studyGroupMap,
      })
    )

  return (
    <Layout className="font-temp w-screen h-screen overflow-x-hidden">
      {isSettingsPopupShown && (
        <SettingsPopup BASE_URL={BASE_URL} query={query} />
      )}

      {isSettingsPopupShown && (
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => showSettingsPopup(false)}
        ></div>
      )}

      <PageTitle title="יצירת הגדרות" />
      <div className="flex flex-col gap-5 p-4">
        <div className="flex gap-5">
          <Input
            value={'460030'}
            hint={'סמל מוסד'}
            onChange={(school) => setSchool(school)}
            className="w-[80%] z-0"
          />
          <Input
            value={'28'}
            hint={'כיתה'}
            onChange={(classId) => setClassId(classId)}
            className="z-0"
          />
        </div>
        <Button className="mx-0 my-0" onClick={() => requestTimeTable()}>
          בקשת מערכת
        </Button>

        {!isLoading && (
          <div className="flex flex-col gap-5">
            <DayPick
              day={date}
              onChange={(index) => updateDay(index)}
            ></DayPick>
            <div>
              <TempTimetable
                onChange={handleLessonChange}
                timetable={fulltimetable}
                day={date}
              />
            </div>

            <Button
              className="m-0"
              onClick={() => {
                useQuery()
                showSettingsPopup(true)
              }}
            >
              יצירת הגדרות
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

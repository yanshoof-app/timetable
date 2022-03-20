import { useCallback, useEffect, useState } from 'react'
import DayPick from '../../components/forms/DayPick'
import Layout from '../../components/Layout'
import TempTimetable from '../../components/temp/settingsCreator/components/Timetable'
import appendScheduleSetting from '../../components/temp/settingsCreator/hooks/appendScheduleSetting'
import _appendScheduleSettings from '../../components/temp/settingsCreator/hooks/appendScheduleSetting'
import useFullTimetable from '../../components/temp/settingsCreator/hooks/useFullTimetable'
import { DayOfWeek } from '../../interfaces'

export default function SettingsExport() {
  const [studyGroups, setStudyGroups] = useState([])
  const [studyGroupMap, setStudyGroupMap] = useState(new Map())
  const [fulltimetable, updateFullTimeTable] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    useFullTimetable('460030', '1').then((res) => {
      updateFullTimeTable(res)
      setLoading(false)
    })
  }, [])

  const handleLessonChange = useCallback(
    (ITempAppendSetting) => {
      const { day, hour, subject, teacher, studyGroups } = ITempAppendSetting
      _appendScheduleSettings(studyGroups, setStudyGroups, setStudyGroupMap, {
        day: day,
        hour: hour,
        subject: subject,
        teacher: teacher,
      })
    },
    [appendScheduleSetting]
  )

  console.log(studyGroups)
  console.log(studyGroupMap)

  const [date, updateDay] = useState(0 as DayOfWeek)

  return (
    <Layout className="flex flex-col gap-5 font-temp p-5">
      <DayPick day={date} onChange={(index) => updateDay(index)}></DayPick>

      <div>
        {!isLoading && (
          <TempTimetable
            onChange={handleLessonChange}
            timetable={fulltimetable}
            day={date}
          />
        )}
      </div>
    </Layout>
  )
}

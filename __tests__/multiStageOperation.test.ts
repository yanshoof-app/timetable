import { ClassLookup, fetchDataSource } from '../utils'
import { TeacherTimetableQuery } from '../utils/multi-stage/TeacherTimetableQuery'

describe('Tests multi stage operations', () => {
  let grades = [],
    classIds = [] // mock given from client
  const school = '460030',
    teacherName = 'טיראן חוה'

  it('Fetches classes', async () => {
    const { Classes } = await fetchDataSource('classes', school, 0)
    const classLookup = new ClassLookup(Classes)
    grades = classLookup.grades
    classIds = classLookup.classIds
  })

  it('Fetches teacher timetable', async () => {
    const query = new TeacherTimetableQuery(
      school,
      teacherName,
      grades,
      classIds
    )
    query.on('delay', () => {
      console.log('The query will take a little longer...')
    })
    query.on('error', (code) => {
      console.log('Ran into error with error code', code)
    })
    query.on('newChange', (day, hour, mod) => {
      console.log('modification found!', day, hour, mod)
    })
    query.on('newLesson', (day, hour, lesson) => {
      console.log('lesson found!', day, hour, lesson)
    })
    query.on('ready', (timetable) => {
      console.log('Done!', timetable)
    })
    await query.begin()
  })
})

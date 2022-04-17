import { ClassLookup, fetchDataSource } from '../utils'
import { TeacherListQuery } from '../utils/multi-stage/TeacherListQuery'
import axios from 'axios'

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('tests the teacher lookup method', () => {
  jest.setTimeout(40000)

  let grades: number[] = [],
    classIds: number[][] = [] // mock given from client
  const school = '460030'

  it('Fetches classes', async () => {
    const { Classes } = await fetchDataSource('classes', school, 0)
    const classLookup = new ClassLookup(Classes)
    grades = classLookup.grades
    classIds = classLookup.classIds
  })

  it('Builds teacher list of school', async () => {
    const query = new TeacherListQuery(school, classIds, grades)
    query.on('delay', () => {
      console.log('The query will take a little longer...')
    })
    query.on('error', (code) => {
      console.log('Ran into error with error code', code)
    })
    query.on('teacherAdded', (teacher) => {
      console.log('Teacher found', teacher)
    })
    query.on('ready', (teachers) => {
      console.log('Done!', teachers)
    })
    await query.begin()
  })
})

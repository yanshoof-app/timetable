import {
  IScheduleResponse,
  IChangesResponse,
  fetchDataSource,
  IscoolDate,
} from '@yanshoof/iscool'
import {
  initMatrix,
  FullTimeable,
  ServerTimetable,
  ChangeableTimetable,
} from '../utils'
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
  SETTINGS,
  OSHRI_SETTINGS,
  SAMPLE_EVENT,
  SAMPLE_ADDITION,
  PROBLEMATIC_SETTINGS,
  PROBLEMATIC_CHANGE,
} from '../utils/sample-constants'
import axios from 'axios'
import { IscoolSettings } from '../utils/settings/IscoolSettings'
import { IChange, ILesson, LessonModification } from '@yanshoof/types'

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Test build schedule routine', () => {
  let scheduleResponse: IScheduleResponse
  let changesResponse: IChangesResponse
  let lessons: ILesson[][]

  it('Initializes a matrix', () => {
    const result = initMatrix(5, 8)
    expect(result.length).toEqual(5)
    expect(result[0].length).toEqual(8)
  })

  it('Fetches schedule from server', async () => {
    scheduleResponse = await fetchDataSource<IScheduleResponse>(
      'schedule',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    )
    expect(scheduleResponse.ClassId).toEqual(YUD_7_ID)
  })

  it('Creates a weekly schedule from it', () => {
    const schedule = new FullTimeable().fromSchedule(scheduleResponse.Schedule)
    expect(schedule.lessons.length).toEqual(7)
    expect(schedule.lessons[0][1][0].teacher).toBeDefined()
    expect(schedule.lessons[0][1][0].subject).toBeDefined()
  })

  it('Fetches changes from the server', async () => {
    changesResponse = await fetchDataSource<IChangesResponse>(
      'changes',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    )
    expect(changesResponse.ClassId).toEqual(YUD_7_ID)
  })

  it('Creates an individual weekly schedule from it', () => {
    const settings = new IscoolSettings(SETTINGS)
    const timetable = new ServerTimetable(settings)
    timetable.fromSchedule(scheduleResponse.Schedule)
    lessons = timetable.lessons
    expect(timetable.lessons[5][3]).toStrictEqual({})
    expect(timetable.lessons[0][1].subject).toEqual(SETTINGS.studyGroups[0][0])
    expect(timetable.lessons[1][4].subject).toEqual(SETTINGS.studyGroups[3][0])
    timetable.applyChanges(changesResponse.Changes)
    if (changesResponse.Changes.length) {
      const { Date, Hour } = changesResponse.Changes[0]
      const day = new IscoolDate(Date).day
      expect(
        timetable.lessons[day][Hour].changes ||
          timetable.lessons[day][Hour].otherChanges
      ).toBeDefined()
    }
    console.log(JSON.stringify(timetable, null, 2))
  })

  it('Creates a different individual weekly schedule from it', () => {
    const settings = new IscoolSettings(OSHRI_SETTINGS)
    const schedule = new ServerTimetable(settings).fromSchedule(
      scheduleResponse.Schedule
    )
    expect(schedule.lessons[5][3]).toStrictEqual({})
    expect(schedule.lessons[0][1].subject).toEqual(
      OSHRI_SETTINGS.studyGroups[0][0]
    )
    expect(schedule.lessons[1][4].subject).toEqual(
      OSHRI_SETTINGS.studyGroups[3][0]
    )
  })

  it('Handles events', () => {
    const schedule = new ChangeableTimetable(lessons, [SAMPLE_EVENT])
    const events = schedule.lessons[SAMPLE_EVENT.day][SAMPLE_EVENT.hour].events
    expect(events).toBeDefined()
    expect(events.length).toBe(1)
    expect(events[0]).toBe(SAMPLE_EVENT.modData)
  })

  it('Handles changes of study groups not in the current hour with others changes shown', () => {
    const schedule = new ChangeableTimetable(lessons, [SAMPLE_ADDITION])
    const othersChanges =
      schedule.lessons[SAMPLE_ADDITION.day][SAMPLE_ADDITION.hour].otherChanges
    expect(othersChanges).toBeDefined()
    expect(othersChanges.length).toBe(1)
    expect(othersChanges[0].subject).toBe(SAMPLE_ADDITION.subject)
    expect(othersChanges[0].modData).toBe(SAMPLE_ADDITION.modData)
  })

  it('Handles changes of study groups not in the current hour with others changes hidden', () => {
    const settings = new IscoolSettings(PROBLEMATIC_SETTINGS)
    const { lessons } = new ServerTimetable(settings).fromSchedule(
      scheduleResponse.Schedule
    )
    const schedule = new ChangeableTimetable(lessons, [PROBLEMATIC_CHANGE])
    const othersChanges =
      schedule.lessons[PROBLEMATIC_CHANGE.day][PROBLEMATIC_CHANGE.hour]
        .otherChanges
    expect(othersChanges).toBeUndefined()
  })
})

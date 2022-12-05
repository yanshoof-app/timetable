import {
  IScheduleResponse,
  IChangesResponse,
  fetchDataSource,
  IscoolDate,
  ILessonArrMemberIscool,
} from '@yanshoof/iscool'
import { initMatrix, FullTimeable, ServerTimetable } from '../utils'
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
  SETTINGS,
  OSHRI_SETTINGS,
} from '../utils/sample-constants'
import axios from 'axios'
import { IscoolSettings } from '../utils/settings/IscoolSettings'
import { ILesson } from '@yanshoof/types'
import {
  fulltimetable_example,
  mashov_studyGroups_example,
  mashov_timetable_example,
} from '../timetable_sample'
import { MashovStudyGroupImporter } from '../utils/settings/MashovStudyGroup'

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('', () => {
  it('', () => {
    /*const result = initMatrix(5, 8)
    expect(result.length).toEqual(5)
    expect(result[0].length).toEqual(8)*/
    const studyGroupBuilder = new MashovStudyGroupImporter(
      mashov_timetable_example,
      mashov_studyGroups_example
    )

    console.log(
      studyGroupBuilder.fromSchedule(
        fulltimetable_example as ILessonArrMemberIscool[]
      )
    )
  })
})

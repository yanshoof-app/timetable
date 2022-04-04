import { useCallback, useState } from 'react'
import { ILesson } from '../interfaces'
import { timetable_example } from '../timetable_sample'
import { Timetable } from '../utils'

describe('Test change applying hook', () => {
  /*
  it('set the hook', () => {
    //sample data
    const showOthersChanges = true
    const updates = {
      data: { newChanges: [], newEvents: [] },
      isLoading: false,
    }
    const [lessonMatrix, setLessonMatrix] = useState(
      timetable_example as ILesson[][]
    )

    const applyUpdates = useCallback(() => {
      const { newChanges, newEvents } = updates.data
      if (lessonMatrix.length && !updates.isLoading) {
        const timetable = new Timetable(lessonMatrix, showOthersChanges)
        if (newChanges)
          timetable.applyExistingChanges([...newChanges, ...newEvents])
        setLessonMatrix(timetable.lessons)
      }
    }, [updates, lessonMatrix, showOthersChanges])
  })
  */

  it('create time table object', () => {
    //sample data
    const lessonMatrix = timetable_example as ILesson[][]
    const showOthersChanges = true

    const timetable = new Timetable(lessonMatrix, showOthersChanges)
  })
})

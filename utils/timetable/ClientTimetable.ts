import { IChange, ILesson } from '@yanshoof/types'
import { ChangeableTimetable } from './ChangeableTimetable'

/**
 * Represents a class made fully for the client
 */
export class ClientTimetable extends ChangeableTimetable {
  /**
   * Constructs a new ClientTimetable object
   * @param lessons the lessons to use
   * @param changes the changes to apply to self
   * @param othersChanges the changes to apply to others
   * @param events the events to apply
   */
  constructor(
    lessons: ILesson[][],
    changes: IChange[] | undefined,
    othersChanges: IChange[] | undefined,
    events: IChange[] | undefined
  ) {
    super([...lessons]) // force rerender
    changes ||= []
    othersChanges ||= []
    events ||= []
    this.handleChanges(changes, othersChanges, events)
  }
}

import {
  IChangeIscool,
  ILesson,
  ILessonArrMemberIscool,
  IScheduleSettings,
  ITeacherLesson,
  ITimetable,
} from '../../interfaces';
import { ISCOOL } from '..';
import { initMatrix } from '..';

/**
 * A Timetable class capable of reading settings and changes
 * @author Itay Oshri
 * @version 2022.0.0
 */
export class TeacherTimetable implements ITimetable<ITeacherLesson> {
  static readonly DAYS_IN_WEEK = 7;
  static readonly HOURS_OF_SCHEDULE = 13; // change if needed
  static readonly COMMON_TEACHER = '';
  readonly lessons: ITeacherLesson[][];
  private commonTeacher: string;

  /**
   * Creates a timetable object with given settings
   * @param settings the schedule settings object, determining which lesson of multiple will be used
   */
  constructor(commonTeacher: string) {
    // initialize array
    this.lessons = initMatrix<ITeacherLesson>(
      TeacherTimetable.DAYS_IN_WEEK,
      TeacherTimetable.HOURS_OF_SCHEDULE
    );
    this.commonTeacher = commonTeacher;
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    for (let lesson of schedule) {
      const day = lesson.Day;
      const hourIndex = lesson.Hour; // 0 hours are possible as well.

      if (this.lessons[day][hourIndex].subject)
        // lesson already defined
        continue;
      // multiple lessons at same hour (i.e - math).
      // find lesson whose study group is present in the settings
      const groupIndex = lesson.Lessons.findIndex(
        element => element.Teacher === this.commonTeacher
      );
      /*studyGroupMap.get([day, hourIndex].join(','));*/
      if (groupIndex == -1) {
        // window at the current hour
        this.lessons[day][hourIndex] = {} as ILesson;
        continue;
      }

      const group = ISCOOL.toTeacherLesson(lesson.Lessons[groupIndex]);

      this.lessons[day][hourIndex] = group;
      /*
      this.lessons[day][hourIndex] = hourlyLessons.find(
        ({ subject, teacher }: ILesson) => {
          const match = group[0] == subject && group[1] == teacher;
          // if (match) console.log(day, hourIndex, ...group);
          return match;
        }
      );
      */
    } // end of for

    return this;
  }

  /**
   * Apply changes to the array of lessons
   * @param changes the list of changes as retrieved from the Iscool API
   * @example
   * const timetable = new Timetable(settings).fromIscool(schedule);
   * timetable.applyChanges(changes);
   */
  public applyChanges(changes: IChangeIscool[]) {
    for (let changeObj of changes) {
      const modification = ISCOOL.toModification(changeObj);
      const day = ISCOOL.toDate(changeObj.Date).getDay();
      const hour = changeObj.Hour;

      // compare study groups - is it a relevent change?
      const { Teacher: changeTeacher, Subject: changeSubject } =
        changeObj.StudyGroup;
      const lesson = this.lessons[day][hour];
      if (
        this.commonTeacher == changeTeacher &&
        lesson.subject == changeSubject
      )
        this.lessons[day][hour] = { ...lesson, ...modification };
    }
  }
}

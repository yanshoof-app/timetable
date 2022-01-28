import { ILesson, IScheduleSettings } from '../../interfaces';
import { ISCOOL } from '..';
import { initMatrix } from '..';
import { IChangeIscool, ILessonArrMemberIscool, ITimetable } from './types';

/**
 * A Timetable class capable of reading settings and changes
 * @author Itay Schechner
 * @version 2022.0.0
 */
export class Timetable implements ITimetable<ILesson> {
  static readonly DAYS_IN_WEEK = 7;
  static readonly HOURS_OF_SCHEDULE = 13; // change if needed
  readonly lessons: ILesson[][];
  private settings: IScheduleSettings;

  /**
   * Creates a timetable object with given settings
   * @param settings the schedule settings object, determining which lesson of multiple will be used
   */
  constructor(settings: IScheduleSettings) {
    // initialize array
    this.lessons = initMatrix<ILesson>(
      Timetable.DAYS_IN_WEEK,
      Timetable.HOURS_OF_SCHEDULE
    );
    this.settings = settings;
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    const { studyGroups, studyGroupMap } = this.settings;
    for (let lesson of schedule) {
      const day = lesson.Day;
      const hourIndex = lesson.Hour; // 0 hours are possible as well.
      const hourlyLessons = lesson.Lessons.map(ISCOOL.toLesson);

      if (!studyGroupMap.has([day, hourIndex].join(','))) {
        this.lessons[day][hourIndex] = hourlyLessons[0];
        continue;
      }

      // multiple lessons at same hour (i.e - math).
      // find lesson whose study group is present in the settings
      const groupIndex = studyGroupMap.get([day, hourIndex].join(','));
      if (groupIndex == -1) {
        // window at the current hour
        this.lessons[day][hourIndex] = {} as ILesson;
        continue;
      }

      const group = studyGroups[groupIndex];
      this.lessons[day][hourIndex] = hourlyLessons.find(
        ({ subject, teacher }: ILesson) => {
          const match = group[0] == subject && group[1] == teacher;
          // if (match) console.log(day, hourIndex, ...group);
          return match;
        }
      );
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
    const { showOthersChanges } = this.settings;
    for (let changeObj of changes) {
      const modification = ISCOOL.toModification(changeObj);
      const day = ISCOOL.toDate(changeObj.Date).getDay();
      const hour = changeObj.Hour;

      // compare study groups - is it a relevent change?
      const { Teacher: changeTeacher, Subject: changeSubject } =
        changeObj.StudyGroup;
      const lesson = this.lessons[day][hour];
      if (lesson.teacher == changeTeacher && lesson.subject == changeSubject)
        this.lessons[day][hour] = { ...lesson, ...modification };
      else if (showOthersChanges) {
        this.lessons[day][hour].otherChanges ||= [];
        this.lessons[day][hour].otherChanges.push({
          ...modification,
          teacher: changeTeacher,
          subject: changeSubject,
        });
      }
    }
  }
}

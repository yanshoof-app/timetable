import { ILesson } from '../../interfaces';
import { ISCOOL } from '../iScool';
import { IChangeIscool } from './types';

export function applyChanges(
  schedule: ILesson[][],
  changes: IChangeIscool[],
  showOtherChanges: boolean
): ILesson[][] {
  // since changes are ordered by date & hour for some reason, we can write more efficient code:
  changes.forEach((changeObj: IChangeIscool) => {
    const modification = ISCOOL.toModification(changeObj);
    const day = changeObj.Date.getDay();
    const hour = changeObj.Hour;

    // compare study groups - is it a relevent change?
    const { Teacher: changeTeacher, Subject: changeSubject } =
      changeObj.StudyGroup;
    const lesson = schedule[day][hour] || ({} as ILesson);
    if (lesson.teacher == changeTeacher && lesson.subject == changeSubject)
      schedule[day][hour] = { ...lesson, ...modification };
    else if (showOtherChanges) {
      schedule[day][hour] ||= {} as ILesson;
      schedule[day][hour].otherChanges ||= [];
      schedule[day][hour].otherChanges.push(modification);
    }
  });

  return schedule;
}

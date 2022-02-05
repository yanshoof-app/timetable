import { stringify } from 'querystring';
import {
    ILessonArrMemberIscool,
    ITimetable,
  } from '../../interfaces';
import { ITeacherList } from '../../interfaces/teacherList';
  
  /**
   * A class that its objects contains a teacher list
   * @author Itay Oshri
   * @version 2022.0.0
   */
  export class TeacherList implements ITeacherList {
      teachers: string[];
    public fromIscool(schedule: ILessonArrMemberIscool[]) {
        let teachersSet = new Set<string>();
        for (let lesson of schedule) {
            lesson.Lessons.forEach(studyGroup => {
                if(studyGroup.Teacher !== ''){
                    teachersSet.add(studyGroup.Teacher);
                }
            });
        }
        this.teachers = Array.from(teachersSet);
        return this;
    }
    

  }
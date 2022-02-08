
import axios from 'axios';
import { IClassesResponse, IScheduleResponse } from '../interfaces';
import { ClassLookup, fetchDataSource, FullTimeable } from '../utils';
import { AMI_ASSAF_SYMBOL } from '../utils/sample-constants';
let classResponse: IClassesResponse;
let scheduleResponse: IScheduleResponse;
let scools: string[];


describe('Tests the class lookup result class', () => {
    jest.setTimeout(3000000)
  it('Fetches data from the server', async () => {
    const url = "https://web.mashov.info/api/schools";
    const smalim = await (await axios.get(url)).data;
    scools = [];
    smalim.forEach(semel => {
        scools.push(semel.semel);
    });
  });


  /*it('Fetches schedule from server', async () => {
    let longest_lesson = "";
    classResponse = await fetchDataSource<IClassesResponse>(
        'classes',
        AMI_ASSAF_SYMBOL,
        0
    );
    const classes = new ClassLookup(classResponse.Classes);
    for (let grade of classes.classIds){
        for (let classId of grade){
            if(classId.toString() === '-1'){continue};
            scheduleResponse = await fetchDataSource<IScheduleResponse>(
                'schedule',
                AMI_ASSAF_SYMBOL,
                classId.toString()
            );
            const schedule = new FullTimeable().fromIscool(scheduleResponse.Schedule);
            for(let lesson of schedule.lessons){
                for(let hour of lesson){
                    if(!hour[0]){continue};
                    for(let studyGroup of hour){
                        const thisLesson = studyGroup.subject + ' ' + studyGroup.teacher;
                        if(thisLesson.length>longest_lesson.length){
                            longest_lesson = thisLesson;
                            console.log(longest_lesson);
                        }

                    }

                }
            }
        }
        

    }
  });*/

  it('Builds a class lookup array from it', async () => {
    let counter = 0;
    let longest_lesson: {lesson: String, school: String, length: Number};
    longest_lesson = {lesson: "", school: "", length: "".length};

    for (let school of scools) {
        classResponse = await fetchDataSource<IClassesResponse>(
            'classes',
            school,
            0
        );
        if(classResponse.Status.toLowerCase() === 'success'){
            if(!classResponse.Classes[0]){continue;};
            const classes = new ClassLookup(classResponse.Classes);
            for (let grade of classes.classIds){
                for (let classId of grade){
                    if(classId.toString() === '-1'){continue};
                    scheduleResponse = await fetchDataSource<IScheduleResponse>(
                        'schedule',
                        school,
                        classId.toString()
                    );
                    const schedule = new FullTimeable().fromIscool(scheduleResponse.Schedule);
                    
                    for(let lesson of schedule.lessons){
                        for(let hour of lesson){
                            if(!hour[0]){continue};
                            for(let studyGroup of hour){
                                const length = (studyGroup.subject + ' ' + studyGroup.teacher).length;
                                const thisLesson = {lesson: studyGroup.subject + ' ' + studyGroup.teacher, school: school, length: length};
                                if(thisLesson.length>longest_lesson.length){
                                    longest_lesson = thisLesson;

                                }
                            }
                        }
                    }
                    console.log(longest_lesson);
                }
            }
        }
    }
    });
});
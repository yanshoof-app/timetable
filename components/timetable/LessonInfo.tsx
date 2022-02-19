import { ILesson } from '../../interfaces'
import InfoLine from './InfoLine'

export default function LessonInfo(info: ILesson) {
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <InfoLine
        info={info.subject}
        newInfo={info.modification === 5 ? info.modData.toString() : ''}
        bold={true}
        changed={info.modification === 1 || info.modification === 2}
      />
      <InfoLine
        info={info.teacher}
        newInfo={info.modification === 3 ? info.modData.toString() : ''}
        changed={info.modification === 1 || info.modification === 3}
      />
      {info.class && (
        <InfoLine
          info={info.class}
          newInfo={info.modification === 4 ? info.modData.toString() : ''}
          bold={true}
          changed={info.modification === 1 || info.modification === 4}
        />
      )}
    </div>
  )
}

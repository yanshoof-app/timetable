import ShadowedWrapper from '../../ui/ShadowedWrapper'

const timetable = [true, true, true, true, true, true, true, true, true]

function InfoLine(width: { width: string }) {
  return <div className={`${width.width} h-3 bg-gray-400`}></div>
}

function LessonInfo() {
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <InfoLine {...{ width: 'w-44' }}></InfoLine>
      <InfoLine {...{ width: 'w-28' }}></InfoLine>
      <InfoLine {...{ width: 'w-14' }}></InfoLine>
    </div>
  )
}

function Lesson() {
  return (
    <ShadowedWrapper
      color={'gray'}
      className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] items-center justify-start animate-pulse"
    >
      <p className="h-6 w-5 bg-gray-400"></p>
      <LessonInfo />
    </ShadowedWrapper>
  )
}
export default function LoadingTimetable() {
  return (
    <div className={`flex flex-col gap-[1rem]`}>
      {timetable.map((lesson, index) => (
        <Lesson key={index}></Lesson>
      ))}
    </div>
  )
}

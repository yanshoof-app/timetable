import { useStorage } from '../contexts/Storage'

export default function useLessonsOfStudyGroup(studyGroupId: number) {
  const hours = []
  const { studyGroupMap } = useStorage()
  const studyGroupKeys = Array.from(studyGroupMap) //TODO: Make it more clear and efficient
    .filter((elm) => elm[1] == studyGroupId)
    .map((elm) => elm[0].split(',').map((elm) => Number(elm)))
  for (let day = 0; day < 7; day++) {
    hours.push(
      studyGroupKeys.filter((key) => key[0] == day).map((key) => key[1])
    )
  }

  return hours
}

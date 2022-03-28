import Link from 'next/link'
import { IStudyGroup } from '../../interfaces'
import { ForwardRTL } from '../icons'
import ShadowedWrapper from '../ui/ShadowedWrapper'

export default function StudyGroupsBox({
  studyGroups,
}: {
  studyGroups: string[][]
}) {
  const BASE_URL = '/settings/studyGroup'
  return (
    <ShadowedWrapper className="rounded-xl">
      {studyGroups.map((studyGroup, index) => (
        <div
          className="flex justify-between  items-center border-t-2 first:border-0 py-2 px-5 border-uiPrimary-300"
          key={index}
        >
          <Link href={`${BASE_URL}/${index}`}>
            <p className="font-semibold w-full">{studyGroup[0]}</p>
          </Link>
          <ForwardRTL height={16} className={'fill-zinc-400'} />
        </div>
      ))}
    </ShadowedWrapper>
  )
}

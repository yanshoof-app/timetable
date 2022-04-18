import Link from 'next/link'
import { useStorage } from '../../../contexts/Storage'
import useActiveStudyGroups from '../../../hooks/useActiveStudyGroups'
import { ForwardRTL } from '../../icons'
import ShadowedWrapper from '../../ui/ShadowedWrapper'

const BASE_URL = '/settings/studyGroup'
export default function StudyGroupBox() {
  const { studyGroups } = useStorage()
  const activeStudyGroups = useActiveStudyGroups()
  return (
    <ShadowedWrapper className="rounded-xl">
      {studyGroups &&
        studyGroups.map((studyGroup, index) =>
          activeStudyGroups.has(index) ? (
            <div
              className="flex justify-between items-center border-t-2 first:border-0 py-2 px-5 border-uiPrimary-300 dark:border-gray-700 cursor-pointer"
              key={index}
            >
              <Link href={`${BASE_URL}/${index}`} passHref>
                <p className="font-semibold w-full">{studyGroup[0]}</p>
              </Link>
              <ForwardRTL height={16} className={'fill-zinc-400'} />
            </div>
          ) : null
        )}
    </ShadowedWrapper>
  )
}

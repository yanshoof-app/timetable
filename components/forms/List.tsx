import Link from 'next/link'
import { ReactNode } from 'react'
import { useStorage } from '../../contexts/Storage'
import { Clear } from '../icons'

export default function List({
  list,
  showHistory,
  query,
  PATH,
  onListEnd: ListEnd,
}: {
  list: string[]
  showHistory: boolean
  query: string
  PATH: string
  onListEnd: ReactNode
}) {
  const { teacherSearchHistory, setTeacherSearchHistory } = useStorage()

  return (
    <div className="flex flex-col gap-2 rounded-lg font-semibold px-4 py-3 w-full h-full overflow-y-scroll bg-white dark:bg-slate-900">
      {showHistory &&
        [...teacherSearchHistory].map((element, index) => (
          <div className="flex justify-between text-primary-500" key={index}>
            <Link href={`${PATH}/${element}`}>{element}</Link>
            <button
              className="font-semibold "
              onClick={() =>
                setTeacherSearchHistory((prev) => {
                  const set = new Set(prev)
                  set.delete(element)
                  return set
                })
              }
            >
              <Clear width={20} className="fill-black" />
            </button>
          </div>
        ))}
      {list
        .filter(
          (teacher) =>
            teacher.includes(query) &&
            !(showHistory && [...teacherSearchHistory].includes(teacher))
        )
        .map((element, index) => (
          <Link href={`${PATH}/${element}`} key={index}>
            <a
              onClick={() => {
                if (query !== '')
                  setTeacherSearchHistory((prev) => new Set(prev).add(element))
              }}
              className="dark:text-gray-300"
            >
              {element}
            </a>
          </Link>
        ))}
      {ListEnd}
    </div>
  )
}

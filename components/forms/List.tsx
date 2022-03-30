import Link from 'next/link'
import { useStorage } from '../../contexts/Storage'

export default function List({
  list,
  showHistory,
  query,
  PATH,
}: {
  list: string[]
  showHistory: boolean
  query: string
  PATH: string
}) {
  const { teacherSearchHistory, setTeacherSearchHistory } = useStorage()

  return (
    <div className="flex flex-col gap-2 rounded-lg font-semibold px-4 py-3 w-full h-full overflow-y-scroll bg-white">
      {showHistory &&
        [...teacherSearchHistory].map((element, index) => (
          <div className="flex justify-between" key={index}>
            <Link href={`${PATH}/${element}`}>{element}</Link>
            <button
              className="font-semibold text-primary-500"
              onClick={() =>
                setTeacherSearchHistory((prev) => {
                  const set = new Set(prev)
                  set.delete(element)
                  return set
                })
              }
            >
              נקה
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
              onClick={() =>
                setTeacherSearchHistory((prev) => new Set(prev).add(element))
              }
            >
              {element}
            </a>
          </Link>
        ))}
    </div>
  )
}

import Link from 'next/link'

export default function List({
  list,
  historyList,
  showHistory,
  query,
  PATH,
  onClear = (index) => {},
}: {
  list: string[]
  historyList: string[]
  showHistory: boolean
  query: string
  PATH: string
  onClear?(index: number): unknown
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg font-semibold px-4 py-3 w-full h-full overflow-y-scroll bg-white">
      {showHistory &&
        historyList.map((element, index) => (
          <div className="flex justify-between" key={index}>
            <Link href={`${PATH}/${element}`}>{element}</Link>
            <button
              className="font-semibold text-primary-500"
              onClick={() => onClear(index)}
            >
              נקה
            </button>
          </div>
        ))}
      {list
        .filter(
          (teacher) =>
            teacher.includes(query) &&
            !(showHistory && historyList.includes(teacher))
        )
        .map((element, index) => (
          <Link href={`${PATH}/${element}`} key={index}>
            {element}
          </Link>
        ))}
    </div>
  )
}

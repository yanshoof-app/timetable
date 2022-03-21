import Link from 'next/link'
import Button from '../../../forms/Button'
import { Copy } from '../../../icons'

export default function SettingsPopup({
  BASE_URL,
  query,
}: {
  BASE_URL: string
  query: string
}) {
  return (
    <div className="w-full h-[50%] px-5 fixed z-10 top-0 bottom-0 m-auto">
      <div className="bg-white ltr p-3 flex flex-col gap-3 w-full h-full shadow-lg shadow-black/20 rounded-xl">
        <div
          className=" absolute "
          onClick={() => navigator.clipboard.writeText(query)}
        >
          <Copy
            width={30}
            className="bg-white p-1 rounded-r-md cursor-pointer"
          />
        </div>
        <div className="flex bg-gray-200 w-full h-[50%] grow p-2 ">
          <p className="p max-w-fit break-words text-ellipsis overflow-hidden">
            {query}
          </p>
        </div>
        <Link href={`/${BASE_URL}?${query}`}>בקש מערכת עם שינויים</Link>
      </div>
    </div>
  )
}

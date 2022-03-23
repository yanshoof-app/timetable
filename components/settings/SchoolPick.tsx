import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import useDebounce from '../../hooks/useDebounce'
import { useHTTP } from '../../hooks/useHTTP'
import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import Layout from '../Layout'

export default function SchoolPick() {
  const { setSchool } = useStorage()
  const [tempSchool, setTempSchool] = useState({ name: '', symbol: 0 })

  const [search, newSearch] = useState('0')
  const debouncedSearch = useDebounce(search, 1000)

  const results = useSchoolSearch(debouncedSearch)
  const [showResults, openResults] = useState(false)
  useEffect(() => openResults(true), [results])

  const options = useMemo(() => results.map((result) => result.name), [results])

  return (
    <Layout className="flex flex-col p-5 h-screen justify-center items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <p className="font-bold text-4xl">ברוכים הבאים!</p>
        <p className="font-bold text-2xl">באיזה בית ספר אתם לומדים?</p>
      </div>
      <div className="flex w-full justify-center gap-3">
        <div className="flex grow flex-col relative">
          <Input
            value={tempSchool.name}
            hint="שם בית הספר או סמל מוסד"
            onChange={(input) => {
              newSearch(input)
            }}
            className={`${results[0] && showResults && 'rounded-b-none'}`}
            id={'gi'}
          />
          {results[0] && showResults && (
            <Dropdown
              options={options}
              selectedIndex={-1}
              setOpen={openResults}
              onClick={(index) => setTempSchool(results[index])}
            ></Dropdown>
          )}
        </div>
        <Button
          className="my-0 px-6 mx-0"
          onClick={() => setSchool(tempSchool.symbol.toString())}
        >
          הבא
        </Button>
      </div>
    </Layout>
  )
}

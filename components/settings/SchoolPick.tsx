import { useCallback, useEffect, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useHTTP } from '../../hooks/useHTTP'
import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import Layout from '../Layout'

export default function SchoolPick() {
  const { school, setSchool } = useStorage()
  const [search, newSearch] = useState('123456')
  const [debouncedSearch, newDebouncedSearch] = useState('עמי אסף')
  const [tempSchool, updateTempSchool] = useState({ name: '', symbol: -1 })

  const [showResults, openResults] = useState(false)

  const results = useSchoolSearch(debouncedSearch)
  /*const results = [
    { name: 'רונסון אשקלון', symbol: 123456 },
    { name: 'רק ביבי', symbol: 1234567 },
  ]*/

  useEffect(() => {
    clearTimeout()
    setTimeout(() => {
      newDebouncedSearch(search)
    }, 500)
  }, [search])

  useEffect(() => openResults(true), [debouncedSearch])

  return (
    <Layout className="flex flex-col p-5 h-screen justify-center items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <p className="font-bold text-4xl">ברוכים הבאים!</p>
        <p className="font-bold text-2xl">באיזה בית ספר אתם לומדים?</p>
      </div>
      <div className="flex w-full  justify-center gap-3">
        <div className="flex grow flex-col relative">
          <Input
            value=""
            hint="שם בית הספר או סמל מוסד"
            onChange={(input) => newSearch(input)}
            className={`${results[0] && showResults && 'rounded-b-none'}`}
          />
          {results[0] && showResults && (
            <Dropdown
              options={results.map((result) => result.name)}
              selectedIndex={-1}
              setOpen={openResults}
              changeSelectedIndex={() => {}}
              onChange={(index) => {
                updateTempSchool(results[index])
              }}
            ></Dropdown>
          )}
        </div>
        <Button
          className="my-0 px-6 mx-0"
          onClick={() => setSchool(tempSchool[1].toString())}
        >
          הבא
        </Button>
      </div>
    </Layout>
  )
}

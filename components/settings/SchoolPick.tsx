import { useEffect, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import Layout from '../Layout'

export default function SchoolPick() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedSchool,
    setSelectedIndex,
    showOptions,
  } = useSchoolSearch()
  const { setSchool } = useStorage()

  return (
    <Layout className="flex flex-col p-5 h-screen justify-center items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <p className="font-bold text-4xl">ברוכים הבאים!</p>
        <p className="font-bold text-2xl">באיזה בית ספר אתם לומדים?</p>
      </div>
      <div className="flex w-full justify-center gap-3">
        <div className="flex grow flex-col relative">
          <Input
            value={selectedSchool?.name || searchQuery}
            hint="שם בית הספר או סמל מוסד"
            onChange={(input) => {
              if (input != selectedSchool?.name) setSearchQuery(input)
            }}
            className={`${searchResults[0] && showOptions && 'rounded-b-none'}`}
            id={'gi'}
          />
          {searchResults[0] && showOptions && (
            <Dropdown
              options={searchResults}
              getOption={(result) => result.name}
              selectedIndex={-1}
              onClick={setSelectedIndex}
            />
          )}
        </div>
        <Button
          className="my-0 px-6 mx-0"
          onClick={() => setSchool(selectedSchool?.symbol?.toString())}
          disabled={!selectedSchool}
        >
          הבא
        </Button>
      </div>
    </Layout>
  )
}

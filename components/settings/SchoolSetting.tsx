import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import { ISchoolLookupResult } from '../../interfaces'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import LoadingScreen from '../ui/LoadingScreens'
import { SettingsComponent } from './types'

const SchoolSetting: SettingsComponent<ISchoolLookupResult> = ({ save }) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedSchool,
    setSelectedIndex,
    showOptions,
  } = useSchoolSearch()
  return searchResults ? (
    <div className="flex flex-col p-5 justify-center items-center gap-5">
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
          className="px-6"
          onClick={() => save(selectedSchool)}
          disabled={!selectedSchool}
        >
          הבא
        </Button>
      </div>
    </div>
  ) : (
    <LoadingScreen label="בתי ספר" />
  )
}

export default SchoolSetting
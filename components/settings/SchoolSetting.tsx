import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import { ISchoolLookupResult } from '../../interfaces'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import LoadingScreen from '../ui/LoadingScreens'
import Spinner from '../ui/LoadingScreens/Spinner'
import { SettingsComponent } from './types'

export interface ISchoolSettingProps {
  isEditing?: boolean
}

const SchoolSetting: SettingsComponent<
  ISchoolLookupResult,
  ISchoolSettingProps
> = ({ save, isEditing = false }) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedSchool,
    setSelectedIndex,
    showOptions,
    isLoading,
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
          {isLoading && (
            <Spinner className="absolute left-0 fill-gray-800 h-[24px] w-[24px] m-2" />
          )}
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
          {isEditing ? 'סיום' : 'הבא'}
        </Button>
      </div>
    </div>
  ) : (
    <LoadingScreen label="בתי ספר" />
  )
}

export default SchoolSetting

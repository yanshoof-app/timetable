import { useStorage } from '../../contexts/Storage'
import { useSchoolSearch } from '../../hooks/useSchoolSearch'
import Button from '../forms/Button'
import Dropdown from '../forms/DropdownPick/Dropdown'
import Input from '../forms/Input'
import { BackRTL } from '../icons'
import Layout from '../Layout'
import LoadingScreen from '../ui/LoadingScreens'
import PageTitle from '../ui/PageTitle'
import { SettingsPageProps } from './types'

export default function SchoolPick({ onBackPress }: SettingsPageProps) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedSchool,
    setSelectedIndex,
    showOptions,
  } = useSchoolSearch()
  const { setSchool, setSchoolName } = useStorage()

  return (
    <Layout
      className="px-4 flex flex-col justify-between"
      title="בחירת בית ספר"
    >
      {onBackPress && (
        <PageTitle
          title="בחירת כיתה"
          startIcon={BackRTL}
          onStartIconClick={() => {
            setSchool(selectedSchool?.symbol?.toString())
            setSchoolName(selectedSchool?.name?.toString())
            onBackPress()
          }}
        />
      )}
      {searchResults ? (
        <div className="flex flex-col p-5 justify-center overflow-hidden items-center gap-5 mb-[40vh]">
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
                className={`${
                  searchResults[0] && showOptions && 'rounded-b-none'
                }`}
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
              onClick={() => {
                setSchool(selectedSchool?.symbol?.toString())
                setSchoolName(selectedSchool?.name?.toString())
              }}
              disabled={!selectedSchool}
            >
              הבא
            </Button>
          </div>
        </div>
      ) : (
        <LoadingScreen label="בתי ספר" />
      )}
    </Layout>
  )
}

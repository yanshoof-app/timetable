import asPage from '../../components/settings/layout/asPage'
import OtherChangesSetting from '../../components/settings/OtherChangesSetting'

const OthersChangesSettingPage = asPage(
  OtherChangesSetting,
  { title: 'שינויים של אחרים' },
  ({ showOthersChanges, setOthersChangesPreference }, router) => ({
    value: showOthersChanges,
    save: (value) => {
      setOthersChangesPreference(value)
      router.push('/settings')
    },
  })
)

export default OthersChangesSettingPage

/*
export default function OthersChangesSetting() {
  const { back } = useBackPress('/settings')
  const { setOthersChangesPreference, showOthersChanges } = useStorage()
  const [selectedPreference, setSelectedPreference] =
    useState(showOthersChanges)
  return (
    <SettingsPageLayout
      title="שינויים של אחרים"
      onBackPress={() => {
        setOthersChangesPreference(selectedPreference)
        back()
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
          <OthersChangesExample
            onClick={() => setSelectedPreference(false)}
            variant={'hide'}
            className="h-fit"
          />
          <OthersChangesExample
            onClick={() => setSelectedPreference(true)}
            variant={'show'}
            className="h-[292.22px]" //TODO: Find a better method to make them same height
          />
        </div>
        <div className="flex justify-between px-[calc(25%-12px)] h-fit">
          <RadioButton
            selected={!selectedPreference}
            label={'הסתר'}
            onClick={() => setSelectedPreference(false)}
          />
          <RadioButton
            selected={selectedPreference}
            label={'הצג'}
            onClick={() => setSelectedPreference(true)}
          />
        </div>
      </div>
    </SettingsPageLayout>
  )
}
*/

import Layout from '../components/Layout'
import SettingsBox from '../components/settings/screen/SettingsBox'
import Navbar from '../components/ui/Navbar'

export default function Settings() {
  return (
    <Layout title="Settings">
      <div className="flex p-8">
        <SettingsBox
          color="primary"
          label="כיתה ובית ספר"
          value="י7, עמי אסף בית ברל"
          className="basis-1/2"
        />
      </div>

      <Navbar />
    </Layout>
  )
}

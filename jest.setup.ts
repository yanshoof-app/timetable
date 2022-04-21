// jest.setup.ts
import { loadEnvConfig } from '@next/env'

const setup = async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}

export default setup

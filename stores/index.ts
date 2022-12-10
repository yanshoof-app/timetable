import proxyWithPersist, { PersistStrategy } from "valtio-persist";
import { localStoragePersist } from "./presist";
import { gradeStateProxy } from "./state/grade";
import { prefrenceStateProxy } from "./state/prefrences";
import { schoolStateProxy } from "./state/school";
import { settingsStateProxy } from "./state/settings";
import { timetableStateProxy } from "./state/timetable";

export const state = proxyWithPersist({
    name: "appState",
  
    initialState: {
      schoolStateProxy,
      gradeStateProxy,
      prefrenceStateProxy,
      settingsStateProxy,
      timetableStateProxy
    },
  
    persistStrategies: PersistStrategy.MultiFile, // each Thing is it's own file on disk.
    getStorage: () => localStoragePersist,
    version: 0,
    migrations: {}
  });
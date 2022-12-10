import proxyWithPersist, { PersistStrategy } from "valtio-persist";
import { localStoragePersist } from "./presist";
import { classStateProxy } from "./state/class";
import { prefrenceStateProxy } from "./state/prefrences";
import { schoolStateProxy } from "./state/school";
import { settingsStateProxy } from "./state/settings";
import { timetableStateProxy } from "./state/timetable";

export const state = proxyWithPersist({
    name: "appState",
  
    initialState: {
      school: schoolStateProxy,
      class: classStateProxy,
      prefrences: prefrenceStateProxy,
      settings: settingsStateProxy,
      timetable: timetableStateProxy
    },
  
    persistStrategies: PersistStrategy.MultiFile, // each Thing is it's own file on disk.
    getStorage: () => localStoragePersist,
    version: 0,
    migrations: {}
  });
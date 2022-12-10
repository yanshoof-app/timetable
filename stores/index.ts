import proxyWithPersist, { PersistStrategy } from "valtio-persist";
import { localStoragePersist } from "./presist";
import { classStateProxy } from "./persisted/class";
import { prefrenceStateProxy } from "./persisted/prefrences";
import { schoolStateProxy } from "./persisted/school";
import { settingsStateProxy } from "./persisted/settings";
import { timetableStateProxy } from "./persisted/timetable";

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
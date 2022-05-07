import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["aniList"],
};

const initialState = {
  aniList: [],
  anmieInfo: 0,
  animeSearch: "",
};
const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ANIMELIST":
      return { ...state, aniList: state.aniList.concat(action.list) };
    case "SET_ANIMEINFO":
      return { ...state, anmieInfo: action.data };
    case "SET_ANIMESERACH":
      return { ...state, animeSearch: action.data };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, rootReducer);

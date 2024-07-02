// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   Dispatch,
//   useReducer,
// } from 'react';
// import { initialPreferenceState } from './types';
// import { Preferences as UserPreference } from '../domain/preferences';
// import { preferenceReducer } from './reducers/preferenceReducer';

// // TODO rename to UserPreference

// type PreferenceContextType = {
//   state: UserPreference;
//   dispatch: Dispatch<any>;
// };

// const PreferenceContext = createContext<PreferenceContextType>({
//   state: initialPreferenceState,
//   dispatch: () => {},
// });

// export const preferenceState = () => {
//   return useContext(PreferenceContext);
// };

// export const PreferenceContextProvider = ({ children }: PropsWithChildren) => {
//   const [state, dispatch] = useReducer(
//     preferenceReducer,
//     initialPreferenceState,
//   );

//   return (
//     <PreferenceContext.Provider value={{ state, dispatch }}>
//       {children}
//     </PreferenceContext.Provider>
//   );
// };

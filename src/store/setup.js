import { createStore, applyMiddleware,compose } from 'redux'
import reducers from './index';
import { AsyncStorage } from "react-native";
import thunkMiddleware from 'redux-thunk';
import {persistStore,autoRehydrate} from 'redux-persist'
const middlewares=[]
middlewares.push(thunkMiddleware);

  // export const store = createStore(reducers,applyMiddleware(...middlewares));
  
export default  function configureStore() {
  const store = createStore(reducers,compose(applyMiddleware(...middlewares),autoRehydrate()) );
  
//   return new Promise((resolve, reject) => {
//     try {  
//      let store = createStore(reducers,applyMiddleware(...middlewares),autoRehydrate())

  persistStore(
    store,
    {storage:AsyncStorage,whitelist:['incidentReducer']}
   
  );

  return store
//     } catch (e) {
//       reject(e);
//     }
//   });


}

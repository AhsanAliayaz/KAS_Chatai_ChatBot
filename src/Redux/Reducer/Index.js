import UserReducer from '../Reducer/UserReducer'


import { combineReducers } from 'redux'

const rootReducer=combineReducers({
    USER:UserReducer,
    apiKey: (state = null, action) => {
        // Reducer logic for managing the apiKey field goes here
        switch (action.type) {
          case "SET_API_KEY":
            return action.payload;
          default:
            return state;
        }
      },

    
})
export default rootReducer;
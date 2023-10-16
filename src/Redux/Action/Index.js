
export const adduser = (payload) => {
    
    return {
        type: "ADD_USER",
        payload
    }
}
export const setApiKey = (apiKey) => ({
    type: 'SET_API_KEY',
    payload: apiKey,
  });


  export const addMessage = (data = []) => {
    return {
        type: 'ADD_MESSAGE',
        payload: data
    };
}


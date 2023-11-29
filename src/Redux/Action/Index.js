
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


  export const addMessage = (message) => {
    return {
        type: "ADD_MESSAGE",
        payload: message,
    }
}
export const deleteMessage = (messages) => {
    return {
        type: "DELETE_MESSAGE",
        payload: {messages},
    }
}








const initialData = {
    userData: null,
    isLoggedIn: false,
    messages: [],
}

const UserReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_USER":
            const var_data = action.payload
            return {
                ...state,
                isLoggedIn: true,
                userData: var_data,
            }
            case "SET_API_KEY": // Add a case to set the apiKey
            return { ...state, apiKey: action.payload };

            
            case "ADD_MESSAGE":
                const newMessages = [...state.messages, ...action.payload];
                return {...state, messages: newMessages }

                case "DELETE_MESSAGE":
    
                    const messageIdToDelete = action.payload;
                    // console.log('messageIdToDelete',messageIdToDelete)
                   
                    // const flattenedArray = state.messages.flat();
                    //  console.log("state of message",flattenedArray)
                    const updatedMessages = state.messages.filter(message => message.id !== messageIdToDelete.messages);
                    console.log('Updated id in Deletedededede',updatedMessages)
                    return { ...state, messages: updatedMessages };

        default:
            return state;
    }


}
export default UserReducer;

// const initialData = {
//     users: {},
//     apiKey: null,
//   };

//   const UserReducer = (state = initialData, action) => {
//     switch (action.type) {
//       case "ADD_USER":
//         const userData = action.payload;
//         return {
//           ...state,
//           users: {
//             ...state.users,
//             [userData.id]: {
//               isLoggedIn: true,
//               userData,
//               messages: [],
//             },
//           },
//         };
  
//       case "SET_API_KEY":
//         return { ...state, apiKey: action.payload };
  
//       case "ADD_MESSAGE":
//         const { userId, message } = action.payload;
//         return {
//           ...state,
//           users: {
//             ...state.users,
//             [userId]: {
//               ...state.users[userId],
//               messages: [...state.users[userId].messages, message],
//             },
//           },
//         };
  
//       case "DELETE_MESSAGE":
//         const { userId: delUserId, messageId } = action.payload;
//         const updatedUserMessages = state.users[delUserId].messages.filter(
//           message => message.id !== messageId
//         );
  
//         return {
//           ...state,
//           users: {
//             ...state.users,
//             [delUserId]: {
//               ...state.users[delUserId],
//               messages: updatedUserMessages,
//             },
//           },
//         };
  
//       default:
//         return state;
//     }
//   };
//   export default UserReducer;
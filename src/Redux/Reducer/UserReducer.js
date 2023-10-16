





const initialData = {
    userData: null,
    isLoggedIn: false,
    messagesData: [],




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
            const newMessage = action.payload;
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage], // Corrected field name
            };

        default:
            return state;
    }


}
export default UserReducer;

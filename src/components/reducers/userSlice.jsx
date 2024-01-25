import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logins: (state, action) => {
            state.user = action.payload;
            // localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logouts: (state, action) => {
            state.user = null
            localStorage.clear()
        },

    
    }
})

export const { logins, logouts } = userSlice.actions
export default userSlice.reducer    
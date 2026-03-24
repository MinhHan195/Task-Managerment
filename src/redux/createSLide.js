// import { createSlice } from '@reduxjs/toolkit';

// const createSlide = createSlice({
//     name: 'create',
//     initialState: {
//         show: false,
//         userMention: {
//             name: '',
//             id: ''
//         }

//     },
//     reducers: {
//         setModal: (state, action) => {
//             const [show, name, id] = action.payload || [];
//             state.show = show;
//             state.userMention.name = name;
//             state.userMention.id = id;
//         },
//     },
// });

// export const setModal = (show, name, id) => ({
//     type: createSlide.actions.setModal.type,
//     payload: [show, name, id],
// });

// export default createSlide.reducer;
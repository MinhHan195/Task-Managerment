// import { createSlice } from '@reduxjs/toolkit';
// import { _AUTH } from '../constants/_auth.js';

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         theme: null,
//         loading: false,
//         token: null,
//         alert: {
//             message: '',
//         },
//         notifycation: {
//             show: false,
//             message: "",
//             isError: false
//         },
//         user: {},
//         error: '',
//         listNotifycation: [
//             {
//                 type: "mention",
//                 data: {
//                     username: "user123",
//                     avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
//                     postId: "post123",
//                     timeCreate: "2025-08-07T12:46:20.123Z",
//                 },
//             },
//             {
//                 type: "new_feed",
//                 data: {
//                     username: "user123",
//                     avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
//                     timeCreate: "2025-08-07T12:46:20.123Z",
//                     postId: "hbkjfnklasdlkadskjlfnk"
//                 }
//             },
//             {
//                 type: "request_follow",
//                 data: {
//                     username: "user123",
//                     avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
//                     timeCreate: "2025-08-07T12:46:20.123Z",
//                     id: "alknklads fkasdkjf",
//                     NotificationId: "akajjđkạnkádsạdkạdjándj"
//                 }
//             },
//             {
//                 type: "system_notification",
//                 data: {
//                     message: "Thông báo hệ thống",
//                     timeCreate: "2025-08-07T12:46:20.123Z",
//                     link: "/system-notification"
//                 }
//             }

//         ],
//     },
//     reducers: {
//         logout: (state) => {
//             state.token = null;
//             localStorage.clear();
//         },
//         setLoading: (state, { payload }) => {
//             state.loading = payload;
//         },
//         setAlert: (state, { payload }) => {
//             state.alert.message = payload.message || '';
//         },

//         setNotifycation: (state, { payload }) => {
//             state.notifycation = { ...state.notifycation, ...payload };
//         },
//         setTheme: (state, { payload }) => {
//             state.theme = payload;
//             localStorage.setItem(_AUTH.THEME, payload);
//         },
//         setUser: (state, { payload }) => {
//             state.user = { ...state.user, ...payload };
//             if (!payload.avatar) {
//                 state.user.avatar = "/default_avatar.jpg";
//             }
//         }
//     }
// });

// export const { setLoading, setAlert, logout, setNotifycation, setTheme, setUser } = authSlice.actions;

// export default authSlice.reducer;
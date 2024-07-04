import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import refreshTokenReducer from "../features/refreshToken/refreshTokenSlice";
import loaderReducer from "../features/loader/loaderSlice";
import logoutReducer from "../features/logout/logoutSlice";
import workspaceReducer from "../features/workspace/workspaceSlice";

export default configureStore({
    reducer: {
        login: loginReducer,
        refreshToken: refreshTokenReducer,
        loader: loaderReducer,
        logout: logoutReducer,
        workspace: workspaceReducer
    }
})
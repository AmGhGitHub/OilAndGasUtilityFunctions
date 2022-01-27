import { configureStore } from "@reduxjs/toolkit";
import gravityDrainageSlice from "./gravity-drainage-slice";

export default configureStore({
    reducer:{gravityDrainage:gravityDrainageSlice}
})

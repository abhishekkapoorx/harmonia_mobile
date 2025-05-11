import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../slice/ModalSlice'

// Create the store with middleware configuration to allow functions in modalProps
export const store = configureStore({
  reducer: {
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the specified paths
        ignoredActions: ['modal/showModal'],
        ignoredPaths: ['modal.modalProps.onSuccess'],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
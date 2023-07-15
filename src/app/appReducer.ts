const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
};

export const appReducer = (
    state: AppStateType = initialState,
    action: AppActionsType
): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.payload.status };
        case 'APP/SET-ERROR':
            return { ...state, error: action.payload.error };
        case 'APP/SET-INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized };
        default:
            return state;
    }
};

// actions
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', payload: { status }
} as const);
export const setAppError = (error: null | string) => ({
    type: 'APP/SET-ERROR', payload: { error }
} as const);
export const setInitialized = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED', payload: { isInitialized }
} as const);

// types
type AppStateType = typeof initialState
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetInitializedActionType = ReturnType<typeof setInitialized>
export type AppActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetInitializedActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

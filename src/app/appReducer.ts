const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
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
        default:
            return state;
    }
};

// actions
export const setLoadingStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', payload: { status }
} as const);
export const setError = (error: null | string) => ({
    type: 'APP/SET-ERROR', payload: { error }
} as const);

// types
type AppStateType = typeof initialState
export type SetLoadingStatusType = ReturnType<typeof setLoadingStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppActionsType = SetLoadingStatusType | SetErrorType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

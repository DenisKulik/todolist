const initialState = {
    status: 'loading' as RequestStatusType
};

export const appReducer = (
    state: AppStateType = initialState,
    action: AppActionsType
): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.payload.status };
        default:
            return state;
    }
};

// actions
export const setLoadingStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', payload: { status }
} as const);

// types
type AppStateType = typeof initialState
export type SetLoadingStatusType = ReturnType<typeof setLoadingStatus>
export type AppActionsType = SetLoadingStatusType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

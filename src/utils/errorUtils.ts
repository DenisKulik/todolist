import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolistAPI';
import {
    setError, SetErrorType, setLoadingStatus, SetLoadingStatusType
} from '../app/appReducer';

export const handleServerAppError = <T>(
    dispatch: ErrorUtilsDispatchType,
    data: ResponseType<T>
) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]));
    } else {
        dispatch(setError('Some error occurred'));
    }
    dispatch(setLoadingStatus('failed'));
};

export const handleServerNetworkError = (
    dispatch: ErrorUtilsDispatchType,
    errorMessage: string
) => {
    dispatch(setLoadingStatus('failed'));
    dispatch(setError(errorMessage));
};

type ErrorUtilsDispatchType = Dispatch<SetErrorType | SetLoadingStatusType>

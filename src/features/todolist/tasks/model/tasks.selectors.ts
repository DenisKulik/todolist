import { AppRootStateType } from 'app/model/store'

export const selectTasks = (state: AppRootStateType, id: string) => state.tasks[id]

import { AppRootStateType } from 'app/store'

export const selectTasks = (state: AppRootStateType, id: string) => state.tasks[id]

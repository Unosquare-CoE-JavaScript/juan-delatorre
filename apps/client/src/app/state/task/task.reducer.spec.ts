import { Action } from '@ngrx/store'
import { reducer, TaskState } from './task.reducer'

describe('Task Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action

      const result = reducer(TaskState, action)

      expect(result).toBe(TaskState)
    })
  })
})

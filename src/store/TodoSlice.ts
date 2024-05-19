import { createSlice } from '@reduxjs/toolkit'
import { ITodo } from '../interface/Todo'

interface ITodoSlice {
  todos: ITodo[]
}

const initialState: ITodoSlice = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: initialState,
  reducers: {
    againTodo(state, action) {
      state.todos = [...action.payload]
    },
    filterTodo(state, action) {
      const data = action.payload
      if (data.value === 'completed') {
        state.todos = data.todoApi.filter((todo: ITodo) => todo.completed === !!data.value)
      } else if (data.value === 'remaining') {
        state.todos = data.todoApi.filter((todo: ITodo) => todo.completed === !data.value)
      } else state.todos = data.todoApi
    },
  },
})

export const { againTodo, filterTodo } = todoSlice.actions
export default todoSlice.reducer

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodo } from '../interface/Todo'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    getTodo: build.query<ITodo[], number | null>({
      query: () => `/todos`,
      providesTags: ['Todo'],
    }),
    addTodo: build.mutation<ITodo, Partial<ITodo>>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: build.mutation<ITodo, ITodo>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
})

export const { useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi

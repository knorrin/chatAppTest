import React, { useEffect, useState } from 'react'
import styles from './TodoList.module.scss'
import { useGetTodoQuery, useAddTodoMutation } from '../../query/TodoQuery'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { againTodo, filterTodo } from '../../store/TodoSlice'
import { TodoItem } from '../TodoItem/TodoItem'
import { ITodo } from '../../interface/Todo'

export const TodoList = () => {
  const { data: todosData, isError, isLoading } = useGetTodoQuery(null)

  const [addTodo] = useAddTodoMutation()
  const [inputValue, setInputValue] = useState('')
  const [inputValueError, setInputValueError] = useState<string | null>(null)
  const todos = useAppSelector((store) => store.todoSlice.todos)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!todosData) return
    dispatch(againTodo(todosData))
  }, [todosData, dispatch])

  const addItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!inputValue) return
    if (inputValue.length <= 3) {
      setInputValueError('Наименование должно быть минимум 4 символа')
      return
    }

    const newTodo: ITodo = {
      userId: 1,
      id: new Date().toISOString(),
      title: inputValue,
      completed: false,
    }

    await addTodo(newTodo).unwrap()
    setInputValue('')
    setInputValueError(null)
  }

  const filterItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      filterTodo({
        todoApi: todosData,
        value: event.target.value,
      })
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.add}>
        <h2>Добавить задачу</h2>
        <div className={styles.add_form}>
          <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={addItem}>Добавить</button>
        </div>
        {inputValueError && <p className={styles.add_form_error_text}>{inputValueError}</p>}
      </div>
      <div className={styles.list}>
        <div className={styles.list_header}>
          <h1>Список задач</h1>
          <select onChange={filterItem}>
            <option value='all'>Все задачи</option>
            <option value='completed'>Выполненные</option>
            <option value='remaining'>Оставшиеся</option>
          </select>
        </div>
        <div className={styles.container_item}>
          {isLoading && <p>Идет загрузка</p>}

          {isError && <p>Ошибка</p>}

          {todos.length == 0 && <p>список пуст</p>}

          {todos.length !== 0 &&
            !isLoading &&
            !isError &&
            todos.map(({ id, title, completed }) => <TodoItem key={id} title={title} completed={completed} id={id} />)}
        </div>
      </div>
    </div>
  )
}

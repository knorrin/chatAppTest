import { FC, memo, useCallback, useState } from 'react'
import edit from '../../assets/edit.svg'
import basket from '../../assets/basket.svg'
import styles from './TodoItem.module.scss'
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../../query/TodoQuery'
import { ITodo } from '../../interface/Todo'

interface TodoItemProps {
  id: number | string
  title: string
  completed: boolean
}

export const TodoItem: FC<TodoItemProps> = memo(({ title, completed, id }) => {
  const [checked, setChecked] = useState<boolean>(completed)
  const [update, setUpdate] = useState(false)
  const [updateValue, setUpdateValue] = useState('')
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const changeChecked = async () => {
    const newTodo: ITodo = {
      userId: 1,
      id,
      title,
      completed: !checked,
    }
    try {
      await updateTodo(newTodo).unwrap()
    } catch (e) {
      alert(e)
    }
    setChecked((pre) => !pre)
  }

  const editItem = useCallback(() => {
    setUpdate((pre) => !pre)
    setUpdateValue(title)
  }, [title])

  const updateItem = useCallback(async () => {
    const newTodo = {
      userId: 1,
      id,
      title: updateValue,
      completed: checked,
    }
    try {
      await updateTodo(newTodo).unwrap()
      setUpdate((pre) => !pre)
    } catch (e) {
      alert(e)
    }
    setUpdateValue('')
  }, [checked, id, updateTodo, updateValue])

  const deleteItem = useCallback(async () => {
    try {
      await deleteTodo(id)
    } catch (e) {
      alert(e)
    }
  }, [id, deleteTodo])

  const cancelUpdate = useCallback(() => {
    setUpdate(false)
  }, [])

  return (
    <div className={styles.todo}>
      <div className={styles.item}>
        <div className={styles.item_checkbox}>
          <input type='checkbox' checked={checked} onChange={changeChecked} />
        </div>

        <div className={styles[checked ? 'close' : 'item_body']}>
          {update ? (
            <input
              type='text'
              className={styles.update_input}
              defaultValue={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          ) : (
            <div className={styles.title}>{title}</div>
          )}

          {update ? (
            <div className={styles.container_button}>
              <button className={styles.cancel_button} onClick={cancelUpdate}>
                Отменить
              </button>
              <button className={styles.update_button} onClick={updateItem}>
                Подтвердить
              </button>
            </div>
          ) : (
            <div className={styles.item_image} onClick={checked ? () => {} : editItem}>
              <img src={edit} alt='edit' />
            </div>
          )}
        </div>
        <div className={styles.delete} onClick={deleteItem}>
          <img src={basket} alt='basket' />
        </div>
      </div>
    </div>
  )
})

import React, { FC } from 'react'
import { GrSubtract } from 'react-icons/gr'
import { Task } from '../Task/Task'
import ActionButton from '../ActionButton/ActionButton'
import { useTypedDispatch } from '../../hooks/redux'
import { deleteList, setModalActive } from '../../store/slices/boardsSlice'
import { addLog } from '../../store/slices/loggerSlice'
import { v4 } from 'uuid'
import { IList, ITask } from './../../types/index';
import { setModalData } from '../../store/slices/modalSlice'
import { deleteButton, header, listWrapper, name } from './List.css'

type TListProps = {
  boardId: string;
  list: IList;
}

const List: FC<TListProps> = ({
  list,
  boardId
}) => {

  const dispatch = useTypedDispatch();
  
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )
  }

  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask
   ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  }

  return (
    <div 
      className={listWrapper}
    >
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract 
          className={deleteButton}
          onClick={() => handleListDelete(list.listId)}
        />
      </div>
      {list.tasks.map((task, index) => (
        <div
        onClick={() =>  handleTaskChange(boardId, list.listId, task.taskId, task)}
          key={task.taskId}
          >
            <Task
            taskName={task.taskName}
            taskDescription={task.taskDescription}
            boardId={boardId}
            id={task.taskId}
            index={index}
            />
            </div>
      ))}
      <ActionButton 
        boardId={boardId}
        listId={list.listId}
        />
    </div>
  )
}

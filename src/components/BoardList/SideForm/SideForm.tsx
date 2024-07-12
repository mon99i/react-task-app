import React, { ChangeEvent, FC, useState } from 'react'
import { FiCheck } from 'react-icons/fi';
import { icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { addLog } from '../../../store/slices/loggerSlice';
import { v4 as uuidv4 } from 'uuid';

type TSideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>

}

export const SideForm :FC<TSideFormProps>= ({
  setIsFormOpen,
  inputRef
}) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleOnBlur = () => {
    setIsFormOpen(false);
  }

  const handleClick = () => {
    if(inputText) {
      dispatch(
        addBoard({board: {
          boardId: uuidv4(),
          boardName:inputText,
          lists: []
        }})
      )

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록: ${inputText}`,
          logAuthor: "User",
          logTimestamp: String(Date.now()),
        })
      )

    }
  }

  return (
    <div className={sideForm}>
      <input className={input}
        autoFocus
        // ref={inputRef}
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick}/>
    </div>
  )
}

export default SideForm
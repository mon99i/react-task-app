import { useState } from 'react';
import './App.css'
import { appContainer, buttons, board } from './App.css'
import BoardList from './components/BoardList/BoardList';
import { useTypedSelector } from './hooks/redux';
import ListContainer from './components/ListContainer/ListsContainer';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const boards = useTypedSelector(state => state.boards.boardArray);

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId) [0];

  const lists = getActiveBoard.lists;

  return (
      <div className={appContainer}>
        <BoardList 
          activeBoardId={activeBoardId} 
          setActiveBoardId={setActiveBoardId} 
      />
      
      <div className={board}>
        <ListContainer lists={lists} boardId={getActiveBoard.boardId}/>
      </div>

      <div>
        <button className={buttons}>
        이 게시판 삭제하기
        </button>
      </div>
    </div>
  )
}

export default App;
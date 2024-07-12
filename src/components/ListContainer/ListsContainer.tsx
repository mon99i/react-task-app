import React, { FC } from 'react'
import { IList } from '../../types';
import { List } from '../List/List';
import { listsContainer } from './ListsContainer.css';
import ActionButton from '../ActionButton/ActionButton';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListsContainer: FC<TListsContainerProps> = ({
  lists,
  boardId
}) => {
  return (
    <div className={listsContainer}>
      {
        lists.map(list => (
          <List
            key={list.listId}
            list={list}
            boardId={boardId}
          />
        ))
      }
      <ActionButton 
        boardId={boardId}
        listId={""}
        list
      />
    </div>
  )
}

export default ListsContainer;
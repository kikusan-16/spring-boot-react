
import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { KanbanDivisionColor, KanbanDivisionType } from '../../utils/constants';
import { CardAttr, KanbanTypes } from '../../utils/types';
import Loading from './Loading';
import StickyNote from './StickyNote';

const toColorFromType = (type: KanbanTypes | undefined) => {
  switch (type) {
    case KanbanDivisionType.todo:
      return KanbanDivisionColor.todo;
    case KanbanDivisionType.doing:
      return KanbanDivisionColor.doing;
    case KanbanDivisionType.done:
      return KanbanDivisionColor.done;
    case undefined:
      return KanbanDivisionColor.none;
  }
};

const Column = (props: {
  type?: KanbanTypes
  title?: string
  cards?: CardAttr[]
  onCardDragStart?: (id: string) => void
  onCardDrop?: (entered: string | null) => void
}) => {
  const { type, title, cards, onCardDragStart, onCardDrop } = props;
  const totalCount = cards?.length ?? -1;

  const [draggingCardID, setDraggingCardID] = useState<string | undefined>(undefined);
  const handleCardDragStart = (id: string) => {
    setDraggingCardID(id);
    onCardDragStart?.(id);
  };

  return (
    <div className={`col p-3 m-2 border ${toColorFromType(type)}`}>
      <div>
        {totalCount >= 0 && <Badge>{totalCount}</Badge>}
        <h3>{title}</h3>
      </div>

      {!cards
        ? (<Loading />)
        : (
        <>
            {cards.map(({ id, text }, i) => (
              <StickyNote.DropArea
                key={id}
                disabled={
                  draggingCardID !== undefined &&
                  (id === draggingCardID || cards[i - 1]?.id === draggingCardID)
                }
                onDrop={() => onCardDrop?.(id)}
              >
                <StickyNote
                  text={text}
                  onDragStart={() => handleCardDragStart(id)}
                  onDragEnd={() => setDraggingCardID(undefined)}
                />
              </StickyNote.DropArea>
            ))}

            <StickyNote.DropArea
              style={{ height: '100%' }}
              disabled={
                draggingCardID !== undefined &&
                  cards[cards.length - 1]?.id === draggingCardID
              }
              onDrop={() => onCardDrop?.(null)}
            />
        </>
          )}
    </div>
  );
};

export default Column;

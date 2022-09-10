
import React from 'react';
import { Badge } from 'react-bootstrap';
import { KanbanDivisionColor, KanbanDivisionType } from '../../utils/constants';
import { StickyNoteAttr, KanbanTypes } from '../../utils/types';
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
  stickyNotes?: StickyNoteAttr[]
  onStickyNoteDragStart?: (id: string) => void
  onStickyNoteDrop?: (entered: string | null) => void
  onAddClick?: () => void
  onStickyNoteChange?: (stickyNoteID: string, text: string) => void
}) => {
  const { type, title, stickyNotes, onStickyNoteDragStart, onStickyNoteDrop, onAddClick, onStickyNoteChange } = props;
  const totalCount = stickyNotes?.length ?? -1;

  const handleStickyNoteDragStart = (id: string) => {
    onStickyNoteDragStart?.(id);
  };
  const addStickyNote = () => {
    onAddClick?.();
  };

  return (
    <div className={`col p-3 m-2 border ${toColorFromType(type)}`}>
      <div>
        {totalCount >= 0 && <Badge>{totalCount}</Badge>}
        <div className='row'>
          <h3 className='col'>{title}</h3>
          <div className='col text-end'><i onClick={addStickyNote} className='plus bi bi-file-earmark-plus'></i></div>
        </div>
      </div>

      {!stickyNotes
        ? (<Loading />)
        : (
        <>
            {stickyNotes.map(({ id, text }) => (
              <StickyNote.DropArea
                className='pt-3'
                key={id}
                onDrop={() => onStickyNoteDrop?.(id)}
              >
                <StickyNote
                  id={id}
                  text={text}
                  onDragStart={() => handleStickyNoteDragStart(id)}
                  onTextChange={onStickyNoteChange}
                />
              </StickyNote.DropArea>
            ))}

            <StickyNote.DropArea
              className='h-100'
              onDrop={() => onStickyNoteDrop?.(null)}
            />
        </>
          )}
    </div>
  );
};

export default Column;

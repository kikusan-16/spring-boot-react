import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';

const Editable = (props: {
  id: string
  text: string
  onTextChange?: (stickyNoteID: string, text: string) => void

}) => {
  const { id, text, onTextChange } = props;
  const value = useRef(text);

  const handleChange = (evt: any) => {
    value.current = evt.target.value;
    onTextChange?.(id, value.current);
  };

  return <ContentEditable
    style={{ outline: 'none' }}
    suppressContentEditableWarning={true}
    className='card-text ps-1'
    html={value.current}
    onChange={handleChange} />;
};

const StickyNote = (props: {
  id: string
  text?: string
  onDragStart?: () => void
  onDragEnd?: () => void
  onTextChange?: (stickyNoteID: string, text: string) => void
  onDeleteClick?: (stickyNoteID: string) => void
}) => {
  const { id, text, onDragStart, onDragEnd, onTextChange, onDeleteClick } = props;
  const [drag, setDrag] = useState(false);

  return (
    <div
      draggable
      className='card p-1 pe-4 border'
      style={{ opacity: drag ? 0.5 : undefined }}
      onDragStart={() => {
        onDragStart?.();
        setDrag(true);
      }}
      onDragEnd={() => {
        onDragEnd?.();
        setDrag(false);
      }}>
      <i onClick={() => onDeleteClick?.(id)} className='trash-icon bi bi-trash'></i>
      <Editable
        id={id}
        text={text ?? ''}
        onTextChange={onTextChange}
        />
    </div>
  );
};

const DropArea = (props: {
  onDrop?: () => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) => {
  const { onDrop, children, className } = props;

  return (
    <div
      className={className}
      onDragOver={(ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
      }}
      onDrop={() => {
        onDrop?.();
      }}
    >
      {children}
    </div>
  );
};

StickyNote.DropArea = DropArea;

export default StickyNote;

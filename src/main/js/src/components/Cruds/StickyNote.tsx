import React, { useState, useRef } from 'react';

const StickyNote = (props: {
  text?: string
  onDragStart?: () => void
  onDragEnd?: () => void
}) => {
  const { text, onDragStart, onDragEnd } = props;
  const [drag, setDrag] = useState(false);

  return (
    <div
      draggable
      className='card mb-3 border'
      style={{ opacity: drag ? 0.5 : undefined }}
      onDragStart={() => {
        onDragStart?.();
        setDrag(true);
      }}
      onDragEnd={() => {
        onDragEnd?.();
        setDrag(false);
      }}>
      <div className="card-body">
        <p className="card-text">
          {text}
        </p>
      </div>
    </div>
  );
};

const DropArea = (props: {
  disabled?: boolean
  onDrop?: () => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) => {
  const { disabled, onDrop, children, className, style } = props;
  const [isTarget, setIsTarget] = useState(false);
  const visible = !disabled && isTarget;

  const [dragOver, onDragOver] = useDragAutoLeave();

  return (
    <div
      style={style}
      className={className}
      onDragOver={(ev: React.DragEvent<HTMLDivElement>) => {
        if (disabled) return;

        ev.preventDefault();
        onDragOver(() => setIsTarget(false));
      }}
      onDragEnter={() => {
        if (disabled ?? dragOver.current) return;

        setIsTarget(true);
      }}
      onDrop={() => {
        if (disabled) return;

        setIsTarget(false);
        onDrop?.();
      }}
    >
      <div
        style={{
          height: !visible ? 0 : undefined,
          borderWidth: !visible ? 0 : undefined
        }}
      />

      {children}
    </div>
  );
};

/**
 * dragOver イベントが継続中かどうかのフラグを ref として返す
 *
 * timeout 経過後に自動でフラグが false になる
 *
 * @param timeout 自動でフラグを false にするまでの時間 (ms)
 */
const useDragAutoLeave = (timeout: number = 100) => {
  const dragOver = useRef(false);
  const timer = useRef(0);

  return [
    dragOver,

    /**
     * @param onDragLeave フラグが false になるときに呼ぶコールバック
     */
    (onDragLeave?: () => void) => {
      clearTimeout(timer.current);

      dragOver.current = true;
      timer.current = window.setTimeout(() => {
        dragOver.current = false;
        onDragLeave?.();
      }, timeout);
    }
  ] as const;
};

StickyNote.DropArea = DropArea;

export default StickyNote;

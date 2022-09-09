import React, { useState, useEffect } from 'react';
import { StickyNoteAttr, NodeLink, ColumnAttr } from '../../utils/types';
import fetchAny, { postAny } from '../../services/fetcher';
import { getReorderPatch, sortBy } from '../../services/kanbanService';
import Loading from './Loading';
import Column from './Column';

const getColumns = async (): Promise<ColumnAttr[]> => {
  return await fetchAny('/api/kanban');
};

const getNodes = async (): Promise<NodeLink[]> => {
  return await fetchAny('/api/nodes');
};

const getStickyNotes = async (): Promise<NodeLink[]> => {
  return await fetchAny('/api/stickynotes');
};

const postNodes = async (patch: NodeLink[]) => {
  return await postAny('/api/nodes', JSON.stringify(patch));
};

const Kanban = () => {
  const [columns, setColumns] = useState<ColumnAttr[]>([]);
  const [nodes, setNodes] = useState<NodeLink[]>([]);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteAttr[]>([]);

  useEffect(() => {
    const load = async () => {
      const [columns, nodes, stickyNotes] = await Promise.all([
        getColumns(),
        getNodes(),
        getStickyNotes()
      ]);
      const newState = sortBy(columns, stickyNotes, nodes);
      setColumns(newState.columns);
      setNodes(newState.nodes);
      setStickyNotes(newState.stickyNotes);
    };
    void load(); // 返ってくるPromiseを無視する
  }, []);

  const [draggingStickyNoteID, setDraggingStickyNoteID] = useState<string | null>(null);

  const dropStickyNoteTo = (toID: string) => {
    const fromID = draggingStickyNoteID;
    if (!fromID) return;

    setDraggingStickyNoteID(null);

    if (fromID === toID) return;

    const patch = getReorderPatch(nodes, fromID, toID);

    const newState = sortBy(columns, stickyNotes, nodes, patch);

    setColumns(newState.columns);
    setNodes(newState.nodes);
    setStickyNotes(newState.stickyNotes);

    const load = async () => {
      await postNodes(patch);
    };
    void load(); // 返ってくるPromiseを無視する
  };

  return (
    <div className='row'>
          {!columns
            ? <Loading />
            : (columns.map(({ id: columnID, title, type, stickyNotes }) => (
              <Column
                type={type}
                key={columnID}
                title={title}
                stickyNotes={stickyNotes}
                onStickyNoteDragStart={(stickyNoteID: React.SetStateAction<string | null>) => setDraggingStickyNoteID(stickyNoteID)}
                onStickyNoteDrop={(entered: any) => dropStickyNoteTo(entered ?? columnID)}
              />
              )))
          }
    </div>
  );
};

export default Kanban;

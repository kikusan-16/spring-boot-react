import React, { useState, useEffect } from 'react';
import { StickyNoteAttr, NodeLink, ColumnAttr } from '../../utils/types';
import fetchAny, { deleteAny, postAny } from '../../services/fetcher';
import { getAddPatch, getDeletePatch, getReorderPatch, sortBy } from '../../services/kanbanService';
import Loading from './Loading';
import Column from './Column';

const getColumns = async (): Promise<ColumnAttr[]> => {
  return await fetchAny('/api/kanban') ?? [];
};

const getNodes = async (): Promise<NodeLink[]> => {
  return await fetchAny('/api/nodes') ?? [];
};

const getStickyNotes = async (): Promise<NodeLink[]> => {
  return await fetchAny('/api/stickynotes') ?? [];
};

const postNodes = async (patch: NodeLink[]) => {
  return await postAny('/api/nodes', JSON.stringify(patch));
};

const postStickyNote = async (stickyNote?: StickyNoteAttr): Promise<StickyNoteAttr | null> => {
  if (stickyNote) {
    return await postAny('/api/stickynotes', JSON.stringify(stickyNote));
  } else {
    return await postAny('/api/stickynotes');
  }
};

const deleteStickyNote = async (stickyNoteID: string): Promise<void> => {
  return await deleteAny(`/api/stickynotes/${stickyNoteID}`);
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
    void load();
  };

  const addStickyNote = (columnID: string) => {
    const column = columns?.find(col => col.id === columnID);
    if (!column) return;

    const load = async () => {
      const newStickyNote = await postStickyNote();
      if (!newStickyNote) return;

      const patch = getAddPatch(nodes, columnID, newStickyNote.id);
      stickyNotes.push(newStickyNote);
      const newState = sortBy(columns, stickyNotes, nodes, patch);

      setColumns(newState.columns);
      setNodes(newState.nodes);
      setStickyNotes(newState.stickyNotes);
      await postNodes(patch);
    };
    void load();
  };

  const updateStickyNote = (stickyNoteID: string, text: string) => {
    const stickyNote = stickyNotes.find(stickyNote => stickyNote.id === stickyNoteID);
    if (!stickyNote) return;

    stickyNote.text = text;
    setStickyNotes(stickyNotes);

    const load = async () => {
      await postStickyNote({ id: stickyNoteID, text });
    };
    void load();
  };

  const unlinkStickyNote = (stickyNoteID: string) => {
    const deletingStickyNote = stickyNotes.find(stickyNote => stickyNote.id === stickyNoteID);
    if (!deletingStickyNote) return;

    const patch = getDeletePatch(nodes, stickyNoteID);

    const newState = sortBy(columns, stickyNotes, nodes, patch);

    setColumns(newState.columns);
    setNodes(newState.nodes);
    setStickyNotes(newState.stickyNotes);

    const load = async () => {
      await deleteStickyNote(stickyNoteID);
    };
    void load();
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
                onStickyNoteChange={updateStickyNote}
                onAddClick={() => addStickyNote(columnID)}
                onDeleteClick={unlinkStickyNote}
              />
              )))
          }
    </div>
  );
};

export default Kanban;

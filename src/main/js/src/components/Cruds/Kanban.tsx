import React, { useState, useEffect } from 'react';
import { CardAttr, CardOrder, ColumnAttr } from '../../utils/types';
import fetchAny from '../../services/fetcher';
import { getReorderPatch, sortBy } from '../../services/kanbanService';
import Loading from './Loading';
import Column from './Column';

const fetchColumns = async (): Promise<ColumnAttr[]> => {
  return await fetchAny('/api/kanban');
};

const fetchOrders = async (): Promise<CardOrder[]> => {
  return await fetchAny('/api/descendants');
};

const fetchStickyNotes = async (): Promise<CardOrder[]> => {
  return await fetchAny('/api/stickynotes');
};

const Kanban = () => {
  const [columns, setColumns] = useState<ColumnAttr[]>([]);
  const [orders, setOrders] = useState<CardOrder[]>([]);
  const [stickyNotes, setStickyNotes] = useState<CardAttr[]>([]);

  useEffect(() => {
    const load = async () => {
      const [columns, orders, stickyNotes] = await Promise.all([
        fetchColumns(),
        fetchOrders(),
        fetchStickyNotes()
      ]);
      const newState = sortBy(columns, stickyNotes, orders);
      setColumns(newState.columns);
      setOrders(newState.orders);
      setStickyNotes(newState.stickyNotes);
    };
    void load(); // 返ってくるPromiseを無視する
  }, []);

  const [draggingCardID, setDraggingCardID] = useState<string | null>(null);

  const dropCardTo = (toID: string) => {
    const fromID = draggingCardID;
    if (!fromID) return;

    setDraggingCardID(null);

    if (fromID === toID) return;

    const patch = getReorderPatch(orders, fromID, toID);

    const newState = sortBy(columns, stickyNotes, orders, patch);

    setColumns(newState.columns);
    setOrders(newState.orders);

    const load = async () => {
      await fetchAny('/api/descendants', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(patch)
      });
    };
    void load(); // 返ってくるPromiseを無視する
  };

  return (
    <div className='row'>
          {!columns
            ? <Loading />
            : (columns.map(({ id: columnID, title, type, cards }) => (
              <Column
                type={type}
                key={columnID}
                title={title}
                cards={cards}
                onCardDragStart={(cardID: React.SetStateAction<string | null>) => setDraggingCardID(cardID)}
                onCardDrop={(entered: any) => dropCardTo(entered ?? columnID)}
              />
              )))
          }
    </div>
  );
};

export default Kanban;

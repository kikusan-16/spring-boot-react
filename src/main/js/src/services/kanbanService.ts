import { CardAttr, ColumnAttr, CardOrder } from '../utils/types';

const getLastNode = (orders: CardOrder[], id: string) => {
  let lastNode: CardOrder;
  const _getLastNode = (orders: CardOrder[], id: string): CardOrder => {
    lastNode = orders.find(order => order.id === id) as CardOrder;
    if (lastNode.next) {
      return _getLastNode(orders, lastNode.next);
    }
    return lastNode;
  };
  return _getLastNode(orders, id);
};

const getChildNodes = (orders: CardOrder[], id: string) => {
  const childNodes: CardOrder[] = [];
  const _getChildNodes = (orders: CardOrder[], id: string): CardOrder[] => {
    const node = orders.find(order => order.id === id) as CardOrder;
    childNodes.push(node);
    if (node.next) {
      return _getChildNodes(orders, node.next);
    }
    return childNodes;
  };
  return _getChildNodes(orders, id);
};

const getCardsBy = (cards: CardAttr[], orders: CardOrder[]) => {
  return cards
    .filter(card => orders.find(order => order.id === card.id))
    .sort((a, b) => {
      const aOrderIdx = orders.findIndex(order => order.id === a.id);
      const bOrderIdx = orders.findIndex(order => order.id === b.id);
      if (aOrderIdx > bOrderIdx) {
        return 1;
      } else {
        return -1;
      }
    });
};

/**
 * リストの順序情報を並べ替える PATCH リクエストのための情報を生成する
 *
 * @param orders リスト
 * @param fromID 移動対象の ID
 * @param toID 移動先の ID
 */
export const getReorderPatch = (
  orders: CardOrder[],
  fromID: string,
  toID: string
): CardOrder[] => {
  const patch: CardOrder[] = [];
  if (fromID === toID) {
    return patch;
  }
  const newOrders = orders.slice();
  const fromOrder = orders.find(order => order.id === fromID) as CardOrder;

  // 元カードの削除
  const oldParentNode = newOrders.find(order => order.next === fromID) as CardOrder;
  patch.push({ id: oldParentNode.id, next: fromOrder.next });

  // columnが移動先の場合
  if (!newOrders.find(node => node.next === toID)) {
    const lastNode = getLastNode(newOrders, toID);
    patch.push({ id: lastNode.id, next: fromID });
    patch.push({ id: fromOrder.id, next: null });
  // cardが移動先の場合
  } else {
    const newParentNode = newOrders.find(order => order.next === toID) as CardOrder;
    patch.push({ id: newParentNode.id, next: fromOrder.id });
    patch.push({ id: fromOrder.id, next: toID });
  }

  return patch;
};

/**
 * callsignatureによるオーバーロード
 * columnsのソート
 */
export const sortBy: {
  (columns: ColumnAttr[], stickyNotes: CardAttr[], orders: CardOrder[]): { columns: ColumnAttr[], stickyNotes: CardAttr[], orders: CardOrder[]}
  (columns: ColumnAttr[], stickyNotes: CardAttr[], orders: CardOrder[], patch: CardOrder[]): { columns: ColumnAttr[], stickyNotes: CardAttr[], orders: CardOrder[]}
} = (columns: ColumnAttr[], stickyNotes: CardAttr[], orders: CardOrder[], patchs?: CardOrder[]) => {
  patchs?.forEach(patch => {
    const node = orders.find(node => patch.id === node.id) as CardOrder;
    node.next = patch.next;
  });

  columns = columns.map(col => {
    const sortedOrders = getChildNodes(orders, col.id);
    col.cards = getCardsBy(stickyNotes, sortedOrders);
    return col;
  });

  return { columns, stickyNotes, orders };
};

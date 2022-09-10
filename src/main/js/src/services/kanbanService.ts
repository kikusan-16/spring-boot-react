import { StickyNoteAttr, ColumnAttr, NodeLink } from '../utils/types';

const getLastNode = (nodes: NodeLink[], id: string) => {
  let lastNode: NodeLink;
  const _getLastNode = (nodes: NodeLink[], id: string): NodeLink => {
    lastNode = nodes.find(node => node.id === id) as NodeLink;
    if (lastNode.next) {
      return _getLastNode(nodes, lastNode.next);
    }
    return lastNode;
  };
  return _getLastNode(nodes, id);
};

const getChildNodes = (nodes: NodeLink[], id: string) => {
  const childNodes: NodeLink[] = [];
  const _getChildNodes = (nodes: NodeLink[], id: string): NodeLink[] => {
    const node = nodes.find(node => node.id === id) as NodeLink;
    childNodes.push(node);
    if (node.next) {
      return _getChildNodes(nodes, node.next);
    }
    return childNodes;
  };
  return _getChildNodes(nodes, id);
};

const getStickyNotesBy = (stickyNotes: StickyNoteAttr[], nodes: NodeLink[]) => {
  return stickyNotes
    .filter(stickyNote => nodes.find(node => node.id === stickyNote.id))
    .sort((a, b) => {
      const aNodeIdx = nodes.findIndex(node => node.id === a.id);
      const bNodeIdx = nodes.findIndex(node => node.id === b.id);
      if (aNodeIdx > bNodeIdx) {
        return 1;
      } else {
        return -1;
      }
    });
};

/**
 * リストの順序情報を並べ替える PATCH リクエストのための情報を生成する
 *
 * @param nodes リスト
 * @param fromID 移動対象の ID
 * @param toID 移動先の ID
 */
export const getReorderPatch = (
  nodes: NodeLink[],
  fromID: string,
  toID: string
): NodeLink[] => {
  const patch: NodeLink[] = [];
  if (fromID === toID) {
    return patch;
  }
  const newNodes = nodes.slice();
  const fromNode = nodes.find(node => node.id === fromID) as NodeLink;

  // 元カードの削除
  const oldParentNode = newNodes.find(node => node.next === fromID) as NodeLink;
  patch.push({ id: oldParentNode.id, next: fromNode.next });

  // columnが移動先の場合
  if (!newNodes.find(node => node.next === toID)) {
    const lastNode = getLastNode(newNodes, toID);
    patch.push({ id: lastNode.id, next: fromID });
    patch.push({ id: fromNode.id, next: null });
  // stickyNoteが移動先の場合
  } else {
    const newParentNode = newNodes.find(node => node.next === toID) as NodeLink;
    patch.push({ id: newParentNode.id, next: fromNode.id });
    patch.push({ id: fromNode.id, next: toID });
  }

  return patch;
};

/**
 * callsignatureによるオーバーロード
 * columnsのソート
 */
export const sortBy: {
  (columns: ColumnAttr[], stickyNotes: StickyNoteAttr[], nodes: NodeLink[]): { columns: ColumnAttr[], stickyNotes: StickyNoteAttr[], nodes: NodeLink[]}
  (columns: ColumnAttr[], stickyNotes: StickyNoteAttr[], nodes: NodeLink[], patch: NodeLink[]): { columns: ColumnAttr[], stickyNotes: StickyNoteAttr[], nodes: NodeLink[]}
} = (columns: ColumnAttr[], stickyNotes: StickyNoteAttr[], nodes: NodeLink[], patchs?: NodeLink[]) => {
  patchs?.forEach(patch => {
    const node = nodes.find(node => patch.id === node.id);
    if (node) {
      node.next = patch.next;
    } else {
      nodes.push(patch);
    }
  });

  columns = columns.map(col => {
    const sortedNodes = getChildNodes(nodes, col.id);
    col.stickyNotes = getStickyNotesBy(stickyNotes, sortedNodes);
    return col;
  });

  return { columns, stickyNotes, nodes };
};

export const getAddPatch = (
  nodes: NodeLink[],
  parentID: string,
  newID: string
): NodeLink[] => {
  const patch: NodeLink[] = [];
  const parentNode = nodes.find(node => node.id === parentID) as NodeLink;
  patch.push({ id: newID, next: parentNode.next });
  parentNode.next = newID;
  patch.push(parentNode);
  return patch;
};

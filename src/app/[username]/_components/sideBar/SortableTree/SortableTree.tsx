import React, {useMemo} from 'react';
import {
  flattenTree,
  removeChildrenOf,
  setProperty,
} from './utilities';
import type {TreeItem, TreeItems} from './types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { SortableTreeItem } from './SortableTreeItem';
import { Props as TreeItemProps } from './TreeItem';
interface Props {
  collapsible?: boolean;
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
  items: TreeItems;
  setItems: React.Dispatch<React.SetStateAction<TreeItem[]>>;
  renderItem: React.ComponentType<TreeItemProps>;
  onContentClick: (id: UniqueIdentifier) => void;
}

export function SortableTree({
  collapsible,
  items,
  indentationWidth = 35,
  setItems,
  renderItem,
  onContentClick,
}: Props) {
  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, {children, collapsed, id}) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );
    return removeChildrenOf(
      flattenedTree,
      collapsedItems
    );
  }, [items]);

  return (
    <>
      {flattenedItems.map((item) => {
        const {id, children, collapsed, depth} = item;
        return <SortableTreeItem
            key={id}
            id={id}
            value={item}
            depth={depth}
            indentationWidth={indentationWidth}
            collapsed={Boolean(collapsed && children.length)}
            onCollapse={
              collapsible && children.length
                ? () => handleCollapse(id)
                : undefined
            }
            renderItem={renderItem}
            onContentClick={() => onContentClick(id)}
          />
        })}
    </>
  );
  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }
}
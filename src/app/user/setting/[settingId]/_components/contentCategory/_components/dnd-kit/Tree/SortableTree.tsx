'use client';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
  Modifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from './utilities';
import type {FlattenedItem, SensorContext, TreeItem, TreeItems} from './types';
import {sortableTreeKeyboardCoordinates} from './keyboardCoordinates';
import {SortableTreeItem} from './components';
import {initialItems} from './initialItem';
import { measuring, dropAnimationConfig } from '../config/dndConfig';

interface Props {
  collapsible?: boolean;
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
  removable?: boolean;
  items: TreeItems;
  setItems: React.Dispatch<React.SetStateAction<TreeItem[]>>;
  handleItemChanged?: (id: UniqueIdentifier) => void;
  handleEditClicked?: (id: UniqueIdentifier) => void;
}

export function SortableTree({
  collapsible,
  items = initialItems,
  indicator = false,
  indentationWidth = 50,
  removable,
  setItems,
  handleItemChanged,
}: Props) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);
  const [body, setBody] = useState<HTMLElement | null>(null);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, {children, collapsed, id}) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId != null ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [activeId, items]);

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null;
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const sortedIds = useMemo(
    () => flattenedItems.map(({id}) => id),
    [flattenedItems]
  );
  const activeItem = activeId
    ? flattenedItems.find(({id}) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  useEffect(() => {
    setBody(document.body);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map((item) => {
          const {id, children, collapsed, depth} = item;
          return <SortableTreeItem
            key={id}
            id={id}
            value={item}
            depth={id === activeId && projected ? projected.depth : depth}
            indentationWidth={indentationWidth}
            indicator={indicator}
            collapsed={Boolean(collapsed && children.length)}
            onCollapse={
              collapsible && children.length
                ? () => handleCollapse(id)
                : undefined
            }
            onEditClicked={() => {
              handleEditClicked(id);
            }}
            onEditingCancel={() => {
              handleEditingCancel(id);
            }}
            onRemove={removable ? () => {
              handleRemove(id);
              handleItemChanged && handleItemChanged(id);
            } : undefined}
            onInputTextChange={handleInputTextChange ? (text) => handleInputTextChange(text, id) : undefined}
            onConfirm={handleItemConfirm ? () => {
              handleItemConfirm(id);
              handleItemChanged && handleItemChanged(id);
            } : undefined}
          />
        })}
        {body && createPortal(
          <DragOverlay
            dropAnimation={dropAnimationConfig}
            modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeItem}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          body
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({active: {id: activeId}}: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({id}) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    if (body) {
      body.style.setProperty('cursor', 'grabbing');
    }
  }

  function handleDragMove({delta}: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({over}: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleEditClicked(id: UniqueIdentifier) {
    console.log('handleEditClicked', id);
    setItems((items) => setProperty(items, id, 'isEditing', (value) => {
      return true;
    }));
  }

  function handleItemConfirm(id: UniqueIdentifier) {
    setItems((items) => setProperty(items, id, 'isEditing', (value) => {
      return false;
    }));
  };

  function handleEditingCancel(id: UniqueIdentifier) {
    if (Number(id) < 0) {
      handleRemove(id);
      handleItemChanged && handleItemChanged(id);
    }
    else {
      setItems((items) => setProperty(items, id, 'isEditing', (value) => {
        return false;
      }));
    }
  }

  function handleInputTextChange(text: string, id: UniqueIdentifier) {
    setItems((items) => setProperty(items, id, 'name', (value) => {
      return text;
    }));
  }

  function handleDragEnd({active, over}: DragEndEvent) {
    resetState();

    if (projected && over) {
      const {depth, parentId} = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({id}) => id === over.id);
      const activeIndex = clonedItems.findIndex(({id}) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = {...activeTreeItem, depth, parentId};

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItems(newItems);
      handleItemChanged && handleItemChanged(active.id);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    if (body) {
      body.style.setProperty('cursor', '');
    }
  }

  function handleRemove(id: UniqueIdentifier) {
    setItems((items) => removeItem(items, id));
  }

  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }
}

const adjustTranslate: Modifier = ({transform}) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};

import React, {forwardRef, HTMLAttributes, useEffect, useRef} from 'react';
import classNames from 'classnames';

import styles from './TreeItem.module.css';
import { TreeItem as TreeItemType } from '../../types';
import Collapse from '../../../components/Collapse/Collapse';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: TreeItemType;
  onCollapse?(): void;
  onRemove?(): void;
  onEditingCancel?(): void;
  onConfirm?(): void;
  onInputTextChange?(text: string): void;
  wrapperRef?(node: HTMLLIElement): void;
  onEditClicked?(): void;
}

export const EditorTreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onEditClicked,
      onEditingCancel,
      onConfirm,
      onCollapse,
      onRemove,
      onInputTextChange,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef]);

    return (
      <li
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        ) + (!ghost && ' h-11')}
        ref={wrapperRef}
        style={
          {
            '--spacing-dnd': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={`${styles.TreeItem} flex ${!ghost ? 'h-full' : ''}`} ref={ref} style={style}>
          {depth === 0 && <Collapse collapsed={!!collapsed} onClick={onCollapse} disabled={!onCollapse} />}
          <input type="text" className="pl-2 flex-1 ml-2 border border-gray-300 border-solid border-gray-300" ref={inputRef} onChange={(e) => onInputTextChange && onInputTextChange(e.target.value)} />
          <div className="flex justify-end ml-3 mr-1 gap-1 text-sm">
            <button className={`border border-gray-300 border-solid px-1 px-1 ${value.children.length >= 1 ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'cursor-pointer bg-gray-100'}`} onClick={Number(value.id) < 0 ? onRemove : onEditingCancel}>취소</button>
            <button className={`bg-gray-100 text-gray-700 border border-gray-300 border-solid px-1`} onClick={onConfirm}>적용</button>
          </div>
        </div>
      </li>
    );
  }
);

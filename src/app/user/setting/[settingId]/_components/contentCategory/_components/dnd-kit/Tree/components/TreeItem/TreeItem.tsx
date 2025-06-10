import React, {forwardRef, HTMLAttributes} from 'react';
import classNames from 'classnames';

import {Action, Handle, Remove} from '../../../components';
import styles from './TreeItem.module.css';
import { TreeItem as TreeItemType } from '../../types';
import Collapse from '../../../components/Collapse/Collapse';
import { CategoryEditBtn } from '../../../components/Edit/CategoryEditBtn';

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
  onApply?(): void;
  onInputTextChange?(text: string): void;
  wrapperRef?(node: HTMLLIElement): void;
  onConfirm?(): void;
  onEditClicked?(): void;
  onEditingCancel?(): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
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
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      onInputTextChange,
      onConfirm,
      onEditClicked,
      onEditingCancel,
      ...props
    },
    ref
  ) => {
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
        <div className={`${styles.TreeItem} ${!ghost ? 'h-full' : ''}`} ref={ref} style={style}>
          {depth === 0 && <Collapse collapsed={!!collapsed} onClick={onCollapse} disabled={!onCollapse} />}
          <Handle {...handleProps}/>
          <span className={styles.Text}>{value.name}</span>

          <span className={styles.ItemCount}>({value.count})</span>
          {!clone && onEditClicked && (
            <CategoryEditBtn className={styles.EditButton}
              onEditClicked={onEditClicked}
            >
              변경
            </CategoryEditBtn>
          )}
          {!clone && onRemove && (
            <Remove
              className={styles.Remove}
              disabled={(Number(value.count) > 0 || !!onCollapse)}
              onRemove={onRemove}
            />
          )}
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);

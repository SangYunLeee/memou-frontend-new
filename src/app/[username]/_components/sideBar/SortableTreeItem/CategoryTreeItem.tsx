import classNames from 'classnames';
import { Props } from '../SortableTree/TreeItem';
import Collapse from '../SortableTree/Collapse/Collapse';
import styles from './CategoryTreeItem.module.css';

export const CategoryTreeItem = ({
      depth,
      indentationWidth,
      collapsed,
      onCollapse,
      onContentClick,
      style,
      value,
      ...props
    }: Props) => {
    return (
      <li
        className={classNames(
          styles.Wrapper
        ) + ' h-7 mb-1'}
        style={
          {
            '--spacing-dnd': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div style={style} className='flex flex-1 items-center border border-gray-200 border-solid rounded-md hover:border-blue-400 h-full px-1'>
          {depth === 0 && <Collapse collapsed={!!collapsed} onCollapse={onCollapse} disabled={!onCollapse} />}
          <div onClick={onContentClick} className='flex-1 cursor-pointer'>
            <span className='ml-2 text-base text-gray-700'>{value.name}</span>
            <span className='ml-1 text-sm text-gray-500'>({value.count})</span>
          </div>
        </div>
      </li>
    );
  }

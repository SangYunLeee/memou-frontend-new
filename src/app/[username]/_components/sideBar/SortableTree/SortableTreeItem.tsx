import { UniqueIdentifier } from '@dnd-kit/core';
import { Props as TreeItemProps } from './TreeItem';

interface SortableTreeItemProps extends TreeItemProps {
  id: UniqueIdentifier;
  renderItem: React.ComponentType<TreeItemProps>;
}

export function SortableTreeItem({
  renderItem: RenderItem,
  ...props
}: SortableTreeItemProps) {
  return (
    <RenderItem
      {...props}
    />
  );
}

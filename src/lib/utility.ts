export const flattenItems = <T extends { children?: T[] }>(items: T[]): T[] => {
  return items.flatMap(item => [item, ...flattenItems(item.children || [])]);
};

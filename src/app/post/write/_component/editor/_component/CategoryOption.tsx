import { useCategories } from "@/hooks/useMyCategories";
import { forwardRef, useEffect, useRef, useState } from "react";
import { CategoryType } from "@/interfaces/category-type";

const CategoryOption = forwardRef<{ current: CategoryType | null }, {className: string, initialValue?: number}>(({className, initialValue}, ref) => { 
  const { myCategories, isLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const selectedCategoryRef = useRef<CategoryType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCategoryName = selectedCategory?.parentId ? `${myCategories.find(category => category.id === selectedCategory?.parentId)?.categoryName} - ${selectedCategory?.categoryName}` : selectedCategory?.categoryName;
  // ref를 통해 selectedCategoryRef를 외부로 노출
  if (ref) {
    (ref as React.RefObject<{ current: CategoryType | null }>).current = selectedCategoryRef;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const flattenItems = (items: CategoryType[]) => {
    return items.flatMap(item => [item, ...flattenItems(item.children || [])]);
  };

  useEffect(() => {
    if (initialValue && myCategories) {
      const category = flattenItems(myCategories).find(category => category.id === initialValue) as CategoryType | undefined | null  ;
      selectedCategoryRef.current = category || null;
      setSelectedCategory(category || null);
    }
  }, [initialValue, myCategories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 1차 카테고리만 필터링
  const mainCategories = myCategories.filter(category => !category.parentId);

  return (
    <div className={`${className}`} ref={dropdownRef}>
      <div className="flex items-center gap-2 text-sm">
        카테고리:
      </div>
      <div className="relative w-70">
      <button 
        className={`w-full text-left px-4 py-1 border rounded-md flex justify-between items-center text-sm hover:bg-gray-100 border-gray-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedCategoryName || "카테고리 선택"}</span>
        <span className="ml-2 flex-shrink-0">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {mainCategories.map((category) => (
            <li key={category.id} className="relative group">
              <a 
                href="#" 
                className="block px-4 py-1 hover:bg-gray-100 truncate"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category);
                  selectedCategoryRef.current = category;
                  setIsOpen(false);
                }}
              >
                {category.categoryName}
              </a>
              {category.children && category.children.length > 0 && (
                <ul className="hidden group-hover:block absolute left-full top-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  {category.children.map((child) => (
                    <li key={child.id}>
                      <a 
                        href="#" 
                        className="block px-4 py-1 hover:bg-gray-100 truncate"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(child);
                          selectedCategoryRef.current = child;
                          setIsOpen(false);
                        }}
                      >
                        {child.categoryName}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  )
});

CategoryOption.displayName = 'CategoryOption';

export default CategoryOption;
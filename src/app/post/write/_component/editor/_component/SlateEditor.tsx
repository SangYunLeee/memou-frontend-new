'use client'
import SlateEditor from "@/components/slateEditor/SlateEditor";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { withHistory } from "slate-history";
import { createEditor, Descendant } from "slate";
import { Editable, withReact } from "slate-react";
import { linkDecorator } from "@/components/slateEditor/LinkPlugin";
import { renderPlaceholder } from "./slateEditor.fn";
import ToolbarImplement from "@/components/slateEditor/toolbar/ToolbarImplement";

export const defaultValue : Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  }
]

// forwardRef 적용!
const SlateEditorComponent = forwardRef(function SlateEditorComponent(
  { className, initialValue }: { className?: string, initialValue?: Descendant[] },
  ref
) {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [placeholder, setPlaceholder] = useState('내용을 입력하세요');

  // useImperativeHandle로 editor 노출
  useImperativeHandle(ref, () => ({
    editor,
    getValue: () => {
      // 예시로 getValue 메서드도 제공 가능
      return editor;
    },
  }));

  return (
    <SlateEditor
      editor={editor}
      initialValue={initialValue || defaultValue}
      renderEditable={(editableProps) => (
        <Editable
          {...editableProps}
          placeholder={placeholder}
          renderPlaceholder={renderPlaceholder}
          onFocus={() => setPlaceholder('')}
          onBlur={() => setPlaceholder('내용을 입력하세요')}
          decorate={linkDecorator}
          onDragOver={(e) => e.preventDefault()}
          className={className}
        />
      )}
    >
      <ToolbarImplement />
    </SlateEditor>
  );
});

export default SlateEditorComponent;

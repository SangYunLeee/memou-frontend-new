import SlateEditor from "@/components/slateEditor/SlateEditor";
import { useState } from "react";
import { withHistory } from "slate-history";
import { createEditor, Descendant } from "slate";
import { Editable, withReact } from "slate-react";
import { linkDecorator } from "@/components/slateEditor/LinkPlugin";
import { renderPlaceholder } from "./slateEditor.fn";
import ToolbarImplement from "../../../../components/slateEditor/toolbar/ToolbarImplement";

export const defaultValue : Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  }
]

export default function SlateEditorComponent({className}: {className?: string}) {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [placeholder, setPlaceholder] = useState('내용을 입력하세요');
  return (
    <SlateEditor
    editor={editor}
    initialValue={defaultValue}
    renderEditable={
      (editableProps) =>
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
    }
  >
    <ToolbarImplement />
  </SlateEditor>
  );
}

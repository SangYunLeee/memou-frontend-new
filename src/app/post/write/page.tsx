'use client'
import SlateEditor from "@/components/slateEditor/SlateEditor";
import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { renderPlaceholder } from "./slateEditor.fn";
import { linkDecorator } from "@/components/slateEditor/LinkPlugin";
export const defaultValue : Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  }
]

export default function WritePage() {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [placeholder, setPlaceholder] = useState('내용을 입력하세요');
  return (
    <div>
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
                      />
                  }
                />
    </div>
  );
}

// https://codesandbox.io/s/slateeditor-with-types-6zpfi?file=/src/components/SlateEditor/toolbarElements.tsx

import { useCallback } from "react";
import { Descendant, Editor } from "slate";
import { Editable, Slate } from "slate-react";
import { Leaf, Element } from "./deserialize";
import {toggleKeyboardShortcut} from "./keyboardShortcut";

// TODO Link Plugin 설치해보기
// https://codesandbox.io/p/sandbox/slateeditor-with-types-forked-4yl2tz?file=%2Fsrc%2Fcomponents%2FSlateEditor%2Fplugins.tsx%3A21%2C1

function SlateEditor({
      editor,
      initialValue,
      renderEditable = (props) => <Editable {...props} />,
      children
    } : {
      editor: Editor,
      initialValue: Descendant[],
      renderEditable?: (props: any) => React.ReactElement,
      children?: React.ReactNode,
    })
{
  const renderElement = useCallback((props: any) => {
    return <Element {...props} />
  }, [])

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={value => {
        // 변경점이 있을 경우에 대한 처리
        // const isAstChange = editor.operations.some(
        //   op => 'set_selection' !== op.type
        // )
        // if (isAstChange) {
        // }
      }}
    >
      {children}
      {renderEditable({
        className: "slate-editable",
        renderElement,
        renderLeaf,
        onKeyDown: (event: any) => {
          toggleKeyboardShortcut(event, editor);
        },
      })}
  </Slate>);
}


export default SlateEditor;

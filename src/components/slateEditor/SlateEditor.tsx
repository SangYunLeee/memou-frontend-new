import { useCallback } from "react";
import { Descendant, Editor } from "slate";
import { Editable, Slate } from "slate-react";
import { Leaf, Element } from "./deserialize";
import {toggleKeyboardShortcut} from "./keyboardShortcut";

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

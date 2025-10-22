// @ts-nocheck - Slate 타입이 복잡하여 일시적으로 타입 체크 비활성화
/**
 * Keyboard shortcut related logic for the SlateEditor component
 */
import { isHotkey } from "is-hotkey";
import { toggleMark } from "./helper";

export const HOTKEYS = {
  "ctrl+b": "bold",
  "mod+b": "bold",
  "ctrl+i": "italic",
  "mod+i": "italic",
  "ctrl+u": "underline",
  "mod+u": "underline",
  "ctrl+shift+enter": "code",
  "mod+shift+enter": "code"
};

export const toggleKeyboardShortcut = (event, editor) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      toggleMark(editor, mark);
      break;
    }
  }
};

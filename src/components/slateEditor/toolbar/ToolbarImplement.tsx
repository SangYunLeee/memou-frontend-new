import { BlockButton, MarkButton } from "@/components/slateEditor/toolbar/components";
import { Toolbar } from "@/components/slateEditor/toolbar/components";
import HeadingButton from "@/components/slateEditor/toolbar/HeadingButton";
import BoldIcon from "./asset/boldIcon.svg";
import ItalicIcon from "@/components/slateEditor/toolbar/asset/ItalicIcon.svg";

const ToolbarImplement = ({className}: {className?: string}) => {
  return (
    <Toolbar className={`toolbar flex ${className}`}>
      <MarkButton format="bold" className="">
        <BoldIcon strokeWidth={0} className="opacity-60 h-7 w-7"/>
      </MarkButton>
      <MarkButton format="italic" className="mr-1">
        <ItalicIcon strokeWidth={0} className="opacity-60 h-7 w-7"/>
      </MarkButton>
      <HeadingButton level={1} className="mr-2 opacity-60 flex items-center justify-center"/>
      <HeadingButton level={2} className="mr-2 opacity-60"/>
      <HeadingButton level={3} className="mr-2 opacity-60"/>
      <BlockButton format="numbered-list" icon="format_list_numbered" />
      <BlockButton format="bulleted-list" icon="format_list_bulleted" />
    </Toolbar>
  );
};

export default ToolbarImplement;

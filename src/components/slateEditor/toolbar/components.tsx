'use client'
/**
 * Base components for the SlateEditor component.
 */
import React from "react";
import ReactDOM from "react-dom";
import { useSlate } from "slate-react";
import {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark,
  isLinkActive,
  insertLink
} from "../helper";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props } : any, ref) => (
    <span
      {...props}
      ref={ref}
      className={`${className} flex items-center cursor-pointer ${reversed ? active ? "text-white" : "text-gray-400" : active ? "text-black" : "text-gray-400"}`}
    />
  )
);

export const Icon = React.forwardRef(({ className, ...props }: any, ref) => (
  <span
    {...props}
    ref={ref}
    className={`${className}`}
  />
));

export const Menu = React.forwardRef(({ className, ...props }: any, ref) => (
  <div
    {...props}
    ref={ref}
    className={`${className}`}
  />
));

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Toolbar = React.forwardRef(({ className, ...props }: any, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={`${className}`}
  />
));

export const BlockButton = ({ format, icon, children, className }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      className={className}
    >
      {children ?? ''}
    </Button>
  );
};

export const MarkButton = ({ format, icon, children, className }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      className={className}
    >
      {children ?? ''}
    </Button>
  );
};

export const LinkButton = () => {
  const editor = useSlate();
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <Icon>link</Icon>
    </Button>
  );
};

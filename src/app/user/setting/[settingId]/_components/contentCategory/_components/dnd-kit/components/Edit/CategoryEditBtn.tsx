import React from 'react';

import {Action, ActionProps} from '../Action';

interface CategoryEditBtnProps extends ActionProps {
  disabled?: boolean;
  onEditClicked: () => void;
}

export function CategoryEditBtn({onEditClicked, disabled, ...props}: CategoryEditBtnProps) {
  return (
    <Action
      {...props}
      className={
        `text-sm bg-gray-100 mr-1 px-1
        border border-gray-300 border-solid
        ${props.className ? props.className : ''}
        ${disabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' : ''}`
      }
      onClick={() => {
        if (!disabled) {
          onEditClicked();
        }
      }}
    >
      변경
    </Action>
  );
}

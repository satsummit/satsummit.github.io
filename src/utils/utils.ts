import { MouseEvent, MouseEventHandler } from 'react';

export function visuallyDisableProps({
  onClick
}: {
  onClick?: (event?: MouseEvent) => void;
} = {}) {
  const clickHandler: MouseEventHandler<HTMLElement> = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick?.(event);
  };

  return {
    onClick: clickHandler,
    opacity: 0.8
  };
}

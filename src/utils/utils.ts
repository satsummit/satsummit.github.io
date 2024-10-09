import { MouseEvent, MouseEventHandler } from 'react';
import { parse } from 'date-fns';

type SureProps<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Sure<T> = T extends T
  ? object extends T
    ? never
    : SureProps<NonNullable<T>>
  : SureProps<NonNullable<T>>;

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
    opacity: 0.64
  };
}

export const parseEventDate = (d: string) =>
  parse(d, 'yyyy-MM-dd HH:mm', new Date());

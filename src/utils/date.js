import { format, parse } from 'date-fns';

export const timeFromDate = (d) => format(d, 'hh:mmaaa');

export const parseEventDate = (d) => parse(d, 'yyyy-MM-dd HH:mm', new Date());

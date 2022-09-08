import { format } from 'date-fns';

export const timeFromDate = (d) => format(d, 'hh:mmaaa');

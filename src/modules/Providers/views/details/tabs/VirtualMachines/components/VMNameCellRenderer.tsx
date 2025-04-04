import * as React from 'react';
import { TableCell } from 'src/modules/Providers/utils/components/TableCell/TableCell';

import type { VMCellProps } from './VMCellProps';

export const VMNameCellRenderer: React.FC<VMCellProps> = ({ data }) => {
  return <TableCell>{data.name}</TableCell>;
};

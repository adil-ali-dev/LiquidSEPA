import React from 'react';

import { withAssetsTableDomain } from './domain';
import { Table } from './components/table';

export const AssetsTableModule = withAssetsTableDomain(({ children }) => (
  <Table>
    { children }
  </Table>
));

import React, { ComponentType, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { BLOCKSTREAM_ASSET_URL, ProductType } from '../../constants';
import { Asset, TableProps } from './typedef';
import { BlockStreamApi, ConverterService } from '../../services';
import { TableRow } from './components/table-row';
import { LoadingTableRow } from './components/loading-table-row';

const ASSETS_QUERY_KEY = 'assets';
const TABLE_COLUMNS = 6;
const DEFAULT_TICKER = ProductType.EURX;
const DEFAULT_PRODUCT_TYPE = 'Deliver';
const DEFAULT_ISSUER = 'pegx.io';

export const withAssetsTableDomain = (Component: ComponentType<TableProps>) => () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const { isLoading, data } = useQuery(ASSETS_QUERY_KEY, BlockStreamApi.fetchDefaultAsset);

  useEffect(() => {
    if (!isLoading && data) {
      setAssets([{
        productName: data.ticker || DEFAULT_TICKER,
        productType: DEFAULT_PRODUCT_TYPE,
        issuer: data.entity?.domain || DEFAULT_ISSUER,
        issuedAmount: ConverterService.convertAmount(data.chain_stats.issued_amount.toString(), data.precision),
        burnedAmount: data.chain_stats.burned_amount,
        link: BLOCKSTREAM_ASSET_URL
      }]);
    }
  }, [isLoading, data]);

  return (
    <Component>
      {
        (isLoading || !assets.length)
          ? <LoadingTableRow length={ TABLE_COLUMNS }/>
          : assets.map(asset => <TableRow asset={ asset } key={ asset.issuer }/>)
      }
    </Component>
  );
};

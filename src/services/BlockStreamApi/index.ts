import { BLOCKSTREAM_API_ASSET_URL } from '../../constants';
import { AssetResponse } from './typedef';

export class BlockStreamApi {
  static fetchDefaultAsset(): Promise<AssetResponse> {
    return fetch(BLOCKSTREAM_API_ASSET_URL).then(res => res.json());
  }
}

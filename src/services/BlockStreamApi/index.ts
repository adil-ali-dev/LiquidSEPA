import { BLOCKSTREAM_API_ASSET_URL, SECOND_API_ASSET_URL } from '../../constants';
import { AssetResponse } from './typedef';

console.log(SECOND_API_ASSET_URL);

export class BlockStreamApi {
  static fetchDefaultAsset(): Promise<AssetResponse> {
    return fetch(BLOCKSTREAM_API_ASSET_URL).then(res => res.json());
  }

  static fetchSecondAsset(): Promise<AssetResponse> {
    return fetch(SECOND_API_ASSET_URL).then(res => res.json());
  }
}

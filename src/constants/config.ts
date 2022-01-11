import { Environment } from '../typedef';

export const APP_DEV = process.env.NODE_ENV === 'development';

export const ENV = process.env.NODE_ENV;
export const PRODUCTION = ENV === 'production';

export const MODE = process.env.REACT_APP_MODE as Environment;
export const LIVE = MODE === 'live';

export const BLOCKSTREAM_ASSET_ID = process.env.REACT_APP_BLOCKSTREAM_ASSET_ID as string;
export const BLOCKSTREAM_API_ASSET_URL = process.env.REACT_APP_BLOCKSTREAM_API_ASSET_URL as string;
export const BLOCKSTREAM_ASSET_URL = process.env.REACT_APP_BLOCKSTREAM_ASSET_URL as string;
export const SECOND_API_ASSET_URL = process.env.REACT_APP_SECOND_ASSET_API_URL as string;
export const SECOND_ASSET_URL = process.env.REACT_APP_SECOND_ASSET_URL as string;

export const SIDESWAP_PREFIX = process.env.REACT_APP_SIDESWAP_PREFIX as string;

export const AUTH_EID_URL = process.env.REACT_APP_AUTH_EID_URL as string;
export const AUTH_EID_URL_REQ_PREFIX = process.env.REACT_APP_AUTH_EID_URL_REQ_PREFIX as string;

export const NORDIGEN_BANK_LOGO_PREFIX = process.env.REACT_APP_NORDIGEN_BANK_LOGO_PREFIX as string;

const wsAuthApi = {
  [Environment.DEV]: process.env.REACT_APP_WS_AUTH_API_URL_DEV,
  [Environment.TESTING]: process.env.REACT_APP_WS_AUTH_API_URL_TESTING,
  [Environment.LIVE]: process.env.REACT_APP_WS_AUTH_API_URL_LIVE
}

const wsMainApi = {
  [Environment.DEV]: process.env.REACT_APP_WS_MAIN_API_URL_DEV,
  [Environment.TESTING]: process.env.REACT_APP_WS_MAIN_API_URL_TESTING,
  [Environment.LIVE]: process.env.REACT_APP_WS_MAIN_API_URL_LIVE
}

export const WS_AUTH_URL = wsAuthApi[MODE] as string;
export const WS_MAIN_URL = wsMainApi[MODE] as string;

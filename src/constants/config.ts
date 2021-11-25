export const ENV = process.env.NODE_ENV;
export const PRODUCTION = ENV === 'production';

export const MODE = process.env.REACT_APP_MODE as string;
export const LIVE = MODE === 'live';

export const BLOCKSTREAM_ASSET_ID = process.env.REACT_APP_BLOCKSTREAM_ASSET_ID as string;
export const BLOCKSTREAM_API_ASSET_URL = process.env.REACT_APP_BLOCKSTREAM_API_ASSET_URL as string;
export const BLOCKSTREAM_ASSET_URL = process.env.REACT_APP_BLOCKSTREAM_ASSET_URL as string;
export const SECOND_API_ASSET_URL = process.env.REACT_APP_SECOND_ASSET_API_URL as string;
export const SECOND_ASSET_URL = process.env.REACT_APP_SECOND_ASSET_URL as string;

export const SIDESWAP_PREFIX = process.env.REACT_APP_SIDESWAP_PREFIX as string;

export const LOGIN = process.env.REACT_APP_LOGIN as string;
export const PASSWORD = process.env.REACT_APP_PASSWORD as string;

export const AUTH_EID_URL = process.env.REACT_APP_AUTH_EID_URL as string;
export const AUTH_EID_URL_REQ_PREFIX = process.env.REACT_APP_AUTH_EID_URL_REQ_PREFIX as string;

export const GQL_HTTP_URL = LIVE
  ? process.env.REACT_APP_GQL_HTTP_LIVE_URL
  : process.env.REACT_APP_GQL_HTTP_URL as string;

export const REFUND_ADDRESS = LIVE
  ? process.env.REACT_APP_REFUND_ADDRESS_LIVE
  : process.env.REACT_APP_REFUND_ADDRESS as string;

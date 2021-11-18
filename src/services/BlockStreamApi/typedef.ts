type IssuanceTxin = {
  txid: string,
  vin: 0
};

type IssuancePrevout = {
  txid: string;
  vout: number;
};

type Status = {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
};

type Contract = {
  entity: Entity;
  issuer_pubkey: string;
  name: string;
  precision: number;
  ticker: string;
  version: number;
};

type ChainStats = {
  tx_count: number;
  issuance_count: number;
  issued_amount: number;
  burned_amount: number;
  has_blinded_issuances: boolean;
  reissuance_tokens: number;
  burned_reissuance_tokens: number;
};

type Entity = {
  domain: string;
};

export type AssetResponse = {
  asset_id: string;
  issuance_txin: IssuanceTxin;
  issuance_prevout: IssuancePrevout;
  status: Status;
  contract_hash: string;
  reissuance_token: string;
  chain_stats: ChainStats;
  contract?: Contract;
  entity?: Entity;
  ticker?: string;
  precision?: number;
  name?: string;
};

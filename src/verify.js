var _ = require('lodash')

var cclib = require('./cclib')
var bitcoin = cclib.bitcoin
var verify = cclib.verify
var createInstanceCheck = verify.createInstanceCheck


function isLength(thing, value) { return thing.length === value }

function isBlockchainChunk(thing) {
  return verify.hexString(thing) && thing.length > 0 && thing.length <= 322240 && thing.length % 160 === 0
}

var networks = _.values(bitcoin.networks)
function isBitcoinNetwork(thing) {
  return _.some(networks, function (network) { return _.isEqual(network, thing) })
}

function isHexSymbol(sym) { return '0123456789abcdefABCDEF'.indexOf(sym) !== -1 }
function isRawCoin(thing) {
  return (
    _.isObject(thing) &&
    _.isString(thing.txId) &&
    thing.txId.length === 64 &&
    thing.txId.split('').every(isHexSymbol) &&
    _.isNumber(thing.outIndex) &&
    _.isNumber(thing.value) &&
    _.isString(thing.script) &&
    _.isString(thing.address)
  )
}


var functions = {
  buffer: Buffer.isBuffer,
  length: isLength,
  blockchainChunk: isBlockchainChunk,

  HDNode: createInstanceCheck(function () { return bitcoin.HDNode }),
  bitcoinNetwork: isBitcoinNetwork,

  Wallet: createInstanceCheck(function () { return require('./wallet/Wallet') }),
  WalletState: createInstanceCheck(function () { return require('./wallet/WalletState') }),
  WalletStateManager: createInstanceCheck(function () { return require('./wallet/WalletStateManager') }),

  Address: createInstanceCheck(function () { return require('./address/Address') }),
  AddressManager: createInstanceCheck(function () { return require('./address/AddressManager') }),
  AddressStorage: createInstanceCheck(function () { return require('./address/AddressStorage') }),

  AssetDefinition: createInstanceCheck(function () { return require('./asset/AssetDefinition') }),
  AssetDefinitionManager: createInstanceCheck(function () { return require('./asset/AssetDefinitionManager') }),
  AssetDefinitionStorage: createInstanceCheck(function () { return require('./asset/AssetDefinitionStorage') }),
  AssetTarget: createInstanceCheck(function () { return require('./asset/AssetTarget') }),
  AssetValue: createInstanceCheck(function () { return require('./asset/AssetValue') }),

  Blockchain: createInstanceCheck(function () { return require('./blockchain/Blockchain') }),
  NaiveBlockchain: createInstanceCheck(function () { return require('./blockchain/NaiveBlockchain') }),
  VerifiedBlockchain: createInstanceCheck(function () { return require('./blockchain/VerifiedBlockchain') }),
  VerifiedBlockchainStorage: createInstanceCheck(
    function () { return require('./blockchain/VerifiedBlockchainStorage') }),

  rawCoin: isRawCoin,
  Coin: createInstanceCheck(function () { return require('./coin/Coin') }),
  CoinQuery: createInstanceCheck(function () { return require('./coin/CoinQuery') }),
  CoinManager: createInstanceCheck(function () { return require('./coin/CoinManager') }),

  HistoryEntry: createInstanceCheck(function () { return require('./history/HistoryEntry') }),
  HistoryTarget: createInstanceCheck(function () { return require('./history/HistoryTarget') }),
  HistoryManager: createInstanceCheck(function () { return require('./history/HistoryManager') }),

  Network: createInstanceCheck(function () { return require('./network/Network') }),
  Chain: createInstanceCheck(function () { return require('./network/Chain') }),
  Electrum: createInstanceCheck(function () { return require('./network/Electrum') }),

  AssetTx: createInstanceCheck(function () { return require('./tx/AssetTx') }),
  OperationalTx: createInstanceCheck(function () { return require('./tx/OperationalTx') }),
  RawTx: createInstanceCheck(function () { return require('./tx/RawTx') }),
  TxManager: createInstanceCheck(function () { return require('./tx/TxManager') }),
  TxFetcher: createInstanceCheck(function () { return require('./tx/TxFetcher') })
}

var expected = {
  buffer: 'Buffer',
  length: 'other length',
  blockchainChunk: 'blockchain chunk',

  HDNode: 'HDNode',
  bitcoinNetwork: 'Object from bitcoinjs-lib.networks',

  Wallet: 'Wallet',
  WalletState: 'WalletState',
  WalletStateManager: 'WalletStateManager',

  Address: 'Address',
  AddressManager: 'AddressManager',
  AddressStorage: 'AddressStorage',

  AssetDefinition: 'AssetDefinition',
  AssetDefinitionManager: 'AssetDefinitionManager',
  AssetDefinitionStorage: 'AssetDefinitionStorage',
  AssetTarget: 'AssetTarget',
  AssetValue: 'AssetValue',

  Blockchain: 'Blockchain',
  NaiveBlockchain: 'NaiveBlockchain',
  VerifiedBlockchain: 'VerifiedBlockchain',
  VerifiedBlockchainStorage: 'VerifiedBlockchainStorage',

  rawCoin: 'raw Coin Object',
  Coin: 'Coin',
  CoinQuery: 'CoinQuery',
  CoinManager: 'CoinManager',

  HistoryEntry: 'HistoryEntry',
  HistoryTarget: 'HistoryTarget',
  HistoryManager: 'HistoryManager',

  Network: 'Network',
  Chain: 'Chain',
  Electrum: 'Electrum',

  AssetTx: 'AssetTx',
  OperationalTx: 'OperationalTx',
  RawTx: 'RawTx',
  TxManager: 'TxManager',
  TxFetcher: 'TxFetcher'
}


verify.extendVerify(verify, functions, expected)
module.exports = verify

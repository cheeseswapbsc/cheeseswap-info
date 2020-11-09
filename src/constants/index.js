export const FACTORY_ADDRESS = '0xdd538E4Fd1b69B7863E1F741213276A6Cf1EfB3B'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time'
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://raw.githubusercontent.com/cheesemakerfarm/cheeseswap-interface/master/src/constants/token/cheeseswap.json'
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  '0xf455f6f7988b752f75488e2cccc030346d0cac72',
  '0x6e86fdeef643636039badc531ec828829f52cff2',
  '0x2e17533cc4c924137fdcd07c008e75d5d5f1c86b',
]

// pair blacklist
export const PAIR_BLACKLIST = [
  '0xb6a741f37d6e455ebcc9f17e2c16d0586c3f57a5',
  '0xf455f6f7988b752f75488e2cccc030346d0cac72',
  '0x6e86fdeef643636039badc531ec828829f52cff2',
  '0x2e17533cc4c924137fdcd07c008e75d5d5f1c86b',
]

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']

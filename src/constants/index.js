export const FACTORY_ADDRESS = '0xdd538e4fd1b69b7863e1f741213276a6cf1efb3b'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  THREE_MONTHS: '3 months',
  YEAR: '1 year',
  ALL_TIME: 'All time'
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://raw.githubusercontent.com/cheeseswapbsc/cheeseswap-interface/master/src/constants/token/cheeseswap.json'
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
    '0x1092e4f72a9d7a28418351d029e273906af24797',
    '0x2ad8184f181bc6e43cb838a42147987770c160be',
    '0x28e538167c34c15ac21395fb4d92c7c877d037c7',
    '0x236a130aebdf048da1976be6d17632cf27f229aa',
    '0x7d6dafdebc81f691c83b1f9d91ea42a5754bdaf4',
    '0xcfd63197d764cd70d07bb607e6367ae0e869badd'
]

// pair blacklist
export const PAIR_BLACKLIST = [
    '0xdb7cc7c7880ea6dbb1f42381a1cccf8f1b8171c1',
    '0x7cc41354109b648a15022eef6ac63191fa6f180e',
    '0x085493e164a5853ece035f2dbf3b5a66ebad427a',
    '0xc8213bba1ad62283847f388d834b876994843b90',
    '0xe6d6da24cade3c75f605e458abbf830698234d21'
]

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = []

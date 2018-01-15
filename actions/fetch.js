let result = null
if (fetch) {
  result = fetch
} else {
  result = require('isomorphic-fetch')
}
export default result

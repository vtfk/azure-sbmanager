const msRestNodeAuth = require("@azure/ms-rest-nodeauth")

//TODO: This will later be done in the webapp
// https://github.com/azure/azure-sdk-for-node/blob/HEAD/Documentation/Authentication.md#for-azure-graph-sdk

/**
 * Copy the code in console and navigate to the link, then log in.
 * @returns {Promise<object>} Returns credentials and subscriptions inside a object.
 */
module.exports = async () => {
  try {
    return msRestNodeAuth.interactiveLoginWithAuthResponse()
  } catch (error) {
    throw error
  }
}

const msRestNodeAuth = require("@azure/ms-rest-nodeauth")

//TODO: This will later be done in the webapp

/**
 * Copy the code in console and navigate to the link, then log in.
 * @returns {Promise<object>} Returns credentials and subscriptions inside a object.
 */
module.exports = async () => {
  return await msRestNodeAuth.interactiveLoginWithAuthResponse()
}

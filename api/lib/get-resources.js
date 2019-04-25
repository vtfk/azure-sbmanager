const getResourcegroups = require('./get-resourcegroups')
const getNamespaces = require('./get-namespaces')
const getQueues = require('./get-queues')

/**
 * Returns functions to list resourcegroups, namespaces and queues.
 * @param {Object} creds Credentials from one of Azures auth methods.
 * @param {String} [subIdDefault] Subscription ID, if omitted you have to pass it in each returned function.
 * @returns {Function} Returns multiple functions to retrieve resources.
 */
module.exports = async (creds, subIdDefault) => {
  if (!creds) {
    throw Error('Credentials was not passed')
  }
  try {
    return {
      getResourcegroups: (subscriptionId = subIdDefault) => getResourcegroups(creds, subscriptionId),
      getNamespaces: (subscriptionId = subIdDefault) => getNamespaces(creds, subscriptionId),
      getQueues: (subscriptionId = subIdDefault, namespaces) => getQueues(creds, subscriptionId, namespaces)
    }
    
  } catch (error) {
    throw error
  }

}
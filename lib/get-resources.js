const getResourcegroups = require('./get-resourcegroups')
const getNamespaces = require('./get-namespaces')
const getQueues = require('./get-queues')

// TODO: ? Add optional subscriptionId, then it´s used if it´s omitted in the returned function
/**
 * Returns functions to list resourcegroups, namespaces and queues.
 * @param {Object} creds Credentials from for example '@azure/ms-rest-nodeauth'
 * @returns {Function}
 */
module.exports = async (creds) => {
  if (!creds) {
    throw Error('Credentials was not passed')
  }
  try {
    return {
      getResourcegroups: (subscriptionId) => getResourcegroups(creds, subscriptionId),
      getNamespaces: (subscriptionId) => getNamespaces(creds, subscriptionId),
      getQueues: (subscriptionId, namespaces) => getQueues(creds, subscriptionId, namespaces)
    }
    
  } catch (error) {
    throw error
  }

}
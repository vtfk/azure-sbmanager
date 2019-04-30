const getResourcegroups = require('./get-resourcegroups')
const getNamespaces = require('./get-namespaces')
const getQueues = require('./get-queues')
const getMessages = require('./get-messages')

/**
 * Returns functions to list resourcegroups, namespaces and queues.
 * @param {Object} creds Credentials from one of Azures auth methods.
 * @param {String} [subIdDefault] Subscription ID, if omitted you have to pass it in each returned function.
 */
module.exports = (creds, subIdDefault) => {
  if (!creds) {
    throw Error('Credentials was not passed')
  }
  try {
    return {
      getResourcegroups: (subscriptionId = subIdDefault) => getResourcegroups(creds, subscriptionId),
      getNamespaces: (subscriptionId = subIdDefault) => getNamespaces(creds, subscriptionId),
      getQueues: (subscriptionId = subIdDefault, namespaces) => getQueues(creds, subscriptionId, namespaces),
      getMessages: (subscriptionId = subIdDefault, idString, getStandardQueue) => getMessages(creds, subscriptionId, idString, getStandardQueue)
    }
    
  } catch (error) {
    throw error
  }

}
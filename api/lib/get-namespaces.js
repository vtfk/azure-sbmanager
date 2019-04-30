const armResources = require('@azure/arm-resources')
const idStringParser = require('./get-resourcenames-from-id')

module.exports = async function getNamespaces(credentials, subscriptionId) {
  try {
    if (!credentials) {throw Error('Parameter credentials was not passed')}
    if (!subscriptionId) {throw Error('Parameter subscriptionId was not passed')}
    
    const resourceMgmClient = new armResources.ResourceManagementClient(
      credentials,
      subscriptionId
    )
    let namespaces = await resourceMgmClient.resources.list()
    namespaces = namespaces.filter(
      resource => resource.type === 'Microsoft.ServiceBus/namespaces'
    )
    return namespaces
  } catch (error) {
    throw error
  }
}
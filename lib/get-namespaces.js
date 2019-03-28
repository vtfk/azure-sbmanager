const armResources = require('@azure/arm-resources')
const idStringParser = require('./get-resourcenames-from-id')

module.exports = async function getNamespaces(credentials, subscriptionId) {
  try {
    const resourceMgmClient = new armResources.ResourceManagementClient(
      credentials,
      subscriptionId
    )
    let namespaces = await resourceMgmClient.resources.list()
    namespaces = namespaces.filter(
      resource => resource.type === 'Microsoft.ServiceBus/namespaces'
    )
    return namespaces.map(namespace => ({
      resourceGroupName: idStringParser(namespace.id).resGroup,
      ...namespace
    }))
  } catch (error) {
    throw error
  }
}
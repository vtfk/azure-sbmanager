const armResources = require('@azure/arm-resources')

module.exports = async function getResourcegroups(credentials, subscriptionId) {
  try {
    if (!credentials) {throw Error('Parameter credentials was not passed')}
    if (!subscriptionId) {throw Error('Parameter subscriptionId was not passed')}
    
    const resourceMgmClient = new armResources.ResourceManagementClient(
      credentials,
      subscriptionId
    )
    return await resourceMgmClient.resourceGroups.list()
  } catch (error) {
    throw error
  }
  
}
const armResources = require('@azure/arm-resources')

module.exports = async function getResourcegroups(credentials, subscriptionId) {
  try {
    const resourceMgmClient = new armResources.ResourceManagementClient(
      credentials,
      subscriptionId
    )
    return await resourceMgmClient.resourceGroups.list()
  } catch (error) {
    throw error
  }
  
}
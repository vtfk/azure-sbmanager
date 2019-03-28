const armServiceBus = require('@azure/arm-servicebus')
const idStringParser = require('./get-resourcenames-from-id')

// TODO: Add support for array of namespace names only (if string {get namespaces; filter for name})
module.exports = async function getQueues(credentials, subscriptionId, namespaces) {
  try {
    if (!namespaces) {
      throw Error('Array of namespaces was not passed')
    }

    const sbMgmClient = new armServiceBus.ServiceBusManagementClient(
      credentials,
      subscriptionId
    )

    let allQueues = []
    // TODO: Add rate limiting
    await Promise.all(namespaces.map( async namespace => {
      let queues = await sbMgmClient.queues.listByNamespace(
        idStringParser(namespace.id).resGroup,
        namespace.name
      )
      // Push each queue into allQueues
      queues.map(queue => {
        allQueues.push({
          resourceGroupName: idStringParser(queue.id).resGroup,
          namespaceName: idStringParser(queue.id).namespace,
          ...queue
        })
      })
    }))
    return allQueues
  } catch (error) {
    throw error
  }
}

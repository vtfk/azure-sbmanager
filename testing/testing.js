const auth = require('../lib/authenticate')
const getResources = require('../lib/get-resources')

;(async () => {
  try {
    const {credentials, subscriptions} = await auth()
    
    const subId = subscriptions[0].id
    const resources = await getResources(credentials)

    console.log('####################')
    let resourceGroups = await resources.getResourcegroups(subId)
    console.log('####################')
    let namespaces = await resources.getNamespaces(subId)
    console.log('####################')
    let queues = await resources.getQueues(subId, namespaces)
    console.log(queues.map(queue => ({
      name: queue.name,
      res: queue.resourceGroupName,
      ns: queue.namespaceName
    })))

  } catch (error) {
    console.error(error)
  }
})()

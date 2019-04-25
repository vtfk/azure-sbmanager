const auth = require('../lib/authenticate')
const getResources = require('../lib/get-resources')

;(async () => {
  try {
    const {credentials, subscriptions} = await auth()
    
    const subId = subscriptions[0].id
    const resources = await getResources(credentials)

    let resourceGroups = await resources.getResourcegroups(subId)
    let namespaces = await resources.getNamespaces(subId)
    let queues = await resources.getQueues(subId, namespaces)

    let allResources = {
      resourceGroups: resourceGroups,
      namespaces: namespaces,
      queues: queues
    }
    console.log(allResources)

  } catch (error) {
    console.error(error)
  }
})()

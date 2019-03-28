const auth = require('../lib/authenticate')
const armServiceBus = require('@azure/arm-servicebus')
const armResources = require('@azure/arm-resources')
const connServiceBus = require('@azure/service-bus')


// https://github.com/Azure/azure-sdk-for-js/blob/master/packages/%40azure/servicebus/data-plane/examples/javascript/gettingStarted/browseMessages.js



function getResourceGroupFromId(idString) {
  const resGroupRegEx = /resourceGroups\/(?<resGroup>[^\/]*)/
  try {
    return resGroupRegEx.exec(idString).groups.resGroup
  } catch (error) {
    throw error
  }
}


;(async () => {
  // TODO: Subscription selection in UI (send over all subscriptions)
  const {credentials, subscriptions} = await auth()
  let subscriptionId = subscriptions[1].id

  const resourceMgmClient = new armResources.ResourceManagementClient(
    credentials,
    subscriptionId
  )
  const sbMgmClient = new armServiceBus.ServiceBusManagementClient(
    credentials,
    subscriptionId
  )

  
  // Get all resourcegroups and all servicebus namespaces
  let [resGroups, namespaces] = await Promise.all([
    resourceMgmClient.resourceGroups.list(),
    resourceMgmClient.resources.list()
  ])
  namespaces = namespaces.filter(
    resource => resource.type === 'Microsoft.ServiceBus/namespaces'
  )

  let parsedData = {}
  // Adding resourcegroups
  parsedData.resourceGroups = resGroups
  
  // Adding namespaces with resgroup reference
  parsedData.namespaces = namespaces.map(namespace => ({
    resourceGroupName: getResourceGroupFromId(namespace.id),
    ...namespace
  }))

  // Adding queues with resgroup and namespace reference
  parsedData.queues = []
  await Promise.all(parsedData.namespaces.map( async namespace => {
    let queues = await sbMgmClient.queues.listByNamespace(
      namespace.resourceGroupName,
      namespace.name
    )
    // Push each queue into parsedData.queues
    queues.map(queue => {
      parsedData.queues.push({
        resourceGroupName: namespace.resourceGroupName,
        namespaceName: namespace.name,
        ...queue
      })
    })
  }))
  
  console.log("###################")
  console.log(parsedData)

  const queueMess = await sbMgmClient.queues.get('tfkdevtest', 'tfkdevtest', 'sherexdevqueue')

  console.log(queueMess)
  //*/
})().catch(err => {
  console.error(err)
})

// Data structure
let structure = [
  resourcegsroups = {
    name: "tfkdevtest",
    namespaces: [
      {
        name: "tfkdevtest",
        queues: [
          {
            name: "sherexdevqueue",
            data: {}
          }
        ],
        data: {}
      }
    ],
    data: {}
  }
]

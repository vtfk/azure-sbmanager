require('dotenv').config()
const auth = require('../lib/authenticate')
const armServiceBus = require('@azure/arm-servicebus')
const armResources = require('@azure/arm-resources');


(async () => {

  const authRes = await auth()
  const creds = authRes.credentials
  const subscriptionId = authRes.subscriptions[0].id

  const resourceMgmClient = new armResources.ResourceManagementClient(creds, subscriptionId)
  // Get all resourcegroups
  const resourceGroups = await resourceMgmClient.resourceGroups.list()

  // Get all servicebus namespaces
  const resources = await resourceMgmClient.resources.list()
  const sbNamespaces = resources
    .filter(resource => resource.type === 'Microsoft.ServiceBus/namespaces')

  console.log('##########################')
  console.log('Resourcegroups:')
  console.log(resourceGroups.map(rg => rg.name))
  console.log('##########################')
  console.log('SB Namespaces:')
  console.log(sbNamespaces.map(ns => ns.name))
  console.log('##########################')

  const sbMgmClient = new armServiceBus.ServiceBusManagementClient(creds, subscriptionId);

  let allQueues = {}

  // TODO: Restructure to send over RG and NS info
  // TODO: Support filtering for RG and NS

  for (let i = 0; i < resourceGroups.length; i++) {
    const rGroup = resourceGroups[i];
    console.log('| R | ' + rGroup.name)
    allQueues[rGroup.name] = {}

    let namespaces = await resourceMgmClient.resources.listByResourceGroup(rGroup.name)
    namespaces = namespaces.filter(
      resource => resource.type === 'Microsoft.ServiceBus/namespaces'
    )

    for (let j = 0; j < namespaces.length; j++) {
      const namespace = namespaces[j];
      console.log('| N |-- ' + namespace.name)

      let queues = await sbMgmClient.queues.listByNamespace(rGroup.name, namespace.name)
      queues.map(queue => {console.log('| Q |---- ' + queue.name)})
      allQueues[rGroup.name][namespace.name] = queues
      
    }

  }

  // const queues = await sbMgmClient.queues.listByNamespace('tfkdevtest', 'tfkdevtest')


  console.log(allQueues)
})().catch(err => {
  console.error(err)
})

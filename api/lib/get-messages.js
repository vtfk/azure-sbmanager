const {Namespace} = require('@azure/service-bus')
const idStringParser = require('./get-resourcenames-from-id')
const getConnectionString = require('./get-or-create-conn-string')


// TODO: Add support for Topics and Subscriptions

module.exports = async function getQueueMessages(credentials, subscriptionId, idString, getStandardQueue = false) {
  try {

    if (!credentials) {throw Error('Parameter credentials was not passed')}
    if (!subscriptionId) {throw Error('Parameter subscriptionId was not passed')}
    if (!idString) {throw Error('Parameter idString was not passed')}

    const id = idStringParser(idString)

    const connectionString = await getConnectionString(credentials, subscriptionId, idString)
    const qClient = Namespace.createFromConnectionString(connectionString[0])

    let queueName

    if (getStandardQueue) {
      queueName = id.queue
    } else {
      queueName = Namespace.getDeadLetterQueuePath(id.queue)
    }

    const receiver = qClient.createQueueClient(queueName).getReceiver()
    const messages = await receiver.receiveBatch(1)

    await qClient.close()

    return messages
    
  } catch (error) {
    throw error
  }
}

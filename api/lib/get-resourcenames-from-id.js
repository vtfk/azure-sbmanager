/**
 * Parses an Subscription ID String Azure
 * @param {String} idString ID string of the resource
 * @returns {Object} Contains whatever resources that´s specified in the ID
 */
module.exports = (idString) => {
  const resGroupRegEx = new RegExp(
    ['(?:.*resourceGroups\/(?<resGroup>[^\/]*))?',
    '(?:.*namespaces\/(?<namespace>[^\/]*))?',
    '(?:.*queues\/(?<queue>[^\/]*))?'].join('')
  )

  try {
    let result = resGroupRegEx.exec(idString).groups
    // Cleaner output
    let resources = {}
    for ( group in result ) {
      if (result[group]) {
        resources[group] = result[group]
      }
    }
    result.resGroup ? resources.resGroup = result.resGroup : null
    return resources
  } catch (error) {
    throw error
  }
}
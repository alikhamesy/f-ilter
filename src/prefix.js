import cache, { writeToCache } from './cache'

const prefix = () => cache().prefix

const setPrefix = newPrefix => {
  if (typeof (newPrefix) !== "string") {
    console.warn(`Attempting to set prefix to non-string '${newPrefix}'`)
    return
  } else if (newPrefix === cache().prefix) {
    console.warn(`Attempting to set prefix to current prefix`)
    return
  }
  writeToCache({ prefix: newPrefix })
}

export {
  prefix,
  setPrefix
}
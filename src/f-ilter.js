import cache from "./cache"

const filter = (msg) => {
  const fList = cache().fList ?? []
  if (fList.includes(msg.channel.id) && msg.content !== 'F') {
    msg.delete()
    return true
  }
  return false
}


export default filter
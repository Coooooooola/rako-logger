function print(prefix, producerName, newState, oldState, {type, substate, isSync}) {
  console.group(`%c${prefix}${producerName}.${type}%c` + (isSync ? '%c' : '  %c(async)'), 'color:#fff;background:#4d5f77;font-size:1rem;padding:2px 4px', '', 'color:#fff;background:#b00404;font-size:1rem;padding:2px 4px')
  console.log('%csubstate ', 'color:#3482bb;font-size:1rem;font-weight:700', substate)
  console.log('%cnew state', 'color:#7e2083;font-size:1rem;font-weight:700', newState)
  console.log('%cold state', 'color:#1a8323;font-size:1rem;font-weight:700', oldState)
  console.groupEnd()
}

function logger(moduleName) {
  const prefix = moduleName === undefined ? '' : `${moduleName}.`
  return producer => {
    const producerName = producer.displayName || producer.name
    return getState => {
      console.group(`%c${prefix}${producerName}`, 'color:#fff;background:#4d5f77;font-size:1rem;padding:2px 4px')
      console.log('%cstate', 'color:#27089e;font-size:1rem;font-weight:700', getState())
      console.groupEnd()

      return next => action => {
        const oldState = getState()
        const ret = next(action)
        const newState = getState()

        if (oldState !== newState) {
          print(prefix, producerName, newState, oldState, action)
        }

        return ret
      }
    }
  }
}

export {
  logger
}

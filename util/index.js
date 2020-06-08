const addOption = (program, options = {}) => {
  console.log('adsadasd',options)
  Object.keys(options).forEach(key => {
    try{
      console.log(options[key])
      const config = require(options[key])
      console.log(config)
    }catch(err){
      console.error(`failed to parse command ${key}, please add it again`, err)
    }
  })
}

module.exports = {
  addOption
}
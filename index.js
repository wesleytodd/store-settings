var Settings = module.exports = function Settings (opts) {
  opts = opts || {}
  this.parent = null
  this.settings = {}
  this._setters = opts.setters || {}
}

Settings.prototype.set = function (setting, val) {
  this.settings[setting] = val

  if (this._setters[setting]) {
    this._setters[setting].call(this, val)
  }

  return this
}

Settings.prototype.get = function (setting) {
  var val = this.settings[setting]
  return (typeof val !== 'undefined') ? val : (this.parent) ? this.parent.get(setting) : undefined
}

Settings.prototype.extend = function (setting, val) {
  var currentSetting = this.settings[setting]

  if (typeof val === 'undefined') {
    return this
  } else if (val === null || typeof val !== 'object') {
    throw new Error('value needs to be an object')
  }

  // no object yet, set value
  if (currentSetting === null || typeof currentSetting !== 'object') {
    this.settings[setting] = val
    return this
  }

  // extend from the intial object type
  var newObject = Array.isArray(this.settings[setting]) ? [] : {}

  // extend value
  this.settings[setting] = Object.assign(newObject, this.settings[setting], val)
  return this
}

Settings.prototype.enable = function (setting) {
  return this.set(setting, true)
}

Settings.prototype.disable = function (setting) {
  return this.set(setting, false)
}

Settings.prototype.enabled = function (setting) {
  return !!this.get(setting)
}

Settings.prototype.disabled = function (setting) {
  return !this.get(setting)
}

Settings.prototype.inheritFrom = function (parent) {
  this.parent = parent
}

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

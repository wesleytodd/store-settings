var Settings = module.exports = function Settings (opts) {
	opts = opts || {};
	this.settings = {};
	this._setters = opts.setters || {};
};

Settings.prototype.set = function (setting, val) {
	if (arguments.length === 1) {
		return this.settings[setting];
	}

	this.settings[setting] = val;

	if (this._setters[setting]) {
		this._setters[setting].call(this, val);
	}

	return this;
};

Settings.prototype.get = function (setting) {
	return this.settings[setting];
};

Settings.prototype.enable = function (setting) {
	return this.set(setting, true);
};

Settings.prototype.enabled = function (setting) {
	return Boolean(this.set(setting));
};

Settings.prototype.disable = function (setting) {
	return this.set(setting, false);
};

Settings.prototype.disabled = function (setting) {
	return !this.get(setting);
};

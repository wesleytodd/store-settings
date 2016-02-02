export class Settings {
	constructor (opts = {}) {
		this.settings = {};
		this._setters = opts.setters || {};
	}

	set (setting, val) {
		if (arguments.length === 1) {
			return this.settings[setting];
		}

		this.settings[setting] = val;

		if (this._setters[setting]) {
			this._setters[setting].call(this, val);
		}

		return this;
	}

	get (setting) {
		return this.settings[setting];
	}

	enable (setting) {
		return this.set(setting, true);
	}

	enabled (setting) {
		return Boolean(this.set(setting));
	}

	disable (setting) {
		return this.set(setting, false);
	}

	disabled (setting) {
		return !this.get(setting);
	}
}

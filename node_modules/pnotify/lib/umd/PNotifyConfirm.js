(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define("PNotifyConfirm", ["exports", "PNotify"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("./PNotify"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.PNotify);
		global.PNotifyConfirm = mod.exports;
	}
})(this, function (exports, _PNotify) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _PNotify2 = _interopRequireDefault(_PNotify);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function data() {
		return _extends({
			"_notice": null, // The PNotify notice.
			"_options": {} // The options for the notice.
		}, _PNotify2.default.modules.Confirm.defaults);
	};

	var methods = {
		initModule: function initModule(options) {
			this.set(options);
		},
		afterOpen: function afterOpen() {
			if (this.get("prompt")) {
				if (this.get("prompt_multi_line")) {
					this.refs.promptMulti.focus();
				} else {
					this.refs.promptSingle.focus();
				}
			}
		},
		handleClick: function handleClick(button, event) {
			if (button.click) {
				button.click(this.get("_notice"), this.get("prompt") ? this.get("prompt_value") : null, event);
			}
		},
		handleKeyPress: function handleKeyPress(event) {
			if (event.keyCode == 13 && !event.shiftKey) {
				event.preventDefault();
				var buttons = this.get("buttons");
				for (var i = 0; i < buttons.length; i++) {
					if (buttons[i].promptTrigger && buttons[i].click) {
						buttons[i].click(this.get("_notice"), this.get("prompt") ? this.get("prompt_value") : null, event);
					}
				}
			}
		}
	};

	function oncreate() {
		this.fire("init", { module: this });
	};

	function setup(Component) {
		Component.key = "Confirm";

		Component.defaults = {
			// Make a confirmation box.
			confirm: false,
			// Make a prompt.
			prompt: false,
			// Classes to add to the input element of the prompt.
			prompt_class: "",
			// The value of the prompt.
			prompt_value: "",
			// Whether the prompt should accept multiple lines of text.
			prompt_multi_line: false,
			// Where to align the buttons. (right, center, left, justify)
			align: "right",
			// The buttons to display, and their callbacks.
			buttons: [{
				text: "Ok",
				trustText: false,
				addClass: "",
				primary: true,
				// Whether to trigger this button when the user hits enter in a single line prompt.
				promptTrigger: true,
				click: function click(notice, value) {
					notice.close();
					notice.fire("pnotify.confirm", { notice: notice, value: value });
				}
			}, {
				text: "Cancel",
				trustText: false,
				addClass: "",
				click: function click(notice) {
					notice.close();
					notice.fire("pnotify.cancel", { notice: notice });
				}
			}]
		};

		// Register the module with PNotify.
		_PNotify2.default.modules.Confirm = Component;
		// Append this module to the container.
		_PNotify2.default.modulesAppendContainer.push(Component);

		// Add button styles to styling objects.
		_extends(_PNotify2.default.styling.brighttheme, {
			action_bar: "",
			btn: "",
			btn_primary: "brighttheme-primary",
			input: ""
		});
		_extends(_PNotify2.default.styling.bootstrap3, {
			action_bar: "ui-pnotify-confirm-ml",
			btn: "btn btn-default",
			btn_primary: "btn btn-default btn-primary",
			input: "form-control"
		});
		_extends(_PNotify2.default.styling.bootstrap4, {
			action_bar: "ui-pnotify-confirm-ml",
			btn: "btn btn-secondary ml-1",
			btn_primary: "btn btn-primary ml-1",
			input: "form-control"
		});
		if (!_PNotify2.default.styling.material) {
			_PNotify2.default.styling.material = {};
		}
		_extends(_PNotify2.default.styling.material, {
			action_bar: "",
			btn: "",
			btn_primary: "ui-pnotify-material-primary",
			input: ""
		});
	};

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-3546993901-style';
		style.textContent = ".ui-pnotify-action-bar{margin-top:5px;clear:both}.ui-pnotify-prompt-input{margin-bottom:5px;clear:both}.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-action-bar.ui-pnotify-confirm-ml{margin-left:24px}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var if_block_anchor;

		var if_block = (state.confirm || state.prompt) && create_if_block(state, component);

		return {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insertNode(if_block_anchor, target, anchor);
			},

			p: function update(changed, state) {
				if (state.confirm || state.prompt) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}
			},

			u: function unmount() {
				if (if_block) if_block.u();
				detachNode(if_block_anchor);
			},

			d: function destroy() {
				if (if_block) if_block.d();
			}
		};
	}

	// (10:6) {{#if prompt_multi_line}}
	function create_if_block_2(state, component) {
		var textarea,
		    textarea_updating = false,
		    textarea_class_value;

		function textarea_input_handler() {
			textarea_updating = true;
			component.set({ prompt_value: textarea.value });
			textarea_updating = false;
		}

		function keypress_handler(event) {
			component.handleKeyPress(event);
		}

		return {
			c: function create() {
				textarea = createElement("textarea");
				this.h();
			},

			h: function hydrate() {
				addListener(textarea, "input", textarea_input_handler);
				textarea.rows = "5";
				textarea.className = textarea_class_value = "\n              ui-pnotify-prompt-input\n              " + (state._notice.get('_styles').input ? state._notice.get('_styles').input : '') + "\n              " + state.prompt_class + "\n            ";
				addListener(textarea, "keypress", keypress_handler);
			},

			m: function mount(target, anchor) {
				insertNode(textarea, target, anchor);
				component.refs.promptMulti = textarea;

				textarea.value = state.prompt_value;
			},

			p: function update(changed, state) {
				if (!textarea_updating) textarea.value = state.prompt_value;
				if ((changed._notice || changed.prompt_class) && textarea_class_value !== (textarea_class_value = "\n              ui-pnotify-prompt-input\n              " + (state._notice.get('_styles').input ? state._notice.get('_styles').input : '') + "\n              " + state.prompt_class + "\n            ")) {
					textarea.className = textarea_class_value;
				}
			},

			u: function unmount() {
				detachNode(textarea);
			},

			d: function destroy() {
				removeListener(textarea, "input", textarea_input_handler);
				removeListener(textarea, "keypress", keypress_handler);
				if (component.refs.promptMulti === textarea) component.refs.promptMulti = null;
			}
		};
	}

	// (21:6) {{else}}
	function create_if_block_3(state, component) {
		var input,
		    input_updating = false,
		    input_class_value;

		function input_input_handler() {
			input_updating = true;
			component.set({ prompt_value: input.value });
			input_updating = false;
		}

		function keypress_handler(event) {
			component.handleKeyPress(event);
		}

		return {
			c: function create() {
				input = createElement("input");
				this.h();
			},

			h: function hydrate() {
				addListener(input, "input", input_input_handler);
				input.type = "text";
				input.className = input_class_value = "\n              ui-pnotify-prompt-input\n              " + (state._notice.get('_styles').input ? state._notice.get('_styles').input : '') + "\n              " + state.prompt_class + "\n            ";
				addListener(input, "keypress", keypress_handler);
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);
				component.refs.promptSingle = input;

				input.value = state.prompt_value;
			},

			p: function update(changed, state) {
				if (!input_updating) input.value = state.prompt_value;
				if ((changed._notice || changed.prompt_class) && input_class_value !== (input_class_value = "\n              ui-pnotify-prompt-input\n              " + (state._notice.get('_styles').input ? state._notice.get('_styles').input : '') + "\n              " + state.prompt_class + "\n            ")) {
					input.className = input_class_value;
				}
			},

			u: function unmount() {
				detachNode(input);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				removeListener(input, "keypress", keypress_handler);
				if (component.refs.promptSingle === input) component.refs.promptSingle = null;
			}
		};
	}

	// (9:4) {{#if prompt}}
	function create_if_block_1(state, component) {
		var if_block_anchor;

		var current_block_type = select_block_type(state);
		var if_block = current_block_type(state, component);

		return {
			c: function create() {
				if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if_block.m(target, anchor);
				insertNode(if_block_anchor, target, anchor);
			},

			p: function update(changed, state) {
				if (current_block_type === (current_block_type = select_block_type(state)) && if_block) {
					if_block.p(changed, state);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, component);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			},

			u: function unmount() {
				if_block.u();
				detachNode(if_block_anchor);
			},

			d: function destroy() {
				if_block.d();
			}
		};
	}

	// (34:4) {{#each buttons as button}}
	function create_each_block(state, buttons, button, button_index, component) {
		var button_1, button_1_class_value;

		var current_block_type = select_block_type_1(state, buttons, button, button_index);
		var if_block = current_block_type(state, buttons, button, button_index, component);

		return {
			c: function create() {
				button_1 = createElement("button");
				if_block.c();
				this.h();
			},

			h: function hydrate() {
				button_1.type = "button";
				button_1.className = button_1_class_value = "\n            ui-pnotify-action-button\n            " + (button.primary ? state._notice.get('_styles').btn_primary ? state._notice.get('_styles').btn_primary : '' : state._notice.get('_styles').btn ? state._notice.get('_styles').btn : '') + "\n            " + (button.addClass ? button.addClass : '') + "\n          ";
				addListener(button_1, "click", click_handler);

				button_1._svelte = {
					component: component,
					buttons: buttons,
					button_index: button_index
				};
			},

			m: function mount(target, anchor) {
				insertNode(button_1, target, anchor);
				if_block.m(button_1, null);
			},

			p: function update(changed, state, buttons, button, button_index) {
				if (current_block_type === (current_block_type = select_block_type_1(state, buttons, button, button_index)) && if_block) {
					if_block.p(changed, state, buttons, button, button_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, buttons, button, button_index, component);
					if_block.c();
					if_block.m(button_1, null);
				}

				if ((changed.buttons || changed._notice) && button_1_class_value !== (button_1_class_value = "\n            ui-pnotify-action-button\n            " + (button.primary ? state._notice.get('_styles').btn_primary ? state._notice.get('_styles').btn_primary : '' : state._notice.get('_styles').btn ? state._notice.get('_styles').btn : '') + "\n            " + (button.addClass ? button.addClass : '') + "\n          ")) {
					button_1.className = button_1_class_value;
				}

				button_1._svelte.buttons = buttons;
				button_1._svelte.button_index = button_index;
			},

			u: function unmount() {
				detachNode(button_1);
				if_block.u();
			},

			d: function destroy() {
				if_block.d();
				removeListener(button_1, "click", click_handler);
			}
		};
	}

	// (42:12) {{#if button.trustText}}
	function create_if_block_4(state, buttons, button, button_index, component) {
		var raw_value = button.text,
		    raw_before,
		    raw_after;

		return {
			c: function create() {
				raw_before = createElement('noscript');
				raw_after = createElement('noscript');
			},

			m: function mount(target, anchor) {
				insertNode(raw_before, target, anchor);
				raw_before.insertAdjacentHTML("afterend", raw_value);
				insertNode(raw_after, target, anchor);
			},

			p: function update(changed, state, buttons, button, button_index) {
				if (changed.buttons && raw_value !== (raw_value = button.text)) {
					detachBetween(raw_before, raw_after);
					raw_before.insertAdjacentHTML("afterend", raw_value);
				}
			},

			u: function unmount() {
				detachBetween(raw_before, raw_after);

				detachNode(raw_before);
				detachNode(raw_after);
			},

			d: noop
		};
	}

	// (42:60) }{
	function create_if_block_5(state, buttons, button, button_index, component) {
		var text_value = button.text,
		    text;

		return {
			c: function create() {
				text = createText(text_value);
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
			},

			p: function update(changed, state, buttons, button, button_index) {
				if (changed.buttons && text_value !== (text_value = button.text)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(text);
			},

			d: noop
		};
	}

	// (1:0) {{#if confirm || prompt}}
	function create_if_block(state, component) {
		var div, text, div_class_value;

		var if_block = state.prompt && create_if_block_1(state, component);

		var buttons = state.buttons;

		var each_blocks = [];

		for (var i = 0; i < buttons.length; i += 1) {
			each_blocks[i] = create_each_block(state, buttons, buttons[i], i, component);
		}

		return {
			c: function create() {
				div = createElement("div");
				if (if_block) if_block.c();
				text = createText("\n    ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				this.h();
			},

			h: function hydrate() {
				div.className = div_class_value = "\n        ui-pnotify-action-bar\n        " + (state._notice.get('_styles').action_bar ? state._notice.get('_styles').action_bar : '') + "\n        " + (state._notice.get('_styles').text ? state._notice.get('_styles').text : '') + "\n      ";
				setStyle(div, "text-align", state.align);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				if (if_block) if_block.m(div, null);
				appendNode(text, div);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}
			},

			p: function update(changed, state) {
				if (state.prompt) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block_1(state, component);
						if_block.c();
						if_block.m(div, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				var buttons = state.buttons;

				if (changed.buttons || changed._notice) {
					for (var i = 0; i < buttons.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, buttons, buttons[i], i);
						} else {
							each_blocks[i] = create_each_block(state, buttons, buttons[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(div, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = buttons.length;
				}

				if (changed._notice && div_class_value !== (div_class_value = "\n        ui-pnotify-action-bar\n        " + (state._notice.get('_styles').action_bar ? state._notice.get('_styles').action_bar : '') + "\n        " + (state._notice.get('_styles').text ? state._notice.get('_styles').text : '') + "\n      ")) {
					div.className = div_class_value;
				}

				if (changed.align) {
					setStyle(div, "text-align", state.align);
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				if (if_block) if_block.d();

				destroyEach(each_blocks);
			}
		};
	}

	function select_block_type(state) {
		if (state.prompt_multi_line) return create_if_block_2;
		return create_if_block_3;
	}

	function select_block_type_1(state, buttons, button, button_index) {
		if (button.trustText) return create_if_block_4;
		return create_if_block_5;
	}

	function click_handler(event) {
		var component = this._svelte.component;
		var buttons = this._svelte.buttons,
		    button_index = this._svelte.button_index,
		    button = buttons[button_index];
		component.handleClick(button, event);
	}

	function PNotifyConfirm(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data(), options.data);

		if (!document.getElementById("svelte-3546993901-style")) add_css();

		var _oncreate = oncreate.bind(this);

		if (!options.root) {
			this._oncreate = [_oncreate];
		} else {
			this.root._oncreate.push(_oncreate);
		}

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);

			callAll(this._oncreate);
		}
	}

	assign(PNotifyConfirm.prototype, methods, {
		destroy: destroy,
		get: get,
		fire: fire,
		observe: observe,
		on: on,
		set: set,
		teardown: destroy,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount
	});

	PNotifyConfirm.prototype._recompute = noop;

	setup(PNotifyConfirm);

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function createComment() {
		return document.createComment('');
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function detachBetween(before, after) {
		while (before.nextSibling && before.nextSibling !== after) {
			before.parentNode.removeChild(before.nextSibling);
		}
	}

	function noop() {}

	function createText(data) {
		return document.createTextNode(data);
	}

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function destroyEach(iterations) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d();
		}
	}

	function init(component, options) {
		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.store || options.store;
	}

	function assign(target) {
		var k,
		    source,
		    i = 1,
		    len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) {
				target[k] = source[k];
			}
		}

		return target;
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.pop()();
		}
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = this.get = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = this._state = null;
	}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer ? this._observers.post : this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function cancel() {
				var index = group[key].indexOf(callback);
				if (~index) group[key].splice(index, 1);
			}
		};
	}

	function on(eventName, handler) {
		if (eventName === 'teardown') return this.on('destroy', handler);

		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		for (var key in newState) {
			if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
			this._fragment.p(changed, this._state);
			dispatchObservers(this, this._observers.post, changed, this._state, oldState);
		}
	}

	function _mount(target, anchor) {
		this._fragment.m(target, anchor);
	}

	function _unmount() {
		if (this._fragment) this._fragment.u();
	}

	function blankObject() {
		return Object.create(null);
	}

	function differs(a, b) {
		return a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function dispatchObservers(component, group, changed, newState, oldState) {
		for (var key in group) {
			if (!changed[key]) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
	exports.default = PNotifyConfirm;
});
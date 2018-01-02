"use strict";
exports.__esModule = true;
/**
 * @class
 * @static
 * @description JSEvents is a static class that implements the
 * custom event functionality. call the static init method and global
 * object where you want to bind the JSEvents
 */
var JSEvents = /** @class */ (function () {
    function JSEvents() {
    }
    /**
     * @name addEventListener
     * @static
     * @method
     * @memberOf JSEvents
     * @param {string} name
     * @param {function} callback
     * @param {object} scope
     * @description this function registeres the event
     * @returns {null} this function does not return anything
     */
    JSEvents.addEventListener = function (name, callback, scope) {
        // basic validation
        if (!name) {
            throw new Error("An Event must have a valid name");
        }
        if (!callback) {
            throw new Error("An Event must have a valid callback function");
        }
        // create dynamic arguments array
        var args = [];
        for (var i = 0; i <= arguments.length; i++) {
            args.push(arguments[i]);
        }
        // if event is not present in our registry then add.key,
        if (!JSEvents.events[name]) {
            JSEvents.events[name] = [{ scope: scope, callback: callback, args: args }];
        }
        else {
            // add to existing array
            JSEvents.events[name].push({ scope: scope, callback: callback, args: args });
        }
    };
    /**
     * @name removeEventListener
     * @static
     * @method
     * @memberOf JSEvents
     * @param {string} name
     * @param {function} callback
     * @param {object} scope
     * @description this function will remove registered the event
     * @returns {null} this function does not return anything
     */
    JSEvents.removeEventListener = function (name, callback, scope) {
        // basic validation
        if (!name) {
            throw new Error("An Event must have a valid name inorder to remove it");
        }
        if (!callback) {
            throw new Error("An Event must have a valid callback function to remove it");
        }
        // check if exists
        if (JSEvents.events[name]) {
            // new array to store filtered events
            var newArray = [];
            newArray = JSEvents.events[name].filter(function (current) {
                return (!current.scope === scope || !current.callback === callback);
            });
            // replace the existing array with filtered array
            JSEvents.events[name] = newArray;
            // remove key if required
            if (JSEvents.events[name].length === 0) {
                delete JSEvents.events[name];
            }
        }
    };
    /**
     * @name hasEventListener
     * @static
     * @method
     * @memberOf JSEvents
     * @param {string} name
     * @param {function} callback
     * @param {object} scope
     * @description this function check and return true/false if the event has
     * any registered listener
     * @returns {boolean} return true if the event has any listener
     */
    JSEvents.hasEventListener = function (name, callback, scope) {
        // basic validation
        if (!name) {
            throw new Error("An Event must have a valid name");
        }
        if (!callback) {
            throw new Error("An Event must have a valid callback function");
        }
        // check if exists
        if (JSEvents.events[name]) {
            if (JSEvents.events[name].length === 0) {
                return false;
            }
            else {
                var exists = false;
                for (var _i = 0, _a = JSEvents.events[name]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (!item.scope === scope || !item.callback === callback) {
                        exists = true;
                        break;
                    }
                }
                return exists === true;
            }
        }
    };
    /**
     * @name dispatchEvent
     * @static
     * @method
     * @memberOf JSEvents
     * @param {string} name
     * @param {any} data
     * @description this function check and return true/false if the event has
     * any registered listener
     * @returns {null} this function does not return anything
     */
    JSEvents.dispatchEvent = function (name, data) {
        // original event data
        var evData = {
            data: data,
            name: name,
            scope: null
        };
        // basic validation
        if (!name) {
            throw new Error("An Event must have a valid name");
        }
        // check
        if (JSEvents.events[name]) {
            // if has listeners
            if (JSEvents.events[name].length > 0) {
                var tempEvent = JSEvents.events[name];
                // itrate over all listeners
                for (var _i = 0, tempEvent_1 = tempEvent; _i < tempEvent_1.length; _i++) {
                    var ev = tempEvent_1[_i];
                    evData.scope = ev.scope;
                    if (ev.callback && typeof ev.callback === "function") {
                        // fire
                        ev.callback(evData, data);
                    }
                }
            }
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("No event with name " + name + " exists in the JSEvents store");
        }
    };
    JSEvents.events = {};
    return JSEvents;
}());
Object.defineProperty(window, "JSEvents", JSEvents);
exports["default"] = JSEvents;

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
            throw new Error('An Event must have a valid name');
        }
        if (!callback) {
            throw new Error('An Event must have a valid callback function');
        }
        if (!scope) {
            throw new Error('An Event must have a valid scope');
        }
        // create dynamic arguments array
        var args = [];
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < arguments.length; i++) {
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
            throw new Error('An Event must have a valid name inorder to remove it');
        }
        if (!callback) {
            throw new Error('An Event must have a valid callback function to remove it');
        }
        if (!scope) {
            throw new Error('An Event must have a valid scope');
        }
        // check if exists
        if (JSEvents.events[name]) {
            // new array to store filtered events
            var newArray = [];
            newArray = JSEvents.events[name].filter(function (current) {
                return (!(current.scope === scope) || !(current.callback === callback));
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
            throw new Error('An Event must have a valid name');
        }
        if (!callback) {
            throw new Error('An Event must have a valid callback function');
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
                    // tslint:disable
                    if ((item.scope === scope) && (item.callback === callback)) {
                        exists = true;
                        break;
                    }
                }
                return exists === true;
            }
        }
        return false;
    };
    /**
     * @name dispatchEvent
     * @static
     * @method
     * @memberOf JSEvents
     * @param {string} name
     * @param {any} data
     * @description this function will fire the registered event
     * @returns {null} this function does not return anything
     */
    JSEvents.dispatchEvent = function (name, data) {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        args.splice(0, 1); //remove first argument
        // original event data
        var evData = {
            data: args,
            name: name,
            target: null
        };
        // basic validation
        if (!name) {
            throw new Error('An Event must have a valid name');
        }
        // check
        if (JSEvents.events[name]) {
            // if has listeners
            if (JSEvents.events[name].length > 0) {
                var tempEvent = JSEvents.events[name];
                // itrate over all listeners
                for (var _i = 0, tempEvent_1 = tempEvent; _i < tempEvent_1.length; _i++) {
                    var ev = tempEvent_1[_i];
                    evData.target = ev.scope;
                    var concatArgs = [evData].concat(args);
                    if (ev.callback && typeof ev.callback === 'function') {
                        // fire
                        ev.callback.apply(evData, concatArgs);
                    }
                }
            }
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("No event with name " + name + " exists in the JSEvents store");
        }
    };
    /**
     * @name getRegisteredEvents
     * @static
     * @method
     * @memberOf JSEvents
     * @description this function return all the events registered in the store
     * @returns {object} this getter will return all the registered events
     */
    JSEvents.getRegisteredEvents = function () {
        return JSEvents.events;
    };
    JSEvents.events = {};
    return JSEvents;
}());
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = JSEvents;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return JSEvents;
        });
    }
    else {
        window['JSEvents'] = JSEvents;
    }
}

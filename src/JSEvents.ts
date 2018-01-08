type ICallback = ( evData: object, args: any ) => void;

interface IEvent {
  scope: object;
  callback: ICallback;
  args: any[];
}

interface IEventBus {
  [key: string]: IEvent[];
}

interface IRawEvent {
  name: string;
  data: any[];
  target: object;
}

/**
 * @class
 * @static
 * @description JSEvents is a static class that implements the
 * custom event functionality. call the static init method and global
 * object where you want to bind the JSEvents
 */

 class JSEvents {
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
  public static addEventListener(name: string, callback: ICallback, scope: object ): void {
    // basic validation
    if (!name) {
      throw new Error('An Event must have a valid name');
    }
    if (!callback) {
      throw new Error ('An Event must have a valid callback function');
    }
    if (!scope) {
      throw new Error ('An Event must have a valid scope');
    }
    // create dynamic arguments array
    const args: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i: number = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    // if event is not present in our registry then add.key,
    if (!JSEvents.events[name]) {
      JSEvents.events[name] = [{ scope, callback, args }];
    } else {
      // add to existing array
      JSEvents.events[name].push({ scope, callback, args });
    }
  }
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
  public static removeEventListener(name: string, callback: ICallback, scope: object ): void {
    // basic validation
    if (!name) {
      throw new Error('An Event must have a valid name inorder to remove it');
    }
    if (!callback) {
      throw new Error ('An Event must have a valid callback function to remove it');
    }
    if (!scope) {
      throw new Error ('An Event must have a valid scope');
    }
    // check if exists
    if (JSEvents.events[name]) {
      // new array to store filtered events
      let newArray: IEvent[] = [];
      newArray = JSEvents.events[name].filter(( current ) => {
        return (!(current.scope === scope) || !(current.callback === callback));
      });
      // replace the existing array with filtered array
      JSEvents.events[name] = newArray;
      // remove key if required
      if (JSEvents.events[name].length === 0) {
        delete JSEvents.events[name];
      }
    }
  }
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
  public static hasEventListener(name: string, callback: ICallback, scope: object): boolean {
    // basic validation
    if (!name) {
      throw new Error('An Event must have a valid name');
    }
    if (!callback) {
      throw new Error ('An Event must have a valid callback function');
    }
    // check if exists
    if (JSEvents.events[name]) {
      if (JSEvents.events[name].length === 0) {
        return false;
      } else {
        let exists = false;
        for (const item of JSEvents.events[name]) {
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
  }
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
  public static dispatchEvent(name: string, data: any): void {
    const args:any[]=[];
    for (let i: number = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.splice(0,1); //remove first argument
    // original event data
    const evData: IRawEvent = {
      data:args,
      name,
      target: null,
    };
    // basic validation
    if (!name) {
      throw new Error('An Event must have a valid name');
    }
    // check
    if (JSEvents.events[name]) {
      // if has listeners
      if (JSEvents.events[name].length > 0) {
        const tempEvent = JSEvents.events[name];
        // itrate over all listeners
        for (const ev of tempEvent) {
          evData.target = ev.scope;
          const concatArgs= [evData].concat(args);
          if (ev.callback && typeof ev.callback === 'function') {
            // fire
            ev.callback.apply(evData, concatArgs);
          }
        }
      }
    } else {
      // tslint:disable-next-line:no-console
      console.warn(`No event with name ${name} exists in the JSEvents store`);
    }
  }
  /**
   * @name getRegisteredEvents
   * @static
   * @method
   * @memberOf JSEvents
   * @description this function return all the events registered in the store
   * @returns {object} this getter will return all the registered events
   */
  public static getRegisteredEvents():IEventBus {
    return JSEvents.events;
  }
  private static events: IEventBus = {};
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = JSEvents;
}
else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return JSEvents;
    });
  }
  else {
    window['JSEvents'] = JSEvents;
  }
}



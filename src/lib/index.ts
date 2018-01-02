import { ICallback, IEvent, IEventBus, IRawEvent } from "./Iindex";
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
  public static addEventListener(name: string, callback: ICallback, scope: object): void {
    // basic validation
    if (!name) {
      throw new Error("An Event must have a valid name");
    }
    if (!callback) {
      throw new Error ("An Event must have a valid callback function");
    }
    // create dynamic arguments array
    const args: any[] = [];
    for (let i: number = 0; i <= arguments.length; i++) {
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
  public static removeEventListener(name: string, callback: ICallback, scope: object): void {
    // basic validation
    if (!name) {
      throw new Error("An Event must have a valid name inorder to remove it");
    }
    if (!callback) {
      throw new Error ("An Event must have a valid callback function to remove it");
    }
    // check if exists
    if (JSEvents.events[name]) {
      // new array to store filtered events
      let newArray: IEvent[] = [];
      newArray = JSEvents.events[name].filter(( current ) => {
        return (!current.scope === scope || !current.callback === callback);
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
      throw new Error("An Event must have a valid name");
    }
    if (!callback) {
      throw new Error ("An Event must have a valid callback function");
    }
    // check if exists
    if (JSEvents.events[name]) {
      if (JSEvents.events[name].length === 0) {
        return false;
      } else {
        let exists = false;
        for (const item of JSEvents.events[name]) {
          if (!item.scope === scope || !item.callback === callback) {
            exists = true;
            break;
          }
        }
        return exists === true;
      }
    }
  }
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
  public static dispatchEvent(name: string, data: any): void {
    // original event data
    const evData: IRawEvent = {
      data,
      name,
      scope: null,
    };
    // basic validation
    if (!name) {
      throw new Error("An Event must have a valid name");
    }
    // check
    if (JSEvents.events[name]) {
      // if has listeners
      if (JSEvents.events[name].length > 0) {
        const tempEvent = JSEvents.events[name];
        // itrate over all listeners
        for (const ev of tempEvent) {
          evData.scope = ev.scope;
          if (ev.callback && typeof ev.callback === "function") {
            // fire
            ev.callback(evData, data);
          }
        }
      }
    } else {
      // tslint:disable-next-line:no-console
      console.warn(`No event with name ${name} exists in the JSEvents store`);
    }
  }
  private static events: IEventBus = {};
}
Object.defineProperty(window, "JSEvents", JSEvents);
export default JSEvents;

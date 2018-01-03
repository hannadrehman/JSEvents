# A small Class to create and manage custom javascript events

## Installation

### Browser
download JSEvents.min.js and add to the sript in the ```head```
tag of your web application.

``` <script type="text/javascript" src="path-to-JSevents.min.js">```
### Node
 ``` npm install jsevents-js```
 ``` var JSEvents = require('jsevents-js');```

# API

# 1. addEventListener
  ```
  /**
   * @name addEventListener
   * @param {string} name
   * @param {function} callback
   * @param {object} scope
   * @description this function registeres the event
   * @returns {null} this function does not return anything
   */
   JSEvents.addEventListener(type,callback,scope);
  ```

# 2. removeEventListener
```
 /**
   * @name removeEventListener
   * @param {string} name
   * @param {function} callback
   * @param {object} scope
   * @description this function will remove registered the event
   * @returns {null} this function does not return anything
   */
   JSEvents.removeEventListener(type,callback,scope);
```
# 3. hasEventListener
```
/**
   * @name hasEventListener
   * @param {string} name
   * @param {function} callback
   * @param {object} scope
   * @description this function check and return true/false if the event has
   * any registered listener
   * @returns {boolean} return true if the event has any listener
   */
   var result = JSEvents.hasEventListener(name,callback,scope);
```
# 4. dispatchEvent
  ```
  /**
   * @name dispatchEvent
   * @param {string} name
   * @param {any} data
   * @description this function check and return true/false if the event has
   * any registered listener
   * @returns {null} this function will fire the registered event
   */
   JSEvents.dispatchEvent(name,data)
  ```
# 5. getRegisteredEvents
```
/**
   * @name getRegisteredEvents
   * @description this function return all the events registered in the store
   * @returns {object} this getter will return all the registered events
   */
   var allEvents=JSEvents.getRegisteredEvents()
```


# Usage

```
 var testOb={
    add:function(){
       // last parameter is the scope.
       // all params are mandatory
        JSEvents.addEventListener('TEST_OB_FN',this.cb,this);
    },
    dispatch:function(){
        JSEvents.dispatchEvent('TEST_OB_FN','hi')
    },
    cb:function(event,data){
        console.log(data)
    },
    getAll:function(){
        console.log(JSEvents.getRegisteredEvents())
    }
    remove:function(){
      // all are mendatory
      JSEvents.removeEventListener('TEST_OB_FN',this.cb,this);
    }
}
testOb.add();
testOb.dispatch();
testOb.getAll();
```

# passing extra parameters

```
   var cb=function(event,param1,param2,param3,param4){
     console.log(param1,param2,param3,param4);
   }
   JSEvents.addEventListener('NAME',cb,window);
   JSEvents.dispatchEvent('NAME','hi','anything','nothing',[1,2,3]);
   
```

# Important

## it is very important to not to declare the function callback inside the calling block. make sure you always declare the function as a variable and pass the variable to the addEventListener or removeEventListener


```
JSEvents.addEventListener('NAME',function(){
  // this is wrong.
},window);

JSEvents.removeEventListener('NAME',function(){
  // this is wrong.
},window);

var cb=function(ev){

}
JSEvents.addEventListener('NAME',cb,window); // this is correct
JSEvents.removeEventListener('NAME',cb,window); // this is correct

```

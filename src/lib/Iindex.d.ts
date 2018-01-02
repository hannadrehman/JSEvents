
export interface ICallback {
  (evData: object, args:any):void;
}

export interface IEvent{
  scope:object,
  callback:ICallback,
  args:any[]
}

export interface IEventBus{
  [key: string]:IEvent[]
}

export interface IRawEvent{
  name: string,
  data: any,
  scope: object
}

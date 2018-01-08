
const JSEvents = require('../src/JSEvents');

const cb1 = () => { return; };
const cb2 = () => { return; };
const cb3 = () => { return; };
const cb4 = () => { return; };

const scope1 = { a: 'a' };
const scope2 = { b: 'c' };
const scope3 = { d: 'e' };
const scope4 = { f: 'g' };

const eventNames = {
  0: 'ADD_1',
  1: 'ADD_2',
  2: 'ADD_3',
  3: 'ADD_4',
  4: 'ADD_5',
};

describe('Unit Test cases for JSEVENTS', () => {
  it('should be defined' , () => {
    expect(JSEvents).toBeDefined;
  });
  it('should have valid methods', () => {
    const add = JSEvents.addEventListener;
    const rem = JSEvents.removeEventListener;
    const get = JSEvents.getRegisteredEvents;
    const has = JSEvents.hasEventListener;
    const dis = JSEvents.dispatchEvent;
    expect(add).toBeDefined();
    expect(rem).toBeDefined();
    expect(get).toBeDefined();
    expect(has).toBeDefined();
    expect(dis).toBeDefined();
  });
  it('should register a new event', () => {
    JSEvents.addEventListener(eventNames[0], cb1, scope1);
    const events = JSEvents.getRegisteredEvents();
    const len = Object.keys(events).length;
    expect(len).toBeGreaterThan(0);
  });
  it('should register a new event to exising event if name is save', () => {
    JSEvents.addEventListener(eventNames[0], cb2, scope2);
    const events = JSEvents.getRegisteredEvents();
    const current = events[eventNames[0]];
    expect(current.length).toEqual(2);
  });
  it('should remove the proper listener if event has more than one listener', () => {
    const events = JSEvents.getRegisteredEvents();
    const current = events[eventNames[0]];
    expect(current.length).toEqual(2);
    JSEvents.removeEventListener(eventNames[0], cb2 , scope2);
    const updated = JSEvents.getRegisteredEvents();
    const upevs = updated[eventNames[0]];
    expect(upevs.length).toEqual(1);
    expect(upevs[0].scope).not.toEqual(scope2);
    expect(upevs[0].callback).not.toEqual(cb2);
    expect(upevs[0].scope).toEqual(scope1);
    expect(upevs[0].callback).toEqual(cb1);
  });
  it('should get the event ', () => {
    JSEvents.addEventListener(eventNames[1], cb3, scope3);
    const event = JSEvents.hasEventListener(eventNames[1], cb3, scope3);
    expect(event).toBe(true);
  });
  it('should NOT get the event ', () => {
    const event = JSEvents.hasEventListener(eventNames[3], cb1, scope3);
    expect(event).toBe(false);
  });
  it('should throw error', () => {
    const fn = () => {
       JSEvents.addEventListener();
    };
    expect(fn).toThrow();
  });
  it('should dispatch event', () => {
    const fn = jest.fn();
    const name = 'hammad'
    JSEvents.addEventListener(eventNames[4], fn, scope1);
    const events = JSEvents.getRegisteredEvents();
    const len = Object.keys(events).length;
    expect(len).toBeGreaterThan(0);
    JSEvents.dispatchEvent(eventNames[4], { key: name });
    expect(fn).toHaveBeenCalled();
 });
});

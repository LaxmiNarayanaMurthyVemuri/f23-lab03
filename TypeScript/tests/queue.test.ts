import { newArrayIntQueue } from "../src/arrayqueue.js";
import { newLinkedListIntQueue } from "../src/linkedlistqueue.js";

// pick one queue implementation, can run test easily for both, due to subtype polymorphism
// let createQueue = newLinkedListIntQueue
let createQueue = newArrayIntQueue

// TODOs:
// write more test cases to test dequeue and clear functions.

test("test isEmpty: newly created list should be empty", () => {
    expect(createQueue().isEmpty()).toBeTruthy()
})

test("test isEmpty: list with 1 element is not empty", () => {
    const queue = createQueue()
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()
})



test("test peek: newly created list should peek null", () => {

    expect(createQueue().peek()).toBeNull()
})

test("test peek: queue with 2 element should peek the one that was most recently added", () => {
    const queue = createQueue()
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.peek()).toEqual(2)
})

test("test clear: queue with 2 element should become empty", () => {
    const queue = createQueue()
    queue.enqueue(2)
    queue.enqueue(3)
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeNull();
})

let param = [5, 10, 1000000]
// parameterized test, apply to each value of the parameter
test.each(param)("test enqueue: enqueued number %d is correct", (nr) => {
    const queue = createQueue()
    queue.enqueue(nr)
    expect(queue.peek()).toBe(nr)
})

describe('Queue Dequeue Functionality', () => {
    test('Dequeue returns and removes the first element', () => {
        const queue = createQueue();
        const testValues = [5, 10, 1];

        // Enqueue multiple values
        queue.enqueue(testValues[0]);
        queue.enqueue(testValues[1]);
        queue.enqueue(testValues[2]);

        // Dequeue the first element
        const dequeuedValue = queue.dequeue();

        // Check that the dequeued value is the first one enqueued
        expect(dequeuedValue).toBe(testValues[0]);

        // Check the next peek value to ensure the queue order is maintained
        expect(queue.peek()).toBe(testValues[1]);
    });

    test('Dequeue on an empty queue returns null', () => {
        const queue = createQueue();

        // Dequeue from an empty queue
        const dequeuedValue = queue.dequeue();

        // Check that the return value is null
        expect(dequeuedValue).toBeNull();
    });

    test('Queue size decreases after dequeue', () => {
        const queue = createQueue();
        queue.enqueue(5);
        queue.enqueue(10);

        // Check initial size
        expect(queue.size()).toBe(2);

        // Dequeue one element
        queue.dequeue();

        // Check size after dequeue
        expect(queue.size()).toBe(1);
    });
});


// can nest tests with shared descriptions for better readability
describe("test size: ", ()=> {
    test("1 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(5)
        expect(queue.size()).toBe(1)
    })

    test("11 entries", ()=>{
        const queue = createQueue()
        for (let i =0;i<11;i++)
            queue.enqueue(i)
        expect(queue.size()).toBe(11)
    })
})
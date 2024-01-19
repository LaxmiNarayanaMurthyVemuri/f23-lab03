"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newArrayIntQueue = void 0;
/**
 * A resizable-array implementation of the {@link IntQueue} interface. The head of
 * the queue starts out at the head of the array, allowing the queue to grow and
 * shrink in constant time.
 *
 * TODO: This implementation contains two bugs! Use your tests to determine the
 * source of the bugs and correct them!
 *
 * @author Alex Lockwood
 * @author Ye Lu
 * @author Christian Kaestner
 */
function newArrayIntQueue() {
    /**
       * An array holding this queue's data
       */
    var elementData = [];
    /**
       * Index of the next dequeue-able value
       */
    var head = 0;
    /**
       * Current size of queue
       */
    var size = 0;
    /**
       * The initial size for new instances of ArrayQueue
       */
    var INITIAL_SIZE = 10;
    /**
       * Constructs an empty queue with an initial capacity of ten.
       *
       * Note, this is somewhat artificial translation from the Java code
       * where arrays always have a fixed size. Here we simulate fixed size
       * array's by sealing them. Typically one would just take advantage of
       * the existing flexibility of JavaScript arrays that are always dynamic,
       * but then this Queue implementation would be kind of trivial.
       */
    elementData = new Array(INITIAL_SIZE);
    elementData.fill(0);
    Object.seal(elementData);
    /**
       * Increases the capacity of this <tt>ArrayIntQueue</tt> instance, if
       * necessary, to ensure that it can hold at least size + 1 elements.
       */
    function ensureCapacity() {
        if (size === elementData.length) {
            var oldCapacity = elementData.length;
            var newCapacity = 2 * oldCapacity + 1;
            var newData = new Array(newCapacity);
            newData.fill(0);
            // for (let i = head; i < oldCapacity; i++) {
            //   newData[i - head] = elementData[i]
            // }
            for (var i = 0; i < size; i++) {
                newData[i] = elementData[(head + i) % elementData.length];
            }
            elementData = newData;
            head = 0;
            Object.seal(newData);
        }
    }
    return {
        clear: function () {
            elementData.fill(0);
            size = 0;
            head = 0;
        },
        dequeue: function () {
            if (this.isEmpty()) {
                return null;
            }
            var value = elementData[head];
            head = (head + 1) % elementData.length;
            size--;
            return value;
        },
        enqueue: function (value) {
            ensureCapacity();
            var tail = (head + size) % elementData.length;
            elementData[tail] = value;
            size++;
            return true;
        },
        isEmpty: function () {
            return size == 0;
        },
        peek: function () {
            if (this.isEmpty()) {
                return null;
            }
            return elementData[head];
        },
        size: function () {
            return size;
        }
    };
}
exports.newArrayIntQueue = newArrayIntQueue;

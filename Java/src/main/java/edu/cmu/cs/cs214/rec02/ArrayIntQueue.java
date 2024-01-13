package edu.cmu.cs.cs214.rec02;

import java.util.Arrays;

/**
 * A resizable-array implementation of the {@link IntQueue} interface. The head of
 * the queue starts out at the head of the array, allowing the queue to grow and
 * shrink in constant time.
 *
 *
 * @author Alex Lockwood
 * @author Ye Lu
 */
public class ArrayIntQueue implements IntQueue {

    /**
     * An array holding this queue's data
     */
    private int[] elementData;

    /**
     * Index of the next dequeue-able value
     */
    private int head;

    /**
     * Current size of queue
     */
    private int size;

    /**
     * The initial size for new instances of ArrayQueue
     */
    private static final int INITIAL_SIZE = 10;

    /**
     * Constructs an empty queue with an initial capacity of ten.
     */
    public ArrayIntQueue() {
        elementData = new int[INITIAL_SIZE];
        head = 0;
        size = 0;
    }

    /** {@inheritDoc} */
    public void clear() {
        Arrays.fill(elementData, 0);
        size = 0;
        head = 0;
    }

    /** {@inheritDoc} */
    public Integer dequeue() {
        if (isEmpty()) {
            return null;
        }
        Integer value = elementData[head];
        head = (head + 1) % elementData.length;
        size--;
        return value;
    }

    /** {@inheritDoc} */
    public boolean enqueue(Integer value) {
        ensureCapacity();
        int tail = (head + size) % elementData.length;
        elementData[tail] = value;
        size++;
        return true;
    }

    /** {@inheritDoc} */
    public boolean isEmpty() {
        return size == 0;// This has to be fixed
    }

    /** {@inheritDoc} */
    public Integer peek() {
        if (isEmpty()) {
            return null;
        }
        return elementData[head]; // if empty, we need to return null
    }

    /** {@inheritDoc} */
    public int size() {
        return size;
    }

    /**
     * Increases the capacity of this <tt>ArrayIntQueue</tt> instance, if
     * necessary, to ensure that it can hold at least size + 1 elements.
     */
    private void ensureCapacity() {
        // current code might get in the ArrayIndexOutOfBounds in second loop here
        if (size == elementData.length) {
            int newCapacity = elementData.length * 2;
            int[] newData = new int[newCapacity];
    
            // Copy elements from the old array to the new array.
            // The order of elements in the queue must be maintained.
            for (int i = 0; i < size; i++) {
                newData[i] = elementData[(head + i) % elementData.length];
            }
    
            // Update the queue to use the new array.
            elementData = newData;
            // Reset head because the first element of the queue is now at index 0 in the new array.
            head = 0;
        }
    }

    public String toString() {
        return Arrays.toString(elementData);
    }

}

const print = console.log

class Heap {
    constructor (heap) {
        this.heap = heap,
        this.lastIndex = () => this.heap.length - 1
    }

    getParent (index) { return ((index + 1) / 2 >> 0) - 1 }
    getRightChild (index ) { return 2 * index + 2}
    getLeftChild (index) { return 2 * index + 1}
    
    getGreaterChilds(index) {
        const right = this.getRightChild(index)
        const left = this.getLeftChild(index)
        if (right <= this.lastIndex()) 
            return this.heap[left] >= this.heap[right]
                ? left : right
            // if there is right child then there is also a left child
            

        else if (left === this.lastIndex()) return left 
            // if there is only one child, it will be the left child 
            
        return null
            // if there is no left child then there is no right child
    }
    
    swap(i, j) {
        [this.heap[i], this.heap[j] ] = [this.heap[j], this.heap[i] ]
    }
    
    __heapifyOnce (index) {
        
        const value = this.heap[index]
        
        let parentIndex = this.getParent(index)
        
        while (value > this.heap[parentIndex]) {
            this.swap(index, parentIndex)
            if(!parentIndex) break;
            index = parentIndex
            parentIndex = this.getParent(index)
            
        }
        
    }
    heapifyUp(index = 0) {
        if(index >= this.lastIndex()) return
        const left = this.getLeftChild(index)
        const right = this.getRightChild(index)
        
        
        if (right < this.lastIndex()) {
        // if right child index is less than the lastIndex of the heap, then there is a left child. They also have potentials of having children.
            this.heapifyUp(left)
            this.heapifyUp(right)
        }
        
        let greater = null
        
        if (right <= this.lastIndex()) 
            greater = this.heap[right] >= this.heap[left] ? right : left
                    
        else if (left == this.lastIndex()) greater = left
        
        if ( greater !== null && 
                this.heap[greater] > this.heap[index] ) {
            
            this.swap(index, greater)
            this.heapifyUp(greater)
        }
       
    }
    heapSort() {
        const arr = []
        this.heapifyUp()
        let length = this.lastIndex() + 1
        while(length) {
           arr.unshift( this.deleteHeap() )
           length--
        }
        return arr
    }
    insert (v) {
        if (v === undefined || v === null || Number.isNaN(v) || v === "") return
        this.heap.push(v)
        this.__heapifyOnce(this.lastIndex())
    }
    
    deleteHeap(heap = this.heap) {
        let index = 0
        this.swap(index, this.lastIndex())
        const root = this.heap.pop()
        while (index !== null) {
            const childIndex = this.getGreaterChilds(index)
            if(!childIndex === null) break
            if (this.heap[childIndex] > this.heap[index])
                this.swap(index, childIndex)
            index = childIndex
        }
        return root
    }
}
module.export = Heap
//const arr = [1,0,1,1,1,7]
//const heap = new Heap(arr)

//heap.heapifyUp()


//for (const elem of list) heap.insert(elem)

//print(heap.heap)

//print(heap.heapSort())


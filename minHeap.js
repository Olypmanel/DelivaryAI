class MinHeap {
    constructor() {
        this.heap = [],
        this.lastIndex = () => this.heap.length - 1,
        this.getLeftChild = index => 2 * index + 1,
        this.getRightChild = index =>  2 * index + 2,
        this.getParent = index => ((index + 1) / 2 >> 0 ) - 1
        
    }
    getLesserChilds(index) {
        const left = this.getLeftChild(index)
        const right = this.getRightChild(index)
        
        if (right <= this.lastIndex()) { //two children
            // if there is a right child, there will be a left child definately
            const {dist:rightKey, route:r} = this.heap[right]
            const {dist: leftKey, route: l} = this.heap[left]
            if (rightKey === leftKey) // 
                return r.length < l.length ? right : left
            return rightKey < leftKey ? right : left
        }
        else if (left === this.lastIndex()) return left 
        // if just one child
        return null // if no children
        
    }
    swap(i, j) {
        [this.heap[i],this.heap[j]] = [this.heap[j], this.heap[i]]
        
    }
    heapify () {
        let index = this.lastIndex()
        if (!index) return;
        const len = arr => arr.length
        
        while(index > 0) {
            let parentIndex = this.getParent(index)
            const child = this.heap[index]
            const parent = this.heap[parentIndex]
            
            const {dist: cKey, route: cRoute} = child
            const {dist: pKey, route: pRoute} = parent
            
            if (cKey < pKey || 
                (cKey === pKey && len(cRoute) > len(pRoute)))
                    this.swap(index, parentIndex)
            else break
            index = parentIndex
            parentIndex = this.getParent(index)

        }
    }
    add(value) {
        this.heap.push(value)
        this.heapify()
    }
    
    
    remove () {
        let index = 0
        this.swap(index, this.lastIndex())
        const smallest = this.heap.pop()
        const len = arr => arr.length
        
        while(true) {
            const lessChildInd = this.getLesserChilds(index)
            if (lessChildInd === null) return smallest
            const lesserChild = this.heap[lessChildInd]
            const parent = this.heap[index]
            
            const {dist: cKey, route: cRoute} = lesserChild
            const {dist: pKey, route: pRoute} = parent
            
            if(cKey < pKey || 
                (cKey === pKey && len(cRoute) > len(pRoute)))
                    this.swap(index, lessChildInd)    
            else return smallest
            
            index = lessChildInd
            
        }
        
        
    }
    show () {  return this.heap[0] }
    
    length () { return this.heap.length}
}

export default MinHeap
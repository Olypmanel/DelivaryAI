class Node {
    constructor(key) {
        this.key = key
        this.right = null
        this.left = null
        this.height  = 1
    }
}
const print = console.log
 
class BinaryTree{
     constructor() {this.root = null}
     getHeight(node) {return node ? node.height : 0}
     
     updateHeight(node) {
         node.height = 1 + Math.max (
             this.getHeight(node.left),
             this.getHeight(node.right)
        )
     }
     getBalance (node) {
         return this.getHeight(node.left) - this.getHeight(node.right)
     }
     
     rotateRight (parent, node) {
         
         const middleNode = node.left
         const rightOfMiddle = middleNode.right
         
         node.left = rightOfMiddle
         middleNode.right = node
         
         this.updateHeight(node)
         this.updateHeight(middleNode)
         
         if (!parent) this.root = middleNode
         else if (parent.right == node) 
                     parent.right = middleNode
         else parent.left = middleNode
         
     }
     rotateLeft (parent, node) {
         const middleNode = node.right
         const leftOfMiddle = middleNode.left
         
         node.right = leftOfMiddle
         middleNode.left = node
         
         this.updateHeight(node)
         this.updateHeight(middleNode)
         
         if (!parent) this.root = middleNode
         else if (parent.left == node) 
                 parent.left = middleNode
         else parent.right = middleNode
         
         
     }
     balance(parent, node) {
         
         this.updateHeight(node)
            //Always update height b4 balancing
         
         const balanceFactor = this.getBalance(node)
         if (balanceFactor > 1) {
             const balFact = this.getBalance(node.left)
             if (balFact == 1 || !balFact) // rotate right
                this.rotateRight(parent, node)
            else { // rotate left right
                this.rotateLeft(node, node.left)
                this.rotateRight(parent, node)
            }
         }
         else if (balanceFactor < -1) {
             const balFact = this.getBalance(node.right)
             if (balFact == -1 || !balFact) // rotate left
                     this.rotateLeft(parent, node)
             else if (balFact == 1) { // rotate right left
                 this.rotateRight(node, node.right)
                 this.rotateLeft(parent, node)
             }
         }
     }
     
     _insertNode(parent, node, key) {
         const newNode = new Node(key)
         if (key > node.key) {
             if (!node.right) node.right = newNode
             else this._insertNode(node, node.right, key)
         }
         else if (key < node.key) {
             if (!node.left) node.left = newNode
             else this._insertNode(node, node.left, key)
         }
         else return;
         
         this.balance(parent, node)
     }
     insert(key) {
         if (!this.root) return this.root = new Node(key)
         this._insertNode(null, this.root, key)
     }
     findSuccessor(node) {
         if (!node.left) return node.key
         return this.findSuccessor(node.left)
     }
     
     _delete(parent, node, key, direction) {
        if (!node) return
        const {right, left, key : value} = node
        if (key > value) 
                this._delete(node, right, key, "right")
        
        else if (key < value) 
                this._delete(node, left, key, "left")
        else {
            if (!left && !right) { // Node with no child
                if (!parent) this.root = null
                else parent[direction] = null
            }
            else if ((!right && left) || (right && !left)) {
                // Node with one child
                if (!parent) this.root = right || left
                else parent[direction] = right || left
            }
            else { // Node with two children
                const successor = this.findSuccessor(right)
                this.deleteNode(successor)
                node.key = successor
            }
         }
         this.balance(parent, node)
     }
     
     deleteNode(key) {this._delete(null, this.root, key,"")}
     traverseBfs() {
         if(!this.root) return
         const queue = [this.root]
         while (queue.length) {
             const waiters = queue.pop()
             if (!waiters) continue
             const {left, right, key, height} = waiters
             const bal = this.getBalance(waiters)
             console.log({key, height, bal})
             queue.unshift(right, left)
         }
     }
 }
const data = [..."abcdefghijklmnopqrstuvwxyz"]
const del = 8
const binaryTree = new BinaryTree
data.forEach (a => binaryTree.insert(a))

//print(binaryTree.findNode(del))
binaryTree.deleteNode(del)
//print(binaryTree.findNode(del))
//print("before balance ===> ",binaryTree.root.right)

print("after balance ===>", binaryTree.root)
binaryTree.traverseBfs()
print()
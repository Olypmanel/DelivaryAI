

const residentStreet = [
    "nuel-honour-1", "nuel-odu-3", "nuel-xando-4", "nuel-tommy-1", "honour-odu-2", "honour-tommy-3","honour-xando-3","odu-xando-1", "odu-yusuf-9", "xando-tommy-2","xando-judah-2", "judah-yusuf-7", "tommy-yusuf-4"
]

const letterStreet = [
    "A-B-5","A-C-3","A-D-4","B-C-6","B-G-1","B-E-3","C-E-1","C-F-9","C-G-4","E-D-4","E-F-2","F-D-6"
    
]

const blockStreet = [
    "block1-block2-2", "block1-block4-1", "block1-block3-5",
    "block1-annex-6", "block2-annex-7","block2-block3-1",
    "block4-annex-3"
]
const interStreetRoad = [
    "nuel-A-4", "nuel-D-5", "nuel-block1-2","xando-block4-5",
    "odu-C-3", "A-annex-5", "B-block2-6"
]

const RobotAIcity = [
    ...residentStreet, ...letterStreet,
    ...blockStreet, ...interStreetRoad
]

const global = {
    
    robotAIcityMap:  graph(RobotAIcity),
    print: console.log

}

const { robotAIcityMap, print } = global


function graph (nodes) {
    const map = {}
    const connectNode = (A, B, distance) => {
        if (!map[A]) map[A] = { [B]: parseFloat(distance) }
        else map[A] = {...map[A], [B]: parseFloat(distance) }
    }
    
    for (const node of nodes) {
        const [A, B, distance] = node.split`-`
        connectNode (A, B, distance)
        connectNode (B, A, distance)
    }
    return map;
}


function parcels (num) {
    const packages = []
    const random = num => Math.floor(num * Math.random())
    const sites = Object.keys(robotAIcityMap)
    for (num; num >= 1; num--) {
        let location = sites[random(sites.length)]
        let address = sites[random(sites.length)]
        while (location == address) address = sites[random(sites.length)]
            packages.push({location, address})
    }
    return packages
}



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
            // if there right child, there will left child
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
                (cKey === pKey && len(cRoute) < len(pRoute)))
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
                (cKey === pKey && len(cRoute) < len(pRoute)))
                    this.swap(index, lessChildInd)    
            else return smallest
            
            index = lessChildInd
            
        }
        
        
    }
    show () {  return this.heap[0] }
    
    length () { return this.heap.length}
}


class RobotBrain {
    destinationChecker(AIspot, packages, pendingStops){
    if (pendingStops.size) return
    else if (packages.some(p => AIspot != p.location)) { 
        packages.forEach(({location}) => {
            AIspot !== location && pendingStops.add(location)
        })
    }    
    else packages.forEach(({address}) => (
            pendingStops.add(address)))

}


    brain001(location) {
        const rand =arr=> arr[arr.length * Math.random() >>0]
        return [rand(Object.keys(robotAIcityMap[location]))]
}

    brain002(location, packages, pendingStops) {
        
        const queue = [{from:location,route:[], dist: 0}]
        new RobotBrain()
         .destinationChecker(location,packages, pendingStops)
        const visited = { [location]: true }
        for (; ;) {
            const {from, route, dist} = queue.shift()
            if (pendingStops.has(from)) {
                pendingStops.delete(from)
                return route
            }
            
            const stops = robotAIcityMap[from]
            for (const stop in stops) {
                if(!visited[stop]){
                    queue.push({
                        from: stop, dist: dist + stops[stop],
                        route: route.concat(stop)
                    })
                
                }
            }
        }
        visited[from] = true
    }
    
    brain003 (location, packages, pendingStops) {
        const priorityQueue = new MinHeap()
        const diffRoutes = new MinHeap()
        priorityQueue.add({
            from: location, route:[], dist: 0  
            
        })
        new RobotBrain()
        .destinationChecker(location, packages, pendingStops)
        
        const visited = {[location] : true}
        for (; ;) {
            const {from,route, dist} = priorityQueue.remove()
            if (pendingStops.has(from)) 
                    diffRoutes.add({dist, route, from})
            else {
                const stops = robotAIcityMap[from]
                for (const stop in stops) {
                    if(!visited[stop] ) {
                        
                        const peep = diffRoutes.show()
                        const newDist = dist + stops[stop]
                        if (!peep || newDist <= peep.dist)
                            priorityQueue.add({
                                from: stop, dist: newDist,
                                route: route.concat(stop)
                            })
                    }
                }
                 
                visited[from] = true
            }
            
            if ( !priorityQueue.length() ) {
                const {from, route} = diffRoutes.remove()
                pendingStops.delete(from)
                return route
            }  
          
        }
        
    }
    
 
}




class RobotBrawn { 
    constructor (robotLocation, parcels) {
        this.location = robotLocation,
        this.parcels = parcels
    }
    move(destination) {
        const packages = this.parcels.map(({location, address}) => {
            if (this.location === location) 
                return {location: destination, address} 
            else return {location, address}
        })
        .filter(({location, address})=> location !== address)
        
        return new RobotBrawn(destination, packages)
    }
}

    

function robotAI(brain, location, parcels) {
    const pendingStops  = new Set()
    let route = brain(location, parcels, pendingStops)
    let robot = new RobotBrawn(location, parcels) 
    let [totalDistance, turns, len] = [0, 0, parcels.length]
    
    while(true) {
        const destination = route.shift()
        const AI = robot.move(destination)
        
        print(`move from ${location} to ${destination}`)
        totalDistance +=robotAIcityMap[location][destination]
        turns++; 
        location = destination;  
        parcels = AI.parcels;
        robot = AI
        if (!parcels.length) return `Moved ${len} parcels in ${turns} turns through ${totalDistance} Km`    
        if (!route.length) 
            route = brain(location, parcels, pendingStops)
        
    }

    
}


const {brain001, brain002, brain003} = new RobotBrain
const currentLocation = "nuel"
const packages = parcels(5)
print(robotAIcityMap)
print("\n")
print (packages)
print(robotAI(brain001, currentLocation, packages))
print("\n")
print(robotAI(brain002, currentLocation, packages))
print("\n")
print(robotAI(brain003, currentLocation, packages))






let parNum = 1
let num = 10
const checker = (br2, br3, num) => {
    const total = num
    const status = {wins: 0, loss: 0, draws: 0, parNum}
    for (num; num > 0; num--) {
        const packages = parcels(parNum)
       const r2 = robotAI(br2, currentLocation, packages)
       const r3 = robotAI(br3, currentLocation, packages)
       if (r3 < r2) status.wins++
       else if (r3 > r2) {status.loss++; print(packages)}
       else status.draws++
    }
    return status
}

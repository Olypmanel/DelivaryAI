import MinHeap from "./MinHeap.js"
import robotAIcityMap from "./robotAIcity.js"
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
export default RobotBrain
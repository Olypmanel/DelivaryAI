import RobotBrain from "./RobotBrain.js"
import RobotBrawn from "./RobotBrawn.js"
import robotAIcityMap from "./robotAIcity.js"


const print = console.log


function parcels (num) {
    const packages = []
    const random = num => Math.floor(num * Math.random())
    const sites = Object.keys(robotAIcityMap)
    for (num; num >= 1; num--) {
        const location = sites[random(sites.length)]
        let address = sites[random(sites.length)]
        while (location == address) 
            address = sites[random(sites.length)]
        packages.push({location, address})
    }
    return packages
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
const random = num => num * Math.random() >> 0
const currentLocation = "nuel"
const packages = parcels(random(200))


print(robotAIcityMap) // THE CITY IN WHICH THE ROBOT MOVES IN
print("\n")
print (packages) // THE PARCELS THE ROBOT CARRIES

print(robotAI(brain001, currentLocation, packages)) // RB001
print("\n")
print(robotAI(brain002, currentLocation, packages)) // RB002
print("\n")
print(robotAI(brain003, currentLocation, packages)) // RB003




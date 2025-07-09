import RobotBrain from "./RobotBrain.js"
import RobotBrawn from "./RobotBrawn.js"
import robotAIcityMap from "./robotAIcity.js"


const print = console.log


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

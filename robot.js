import RobotBrain from "./RobotBrain.js"
import RobotBrawn from "./RobotBrawn.js"
import robotAIcityMap from "./robotAIcity.js"


const print = console.log


function parcels (num) {
    const packages = []
    const random = num => num * Math.random() >> 0
    const sites = Object.keys(robotAIcityMap)
    const siteLength = sites.length
    for (num; num >= 1; num--) {
        const location = sites[random(siteLength)]
        let address = sites[random(siteLength)]
        while (location == address) 
            address = sites[random(siteLength)]
        packages.push({location, address})
    }
    return packages
}










    

function robotAI(brain,location,parcels,pr=true) {
    const pendingStops  = new Set()
    let route = null
    let robot = new RobotBrawn(location, parcels) 
    let [totalDist,turns,pLen]= [0,0,parcels.length]
    
    while(parcels.length) {
        if (!route || !route.length) {
            const {dist, route: path} = brain(location, parcels, pendingStops)
            totalDist += dist
            turns += path.length
            route = path
        }
        const destination = route.shift()
        robot = robot.move(destination)
        
        pr && print(`move from ${location} to ${destination}`)
        location = destination;  
        parcels = robot.parcels;
    }
    pr && print(`Moved ${pLen} parcels in ${turns} turns through ${totalDist} Km`)   
    return {turns, totalDist}
}


const { brain001, brain002, brain003 } = new RobotBrain
const random = num => num * Math.random() >> 0
const currentLocation = "nuel"
const packages = parcels(10)


print(robotAIcityMap) // THE CITY IN WHICH THE ROBOT MOVES IN
print("\n")
print (packages) // THE PARCELS THE ROBOT CARRIES

print(robotAI(brain001, currentLocation, packages)) // RB001
print("\n")
print(robotAI(brain002, currentLocation, packages)) // RB002
print("\n")
print(robotAI(brain003, currentLocation, packages)) // RB003


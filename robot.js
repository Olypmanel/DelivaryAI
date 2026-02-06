import RobotBrain from "./RobotBrain.js"
import RobotBrawn from "./RobotBrawn.js"
import robotAIcityMap, { capitalize } from "./robotAIcity.js"


const print = console.log


function parcels (num) {
    const packages = []
    const random =num=> parseInt(num*Math.random())
    const sites = Object.keys(robotAIcityMap)
    const siteLength = sites.length
    for (num; num >= 1; num--) {
        const location = sites[random(siteLength)]
        let address = sites[random(siteLength)]
        while (location == address) 
            address = sites[random(siteLength)]
        packages.push({
            location, address, 
            sender: location, picked: false
        })
    }
    return packages
}


const printDeliveredParcel = arr => {
    for (const a of arr) {
        const [sender, address] = a.split`==>`
        print (
            `Parcel sent by ${sender} is received by ${address}`)
    }
    arr.length && print('\n')
}

const printPicked = (picked, message = "🔝") => {
    if (!picked) return ""
    if (picked == 1) return message
    else return `${message}${picked}`
    
}





    

function robotAI(brain,location,parcels,pr=true) {
    const pendingStops  = new Set()
    let route = null
    location = capitalize(location)
    const name = capitalize(brain.name)
    let robot = new RobotBrawn(location, parcels)
    let [totalDist,turns,pLen]= [0,0,parcels.length]
    pr && print(`${name} is at ${location}`)
    while(parcels.length) {
        if (!route || !route.length) {
            const {dist, route: path} = brain(location, parcels, pendingStops)
            totalDist += dist
            turns += path.length
            route = path
        }
        const destination = route.shift()
        robot = robot.move(destination)
        const {delivered, picked} = robot.status
        pr && print(`move from ${location}${printPicked(picked)} to ${destination}`)
        pr && printDeliveredParcel(delivered)
        location = destination;  
        parcels = robot.parcels;
    }
    pr && print(`${name} moved ${pLen} parcels in ${turns} turns through ${totalDist} Km`)
    
    return { 
        robot: name, parcel: pLen, turns, totalDist
    }
}


const { brain001, brain002, brain003 } = new RobotBrain
const random = num => parseInt(num * Math.random())
const location = "robot_station"
const packages = parcels(random(20))


print(robotAIcityMap) // THE CITY IN WHICH THE ROBOT MOVES IN
print("\n")
print (packages) // THE PARCELS THE ROBOT CARRIES

const b1 = robotAI(brain001, location,packages, 0) // RB001
print("\n")
const b2 = robotAI(brain002, location, packages) // RB002
print("\n")
const b3 = robotAI(brain003, location, packages) // RB003
print("\n", b1, "\n",b2,"\n", b3)


const runStats = (round, key = 'totalDist') => {
    const board = {key, br02: 0, br03: 0, draw: 0 }
    for(round; round > 0; round--) {
        const maxPack = Math.max(10, random(100))
        const packages = parcels(maxPack)
        const br02 = robotAI(brain002,location, packages, false)
        const br03 = robotAI(brain003, location, packages, false)
        if (br03[key] < br02[key]) 
            board.br03 += 1
        else if (br03[key] > br02[key])
            board.br02 += 1
        else board.draw += 1
    }
    return board
}
print(runStats(100, "totalDist"))

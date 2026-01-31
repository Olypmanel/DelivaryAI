const print = console.log
class RobotBrawn { 
    constructor (robotLocation, parcels, status){
        this.location = robotLocation,
        this.parcels = parcels,
        this.status = status ? status : {
            delivered: [], picked : 0
        }
    }
    move(destination) {
        this.status.delivered.splice(0)
        this.status.picked = 0
        const packages = this.parcels.map(({location, address, sender, picked}) => {
            if (this.location == sender && !picked){
                picked = true
                this.status.picked += 1
            }
                
            if (this.location === location) 
                return {location: destination, address, sender, picked} 
            else return { location, address, sender, picked}
        })
        .filter(({location, address, sender}) => {
            if (location === address){
                this.status.delivered.push(
                    `${sender}==>${address}`)
            }
            else return true
            
        })
        //MAP CARRIES THE PARCELS AT THEIR LOCATIONS
        //FILTER DELIVERS THEM TO THEIR ADDRESSES
        return new RobotBrawn(
            destination, packages, this.status)
    }
}
export default RobotBrawn
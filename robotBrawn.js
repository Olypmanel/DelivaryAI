const print = console.log
class RobotBrawn { 
    constructor (robotLocation, parcels, delivered){
        this.location = robotLocation,
        this.parcels = parcels,
        this.delivered = delivered
    }
    move(destination) {
        this.delivered.splice(0)
        const packages = this.parcels.map(({location, address, sender}) => {
            if (this.location === location) 
                return {location: destination, address, sender} 
            else return {location, address, sender}
        })
        .filter(({location, address, sender}) => {
            if (location === address){
                this.delivered.push(
                    `${sender}==>${address}`)
            }
            else return true
            
        })
        //MAP CARRIES THE PARCELS AT THEIR LOCATIONS
        //FILTER DELIVERS THEM TO THEIR ADDRESSES
        return new RobotBrawn(
            destination, packages, this.delivered)
    }
}
export default RobotBrawn
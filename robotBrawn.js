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
export default RobotBrawn
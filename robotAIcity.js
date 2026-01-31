const residentStreet = [
    "nuel-honour-1", "nuel-odu-3", "nuel-xando-4", 
    "nuel-tommy-1", "honour-odu-2", "honour-tommy-3",
    "honour-xando-3","odu-xando-1", "odu-yusuf-9", 
    "xando-tommy-2","xando-judah-2", "judah-yusuf-7", 
    "tommy-yusuf-4"
]

const letterStreet = [
    "A-B-5","A-C-3","A-D-4","B-C-6","B-G-1","B-E-3",
    "C-E-1","C-F-9","C-G-4","E-D-4","E-F-2","F-D-6"
    
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



export const capitalize = str => !str ? str : str[0].toUpperCase() + str.slice(1).toLowerCase()

const graph = nodes => {
    const map = {}
    const connectNode = (A, B, distance) => {
        A = capitalize(A); B = capitalize(B)
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

export default graph(RobotAIcity)
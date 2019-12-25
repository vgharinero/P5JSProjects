function AStar(start, target, map)
{

    let openList = []
    let closedList = []

    this.find = function()
    {

        console.log('trying to find a path...')

        this.startNode = {
            X: start.X,
            Y: start.Y,
            f: this.heuristic(start),
            g: 0,
            h: this.heuristic(start),
            parent: null
        }

        openList.push(this.startNode)

        while(openList.length != 0)
        {
            openList.sort((a, b) => a.h - b.h)

            this.currentNode = openList.shift()

            if (this.currentNode.X == target.X && this.currentNode.Y == target.Y) {
                break
            }

            let successors = this.successors(this.currentNode)

            successors.forEach(node => {
                let open = openList.filter(n => n.X == node.X && n.Y == node.Y)
                let closed = closedList.filter(n => n.X == node.X && n.Y == node.Y)
                if (closed.length == 0 && open.length == 0)
                {
                    openList.push(node)
                }
            })
            closedList.push(this.currentNode)
        }

        return this.currentNode
    }

    this.successors = function(node)
    {
        let successors = []

        if (node.Y - 1 > 0 && map[node.Y - 1][node.X] != 1)
        {
            successors.push({
                X: node.X,
                Y: node.Y - 1,
                g: node.g + 1,
                parent: node
            })
        }
        if (node.X + 1 < map[0].length && map[node.Y][node.X + 1] != 1)
        {
            successors.push({
                X: node.X + 1,
                Y: node.Y,
                g: node.g + 1,
                parent: node
            })
        }
        if (node.Y + 1 < map.length && map[node.Y + 1][node.X] != 1)
        {
            successors.push({
                X: node.X,
                Y: node.Y + 1,
                g: node.g + 1,
                parent: node
            })
        }
        if (node.X - 1 > 0 && map[node.Y][node.X - 1] != 1)
        {
            successors.push({
                X: node.X - 1,
                Y: node.Y,
                g: node.g + 1,
                parent: node
            })
        }

        successors.forEach(node => {
            node.h = this.heuristic(node)
            node.f = node.g + node.h
        })

        return successors
    }

    this.heuristic = function(node)
    {
        return (Math.abs(node.X - target.X) + Math.abs(node.Y - target.Y))
    }


}
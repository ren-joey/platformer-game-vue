import * as PIXI from 'pixi.js'
// import config from '../config'

const Character = class {
    constructor() {
        this.container = new PIXI.Container()
        this.standGraph = new PIXI.Sprite.from('c')
        this.jumpGraph = new PIXI.Sprite.from('c_jump')
        this.fallGraph = new PIXI.Sprite.from('c_fall')
        this.dieGraph = new PIXI.Sprite.from('c_die')
        const runningTextures = [
            PIXI.Texture.from('c_run_1'),
            PIXI.Texture.from('c_run_2'),
            PIXI.Texture.from('c_run_3'),
            PIXI.Texture.from('c_run_4'),
            PIXI.Texture.from('c_run_5'),
            PIXI.Texture.from('c_run_6')
        ]
        this.runGraph = new PIXI.AnimatedSprite(runningTextures)

        const {
            container, standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        // character.pivot.set(15, 30)
        // stand.pivot.set(stand.width / 2, stand.height)
        standGraph.x += 50
        standGraph.y += 5
        runGraph.x += 20
        runGraph.y += 20
        runGraph.animationSpeed = 0.3
        runGraph.play()
        dieGraph.y += 100
        container.addChild(standGraph, jumpGraph, runGraph, fallGraph, dieGraph)

        this.phyWidth = container.width
        this.phyHeight = container.height
        container.pivot.set(container.width / 2, container.height)
        container.scale.x = 0.6
        container.scale.y = 0.6

        jumpGraph.visible = false
        runGraph.visible = false
        fallGraph.visible = false
        dieGraph.visible = false
    }

    right() {
        const { container } = this
        container.scale.x = 0.6
    }

    left() {
        const { container } = this
        container.scale.x = -0.6
    }

    jump() {
        const {
            standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        standGraph.visible = false
        jumpGraph.visible = true
        runGraph.visible = false
        fallGraph.visible = false
        dieGraph.visible = false
    }

    fall() {
        const {
            standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        standGraph.visible = false
        jumpGraph.visible = false
        runGraph.visible = false
        fallGraph.visible = true
        dieGraph.visible = false
    }

    stand() {
        const {
            standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        standGraph.visible = true
        jumpGraph.visible = false
        runGraph.visible = false
        fallGraph.visible = false
        dieGraph.visible = false
    }

    run() {
        const {
            standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        standGraph.visible = false
        jumpGraph.visible = false
        runGraph.visible = true
        fallGraph.visible = false
        dieGraph.visible = false
    }

    // victory() {

    // }

    die() {
        const {
            standGraph, jumpGraph, runGraph, fallGraph, dieGraph
        } = this
        standGraph.visible = false
        jumpGraph.visible = false
        runGraph.visible = false
        fallGraph.visible = false
        dieGraph.visible = true
    }
}

export { Character as default }
export { Character }

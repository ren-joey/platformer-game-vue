import * as PIXI from 'pixi.js'
import { config } from '../config'

const LifeBoard = class {
    constructor() {
        this.full = config.character.lives
        this.container = new PIXI.Container()
        this.board = new PIXI.Sprite.from('bar_1')
        this.container.addChild(this.board)

        const heartTextures = [
            PIXI.Texture.from('heart'),
            PIXI.Texture.from('heart_empty')
        ]

        this.hearts = []
        for (let i = 0; i < this.full; i += 1) {
            const heart = new PIXI.AnimatedSprite(heartTextures)
            heart.x = 26 + ((heart.width + 6) * i)
            heart.y = 18
            this.hearts.push(heart)
            this.container.addChild(heart)
        }
    }

    update() {
        const { lives } = config.character
        if (this.full === lives) return
        for (let i = 0; i < this.full - lives; i += 1) {
            this.hearts[i].gotoAndStop(1)
        }
    }
}

export { LifeBoard as default }
export { LifeBoard }

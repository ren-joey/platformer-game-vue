import * as PIXI from 'pixi.js'
import { config } from '../config'

const CoinBoard = class {
    constructor() {
        this.container = new PIXI.Container()
        this.board = new PIXI.Sprite.from('bar_2')
        const coin = new PIXI.Sprite.from('coin_0')
        coin.x = 16
        coin.y = 10
        this.text = new PIXI.Text(config.result.coins.toString().padStart(3, '0'), {
            fontSize: 48, fill: 0xffffff, fontWeight: 900, letterSpacing: 9
        })
        this.text.pivot.set(this.text.width, this.text.height)
        this.text.x = this.board.width - 35
        this.text.y = this.board.height - 32
        this.text.scale.x = 1.2
        this.container.addChild(this.board, this.text, coin)
    }

    update() {
        this.container.removeChild(this.text)
        this.text = new PIXI.Text(config.result.coins.toString().padStart(3, '0'), {
            fontSize: 48, fill: 0xffffff, fontWeight: 900, letterSpacing: 9
        })
        this.text.pivot.set(this.text.width, this.text.height)
        this.text.x = this.board.width - 35
        this.text.y = this.board.height - 32
        this.text.scale.x = 1.2
        this.container.addChild(this.text)
    }
}

export { CoinBoard as default }
export { CoinBoard }

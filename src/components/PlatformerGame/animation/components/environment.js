import * as PIXI from 'pixi.js'
import { config } from '../config'

const environment = () => {
    const view = new PIXI.Container()
    const level_1_2 = new PIXI.Sprite.from('bg_1')
    const level_2_3 = new PIXI.Sprite.from('bg_2')
    level_2_3.x = level_1_2.width - 5
    view.addChild(level_1_2, level_2_3)

    config.environment.gap = view.height / config.environment.rows
    config.environment.width = view.width
    config.environment.height = view.height

    const scale = window.innerWidth / config.screen.cols * config.screen.rows / view.height
    config.environment.scale = scale
    view.scale.x = scale
    view.scale.y = scale

    return view
}

export { environment as default }
export { environment }

import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
import { config } from '../config'
import { makeQa } from './qa'

/**
 * object code
 * 0 空白
 * 1 ground
 * 2 spike
 * 3 monster_1
 * 4 monster_2
 * 5 coin
 * 6 cube
 */

const map = []

const objMap = []
// const qa = new QA()

const mapAdjust = (x, y) => {
    const { gap } = config.environment
    const mapX = Math.floor(x / gap)
    const mapY = Math.floor(y / gap)
    return { x: mapX, y: mapY }
}

const mapCollisionDetection = (x, y) => {
    const mapPosition = mapAdjust(x - 1, y - 1)
    if (map[mapPosition.y] === undefined) return 1
    const collisionObject = map[mapPosition.y][mapPosition.x]
    if (collisionObject === undefined) return 1
    if (collisionObject === 5
        || collisionObject === 6) {
        if (collisionObject === 5) {
            config.result.coins += 1
        } else if (collisionObject === 6) {
            config.environment.pause = true
            makeQa()
        }

        map[mapPosition.y][mapPosition.x] = 0
        TweenMax.to(objMap[mapPosition.y][mapPosition.x], 0.5, { alpha: 0, y: '-=50' })
        return 0
    }
    return collisionObject
}

const mapObjectSet = () => {
    const container = new PIXI.Container()
    const coinTextures = [
        PIXI.Texture.from('coin_1'),
        PIXI.Texture.from('coin_2'),
        PIXI.Texture.from('coin_3'),
        PIXI.Texture.from('coin_4'),
        PIXI.Texture.from('coin_5'),
        PIXI.Texture.from('coin_6'),
        PIXI.Texture.from('coin_7'),
        PIXI.Texture.from('coin_8')
    ]

    for (let row = 0; row < config.environment.rows; row += 1) {
        for (let col = 0; col < config.environment.cols; col += 1) {
            const objCode = map[row][col]
            let obj
            if (objCode === 0) continue
            else if (objCode === 1) {
                if (map[row - 1] && map[row - 1][col] === 1) {
                    if (col % 2 === 0) {
                        obj = new PIXI.Sprite.from('earth_1')
                    } else if (col % 2 === 1) {
                        obj = new PIXI.Sprite.from('earth_2')
                    }
                } else if (col % 2 === 0) {
                    obj = new PIXI.Sprite.from('ground_1')
                } else if (col % 2 === 1) {
                    obj = new PIXI.Sprite.from('ground_2')
                }
            } else if (objCode === 2) {
                if (col % 2 === 0) {
                    obj = new PIXI.Sprite.from('spike_1')
                } else if (col % 2 === 1) {
                    obj = new PIXI.Sprite.from('spike_2')
                }
            } else if (objCode === 3) {
                obj = new PIXI.Sprite.from('monster_1')
            } else if (objCode === 4) {
                obj = new PIXI.Sprite.from('monster_2')
            } else if (objCode === 5) {
                obj = new PIXI.Container()
                const coin = new PIXI.AnimatedSprite(coinTextures)
                coin.anchor.set(0.5, 0)
                coin.x += coin.width * 0.5
                coin.animationSpeed = 0.25
                coin.play()
                obj.addChild(coin)
            } else if (objCode === 6) {
                obj = new PIXI.Sprite.from('cube')
            }

            obj.x = col * config.environment.gap
            obj.y = row * config.environment.gap
            if (objCode === 5) {
                obj.x += obj.width * 0.5
                obj.y += obj.height * 0.5
                obj.pivot.x = obj.width * 0.5
                obj.pivot.y = obj.height * 0.5
                obj.scale.set(0.6, 0.6)
            } else {
                obj.width = config.environment.gap
                obj.height = config.environment.gap
            }
            container.addChild(obj)

            objMap[row][col] = obj
        }
    }

    return container
}

export { mapCollisionDetection, mapObjectSet }
export { mapCollisionDetection as default }

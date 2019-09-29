import * as PIXI from 'pixi.js'
import {
    TimelineMax, Power3
} from 'gsap'
import { Howl } from 'howler'
import { pixiImgLoader } from './scripts/loader'
import { config } from './config'
import { Character } from './components/character'
import { keyboardListener } from './scripts/keyboard-listener'
import { environment } from './components/environment'
import { mapCollisionDetection, mapObjectSet } from './scripts/map'
import { CoinBoard } from './components/coin-board'
import { LifeBoard } from './components/life-board'
import { qaInit } from './scripts/qa'

const gameInit = (next, gameover = () => {}) => {
    const pixi = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        view: document.getElementById('platformerGame')
    })

    keyboardListener()
    qaInit()

    const { resources } = PIXI.Loader.shared
    const view = environment()
    const obj = mapObjectSet()
    const coinBoard = new CoinBoard()
    const lifeBoard = new LifeBoard()
    const jumpSound = new Howl({ src: [resources.jump.url] })
    const landSound = new Howl({ src: [resources.land.url] })
    const music = new Howl({ src: [resources.music_2.url], loop: true, volume: 0.5 })
    const runSound = new Howl({ src: [resources.run_2.url], loop: true, rate: 2, mute: true })
    const attackedSound = new Howl({ src: [resources.attacked.url] })
    const trapSound = new Howl({ src: [resources.trap.url] })
    const deadSound = new Howl({ src: [resources.dead.url] })
    const winSound = new Howl({ src: [resources.win.url] })
    const failSound = new Howl({ src: [resources.fail.url], volume: 0.85 })

    music.play()
    runSound.play()

    lifeBoard.container.scale.x = config.environment.scale
    lifeBoard.container.scale.y = config.environment.scale
    lifeBoard.container.x = 10
    lifeBoard.container.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2 + 10

    coinBoard.container.scale.x = config.environment.scale
    coinBoard.container.scale.y = config.environment.scale
    coinBoard.container.x = 30 + lifeBoard.container.width
    coinBoard.container.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2 + 10

    const character = new Character()
    const mask = new PIXI.Sprite(PIXI.Texture.WHITE)
    mask.width = config.environment.width
    mask.height = config.environment.height
    view.mask = mask

    // const gameOver = new PIXI.Sprite.from('game_over')
    // gameOver.pivot.set(gameOver.width * 0.5, gameOver.height * 0.5)
    // gameOver.scale.x = config.environment.scale
    // gameOver.scale.y = config.environment.scale
    // gameOver.position.set(window.innerWidth * 0.5, view.height * 0.5)
    // gameOver.visible = false
    view.addChild(obj, character.container, mask)

    view.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2

    pixi.stage.addChild(view, lifeBoard.container, coinBoard.container)

    const { container } = character
    container.x = window.innerWidth / 9
    container.y = config.environment.gap * 10

    let viewUpdateInterval
    const viewUpdate = () => {
        if (config.environment.gameOver === true) {
            clearInterval(viewUpdateInterval)
            config.environment.pause = true
            runSound.stop()
            music.stop()
            failSound.play()
            gameover()
            // gameOver.visible = true
            // TweenMax.from(gameOver, 5, { y: 0, alpha: 0 })
            return
        }
        if (config.environment.pause === true) return
        coinBoard.update()

        const movement = config.environment.gap / 8
        // const detectTranslateX = (config.character.toward) ? -25 : 25

        if (config.keypress['39']) { // 右
            const moveRightObj = Math.max(mapCollisionDetection(container.x + movement, container.y), mapCollisionDetection(container.x + movement, container.y - container.height), mapCollisionDetection(container.x + movement, container.y - container.height * 0.5))

            if (moveRightObj === 0) container.x += movement
            else if (moveRightObj === 2 || moveRightObj === 3 || moveRightObj === 4) {
                config.character.dying = true

                if (moveRightObj === 2) trapSound.play()
                else if ([3, 4].indexOf(moveRightObj) !== -1) attackedSound.play()
            }

            if (!config.character.jumping
                && !config.character.falling
                && !config.character.dying) character.run()
            character.right()
            config.character.toward = 1
        } else if (config.keypress['37']) { // 左
            const moveLeftObj = Math.max(mapCollisionDetection(container.x - movement, container.y), mapCollisionDetection(container.x - movement, container.y - container.height), mapCollisionDetection(container.x - movement, container.y - container.height * 0.5))

            if (moveLeftObj === 0) container.x -= movement
            else if (moveLeftObj === 2 || moveLeftObj === 3 || moveLeftObj === 4) {
                config.character.dying = true

                if (moveLeftObj === 2) trapSound.play()
                else if ([3, 4].indexOf(moveLeftObj) !== -1) attackedSound.play()
            }

            if (!config.character.jumping
                && !config.character.falling
                && !config.character.dying) character.run()
            character.left()
            config.character.toward = 0
        } else if (!config.keypress['37'] // 站立
            && !config.keypress['39']
            && !config.character.jumping
            && !config.character.falling
            && !config.character.dying) character.stand()

        // 跳
        if (config.keypress['32']) {
            if (!config.character.jumping && !config.character.falling) {
                config.character.jumping = true
                config.character.jumpingPower = 30
                jumpSound.play()
            }
        }

        // 如果下方沒有地板
        if ([0, 2].indexOf(mapCollisionDetection(container.x, container.y + movement)) !== -1
            && [0, 2].indexOf(mapCollisionDetection(container.x + movement, container.y + movement)) !== -1
            && [0, 2].indexOf(mapCollisionDetection(container.x - movement, container.y + movement)) !== -1
            && !config.character.falling
            && !config.character.jumping) config.character.falling = true

        // 跳躍狀態
        if (config.character.jumping === true) {
            if (mapCollisionDetection(container.x, container.y - container.height) === 1) {
                config.character.jumping = false
                config.character.falling = true
            } else if (config.character.jumpingPower > 0) {
                container.y -= movement
                config.character.jumpingPower -= 1
            } else {
                config.character.jumping = false
                config.character.falling = true
            }
            character.jump()

        // 掉落狀態
        } else if (config.character.falling === true) {
            const moveDownObj = mapCollisionDetection(container.x, container.y + movement)
            if (moveDownObj === 0) {
                container.y += movement
                character.fall()
            } else if (moveDownObj === 2 || moveDownObj === 3 || moveDownObj === 4) {
                config.character.dying = true

                if (moveDownObj === 2) trapSound.play()
                else if ([3, 4].indexOf(moveDownObj) !== -1) attackedSound.play()
            } else {
                config.character.falling = false
                character.stand()
                landSound.play()
            }
        }

        // 超出左邊界
        if (container.x < 0) container.x = 0
        else if (container.x < config.environment.position) container.x += movement

        // 超出右邊界
        if (container.x > config.environment.width - 100) {
            config.result.coins += (config.character.lives * 10)
            runSound.stop()
            music.stop()
            winSound.play()
            next()
            clearInterval(viewUpdateInterval)
        }
        if (container.x > config.environment.width) container.x = config.environment.width

        // 超出畫面一半
        if (container.x > config.environment.position + config.environment.gap * 11
            && config.environment.position + (config.environment.gap * 23.5) < obj.width) {
            config.environment.position += movement
            view.x -= movement * config.environment.scale
            // obj.x -= movement * config.environment.scale
        }

        // 死亡, 生命條
        if (config.character.dying === true) {
            config.environment.pause = true
            character.die()
            setTimeout(() => {
                deadSound.play()
            }, 1000)
            const tl = new TimelineMax({
                onComplete: () => {
                    config.character.dying = false
                    config.character.lives -= 1
                    lifeBoard.update()

                    if (config.character.lives === 0) {
                        config.environment.gameOver = true
                    } else {
                        setTimeout(() => {
                            config.environment.pause = false
                            config.character.falling = true
                            container.x = config.environment.position + (3 * config.environment.gap)
                            container.y = 0
                        }, 1000)
                    }
                }
            })
            tl
                .to(container, 0.5, { y: '-=50', delay: 0.5 })
                .to(container, 1, {
                    y: config.environment.height + character.container.height,
                    ease: Power3.easeIn
                })
        }

        // 遊戲結束
        if (config.environment.gameover === true) {
            // ..
        }

        // 跑步音效判斷
        if ((config.keypress['37']
            || config.keypress['39'])
            && !config.character.jumping
            && !config.character.falling
            && !config.character.dying
            && !config.environment.pause) {
            runSound.mute(false)
        } else {
            runSound.mute(true)
        }
    }
    viewUpdateInterval = setInterval(viewUpdate, 1000 / config.preference.fps)

    const eventListener = () => {
        window.addEventListener('resize', () => {
            pixi.renderer.resize(window.innerWidth, window.innerHeight)
            config.environment.scale = window.innerWidth / config.screen.cols * config.screen.rows / config.environment.height
            view.scale.x = config.environment.scale
            view.scale.y = config.environment.scale
            view.x = -config.environment.position * config.environment.scale
            view.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2

            lifeBoard.container.scale.x = config.environment.scale
            lifeBoard.container.scale.y = config.environment.scale
            lifeBoard.container.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2 + 10

            coinBoard.container.position.set(30 + lifeBoard.container.width, 10)
            coinBoard.container.scale.x = config.environment.scale
            coinBoard.container.scale.y = config.environment.scale
            coinBoard.container.y = (window.innerHeight - config.environment.gap * config.screen.rows * config.environment.scale) / 2 + 10

            // gameOver.position.set(window.innerWidth * 0.5, view.height * 0.5)
            // gameOver.scale.x = config.environment.scale
            // gameOver.scale.y = config.environment.scale
        })
    }
    eventListener()
}

export { gameInit, pixiImgLoader }
export { gameInit as default }

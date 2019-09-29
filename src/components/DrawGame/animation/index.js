import $ from 'jquery'
import * as PIXI from 'pixi.js'
import { config } from './config'
import { canvasInit } from './components/canvas'
import { keyboardListener } from './scripts/keyboard-listener'

const gameInit = () => {
    const pixi = new PIXI.Application({
        width: 1024 * 0.6,
        height: window.innerHeight - 320,
        view: document.getElementById('game'),
        backgroundColor: 0xffffff,
        preserveDrawingBuffer: true
    })

    keyboardListener()

    const colorPicker = $('#colorPicker')
    const { colors } = config.preference
    for (let i = 0; i < colors.length; i += 1) {
        const br = ((i + 1) % 3 === 0 || i === colors.length - 1) ? '<br />' : ''
        const color = $(`
        <div class="color" color-data="${colors[i]}">
            <svg viewBox="0 0 30 30" width="50" height="50">
                <path fill="#${colors[i].toString(16).padStart(6, '0')}" stroke="#ccc" stroke-width="1" d="M7.5 2 L22.5 2 L30 15 L22.5 28 L7.5 28 L0 15 Z" />
            </svg>
        </div>
        ${br}
        `)
        color.appendTo(colorPicker)
        color.on('click', (e) => {
            $('.color').removeClass('active')
            $(e.target).parents('.color').addClass('active')
            config.preference.color = colors[i]
        })
    }
    // const prev = $('<div class="btn-prev"></div>')
    // const next = $('<div class="btn-next"></div>')
    // colorPicker.append(prev, next)
    // prev.on('click', () => {
    //     if (config.preference.steps === 0) return
    //     config.preference.steps -= 1
    //     console.log(config.preference.steps)
    //     canvasBack(config.preference.steps)
    // })
    // next.on('click', () => {
    //     if (config.preference.steps >= config.preference.newest) return
    //     config.preference.steps += 1
    //     console.log(config.preference.steps)
    //     canvasBack(config.preference.steps)
    // })

    config.screen.width = pixi.view.width
    config.screen.height = pixi.view.height
    const canvasContainer = canvasInit()
    pixi.stage.addChild(canvasContainer)

    const viewUpdate = () => {
        // pixi.stage.removeChild(canvasContainer)
        // canvasContainer = canvasInit()
        // pixi.stage.addChild(canvasContainer)
    }

    // TODO:
    const viewUpdateInterval = setInterval(viewUpdate, 1000 / config.preference.fps) // eslint-disable-line

    const eventListener = () => {
        window.addEventListener('resize', () => {
            // pixi.renderer.resize(window.innerWidth, window.innerHeight)
            config.screen.width = pixi.view.width
            config.screen.height = pixi.view.height
        })
    }
    eventListener()
}

export { gameInit }
export { gameInit as default }

import { config } from '../config'

const keyboardListener = () => {
    window.addEventListener('keydown', (e) => {
        // console.log(e)
        // 右
        if (e.keyCode === 39) config.keypress['39'] = true
        // 左
        if (e.keyCode === 37) config.keypress['37'] = true
        // 空白
        if (e.keyCode === 32) config.keypress['32'] = true
        // esc
        if (e.keyCode === 27) config.environment.pause = !config.environment.pause
    })
    window.addEventListener('keyup', (e) => {
        // 右
        if (e.keyCode === 39) config.keypress['39'] = false
        // 左
        if (e.keyCode === 37) config.keypress['37'] = false
        // 空白
        if (e.keyCode === 32) config.keypress['32'] = false
    })
    window.addEventListener('mousedown', (e) => {
        if (e.target.id === 'game' && config.preference.color !== null) {
            config.keypress.mouseActive = true
            config.preference.steps += 1
            config.preference.newest = config.preference.steps
        }
        config.keypress.mousedown = true
    })
    window.addEventListener('mouseup', () => {
        if (config.keypress.mouseActive) {
            config.keypress.mouseActive = false
        }
        config.keypress.mousedown = false
    })
}

export { keyboardListener }
export { keyboardListener as default }

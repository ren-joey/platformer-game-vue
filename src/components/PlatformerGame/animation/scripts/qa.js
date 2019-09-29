import $ from 'jquery'
import * as PIXI from 'pixi.js'
import { Howl } from 'howler'
import { config } from '../config'
import { getRandomNumber } from '@/utils'

let qa

const qaReset = () => {
    $('#qaWrap').attr('class', 'qa-wrap')
    config.environment.pause = false
}

const answer = (ans) => {
    const qaWrap = $('#qaWrap')
    const { resources } = PIXI.Loader.shared
    const bingoSound = new Howl({ src: [resources.bingo.url] })
    const mistakeSound = new Howl({ src: [resources.mistake.url] })
    if (qa.answer === ans) {
        qaWrap.removeClass('question').addClass('true')
        config.answers.win.push(qa)
        config.result.coins += 6
        bingoSound.play()
    } else {
        qaWrap.removeClass('question').addClass('false')
        config.answers.wrong.push(qa)
        mistakeSound.play()
    }

    setTimeout(qaReset, 2000)
}

const qaInit = () => {
    // TODO:
    // const question = config.questions[getRandomNumber(0, config.questions.length - 1)]

    // const qaWrap = $('<div/>', {
    //     class: 'qa-wrap'
    // }).appendTo('body')

    // const qaMask = $('<div/>', {
    //     class: 'qa-mask'
    // }).appendTo(qaWrap)

    // const qaContainer = $('<div/>', {
    //     class: 'qa-container'
    // }).appendTo(qaWrap)

    // const qaContent = $('<div/>', {
    //     class: 'qa-content'
    // }).appendTo(qaContainer)

    // const btnWrap = $('<div/>', {
    //     class: 'btn-wrap'
    // }).appendTo(qaContainer)

    // const btnTrue = $('<div/>', {
    //     class: 'btn-true'
    // }).appendTo(btnWrap)

    // const btnFalse = $('<div/>', {
    //     class: 'btn-false'
    // }).appendTo(btnWrap)

    const qaWrap = $('#qaWrap')

    qaWrap
        .on('click', '.btn-true', () => {
            answer(true)
        })
        .on('click', '.btn-false', () => {
            answer(false)
        })
}

const qaViewUpdate = () => {
    const qaWrap = $('#qaWrap')
    const qaTip = $('#qaTip')
    const qaQuestion = $('#qaQuestion')
    const qaAnswer = (qa.answer) ? '是' : '否'

    qaWrap.attr('class', 'qa-wrap').addClass('tip')
    qaTip.html(`
    <div class="qa-question">${qa.question}</div>
    <div class="qa-tip">提示：${qaAnswer}</div>
    `)
    qaQuestion.html(`
    <div>${qa.question}</div>
    `)

    setTimeout(() => {
        qaWrap.removeClass('tip').addClass('question')
    }, 2000)
}

const makeQa = (type = 'easy') => {
    let idx
    if (type === 'easy') {
        idx = getRandomNumber(0, config.questions.easy.length - 1)
        qa = config.questions.easy[idx]
        config.questions.easy.splice(idx, 1)
    } else if (type === 'hard') {
        idx = getRandomNumber(0, config.questions.hard.length - 1)
        qa = config.questions.hard[idx]
        config.questions.hard.splice(idx, 1)
    } else if (type === 'trap') {
        idx = getRandomNumber(0, config.questions.trap.length - 1)
        qa = config.questions.trap[idx]
        config.questions.trap.splice(idx, 1)
    }

    qaViewUpdate()
}

export { qaInit as default }
export { qaInit, makeQa }

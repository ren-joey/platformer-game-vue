import * as PIXI from 'pixi.js'
import bar_1 from '@/assets/images/bar_1.png'
import bar_2 from '@/assets/images/bar_2.png'
import bg_1 from '@/assets/images/bg_1.png'
import bg_2 from '@/assets/images/bg_2.png'
import bg_cloud from '@/assets/images/bg_cloud.jpg'
import bg_pass from '@/assets/images/bg_pass.jpg'
import bg_start from '@/assets/images/bg_start.jpg'
import c_die from '@/assets/images/c_die.png'
import c_fall from '@/assets/images/c_fall.png'
import c_jump from '@/assets/images/c_jump.png'
import c_run_1 from '@/assets/images/c_run_1.png'
import c_run_2 from '@/assets/images/c_run_2.png'
import c_run_3 from '@/assets/images/c_run_3.png'
import c_run_4 from '@/assets/images/c_run_4.png'
import c_run_5 from '@/assets/images/c_run_5.png'
import c_run_6 from '@/assets/images/c_run_6.png'
import c from '@/assets/images/c.png'
import coin_0 from '@/assets/images/coin_0.png'
import coin_1 from '@/assets/images/coin_1.png'
import coin_2 from '@/assets/images/coin_2.png'
import coin_3 from '@/assets/images/coin_3.png'
import coin_4 from '@/assets/images/coin_4.png'
import coin_5 from '@/assets/images/coin_5.png'
import coin_6 from '@/assets/images/coin_6.png'
import coin_7 from '@/assets/images/coin_7.png'
import coin_8 from '@/assets/images/coin_8.png'
import cube from '@/assets/images/cube.png'
import earth_1 from '@/assets/images/earth_1.png'
import earth_2 from '@/assets/images/earth_2.png'
import game_over from '@/assets/images/game_over.png'
import ground_1 from '@/assets/images/ground_1.png'
import ground_2 from '@/assets/images/ground_2.png'
import heart_empty from '@/assets/images/heart_empty.png'
import heart from '@/assets/images/heart.png'
import monster_1 from '@/assets/images/monster_1.png'
import monster_2 from '@/assets/images/monster_2.png'
import spike_1 from '@/assets/images/spike_1.png'
import spike_2 from '@/assets/images/spike_2.png'
import { config } from '../config'

import attacked from '@/assets/music/attacked.mp3'
import attacked_2 from '@/assets/music/attacked_2.mp3'
import bingo from '@/assets/music/bingo.mp3'
import dead from '@/assets/music/dead_2.mp3'
import earn_money from '@/assets/music/earn_money.mp3'
import earn_money_2 from '@/assets/music/earn_money_2.mp3'
import fail from '@/assets/music/fail.mp3'
import fail_2 from '@/assets/music/fail_2.mp3'
import jump from '@/assets/music/jump.mp3'
import land from '@/assets/music/land.mp3'
import music from '@/assets/music/music.mp3'
import music_2 from '@/assets/music/music_2.mp3'
import question from '@/assets/music/question.mp3'
import run from '@/assets/music/run.mp3'
import run_2 from '@/assets/music/run_2.mp3'
import start from '@/assets/music/start.mp3'
import trap from '@/assets/music/trap.mp3'
import win from '@/assets/music/win.mp3'
import mistake from '@/assets/music/mistake.mp3'

const pixiImgLoader = (callback = () => { }) => {
    // let resources = [
    //     'bar_1',
    //     'bar_2',
    //     'bg_1',
    //     'bg_2',
    //     'bg_cloud',
    //     'bg_pass',
    //     'bg_start',
    //     'c_die',
    //     'c_fall',
    //     'c_jump',
    //     'c_run_1',
    //     'c_run_2',
    //     'c_run_3',
    //     'c_run_4',
    //     'c_run_5',
    //     'c_run_6',
    //     'c',
    //     'coin_0',
    //     'coin_1',
    //     'coin_2',
    //     'coin_3',
    //     'coin_4',
    //     'coin_5',
    //     'coin_6',
    //     'coin_7',
    //     'coin_8',
    //     'cube',
    //     'earth_1',
    //     'earth_2',
    //     'game_over',
    //     'ground_1',
    //     'ground_2',
    //     'heart_empty',
    //     'heart',
    //     'monster_1',
    //     'monster_2',
    //     'spike_1',
    //     'spike_2'
    // ]
    // resources = resources.map(img => ({
    //     name: img,
    //     url: `${img}.png`,
    //     crossOrigin: true
    // }))
    const loader = PIXI.Loader.shared
    // loader.baseUrl = 'http://surgestudio.net/document/game/img'
    loader
        .add('bar_1', bar_1)
        .add('bar_2', bar_2)
        .add('bg_1', bg_1)
        .add('bg_2', bg_2)
        .add('bg_cloud', bg_cloud)
        .add('bg_pass', bg_pass)
        .add('bg_start', bg_start)
        .add('c_die', c_die)
        .add('c_fall', c_fall)
        .add('c_jump', c_jump)
        .add('c_run_1', c_run_1)
        .add('c_run_2', c_run_2)
        .add('c_run_3', c_run_3)
        .add('c_run_4', c_run_4)
        .add('c_run_5', c_run_5)
        .add('c_run_6', c_run_6)
        .add('c', c)
        .add('coin_0', coin_0)
        .add('coin_1', coin_1)
        .add('coin_2', coin_2)
        .add('coin_3', coin_3)
        .add('coin_4', coin_4)
        .add('coin_5', coin_5)
        .add('coin_6', coin_6)
        .add('coin_7', coin_7)
        .add('coin_8', coin_8)
        .add('cube', cube)
        .add('earth_1', earth_1)
        .add('earth_2', earth_2)
        .add('game_over', game_over)
        .add('ground_1', ground_1)
        .add('ground_2', ground_2)
        .add('heart_empty', heart_empty)
        .add('heart', heart)
        .add('monster_1', monster_1)
        .add('monster_2', monster_2)
        .add('spike_1', spike_1)
        .add('spike_2', spike_2)
        .add('attacked', attacked)
        .add('attacked_2', attacked_2)
        .add('bingo', bingo)
        .add('dead', dead)
        .add('earn_money', earn_money)
        .add('earn_money_2', earn_money_2)
        .add('fail', fail)
        .add('fail_2', fail_2)
        .add('jump', jump)
        .add('land', land)
        .add('music', music)
        .add('music_2', music_2)
        .add('question', question)
        .add('run', run)
        .add('run_2', run_2)
        .add('start', start)
        .add('trap', trap)
        .add('win', win)
        .add('mistake', mistake)
        .on('progress', () => {
            config.load.progress = PIXI.Loader.shared.progress
        })
        .load(() => {
            setTimeout(() => {
                callback()
            }, 3000)
        })
}

export { pixiImgLoader as default }
export { pixiImgLoader }

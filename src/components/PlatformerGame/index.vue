<template>
    <div class="platformer-game-wrap">
        <div class="loading"
             v-show="!loaded || !started"
             :class="{
                 transparent: loaded
             }"
        >
            <div class="progress"
                 style="width: 60%"
                 v-show="!loaded"
            >
                <div class="progress-bar progress-bar-striped bg-danger"
                     role="progressbar"
                     :style="{ width: `${config.load.progress}%`}"
                />
            </div>

            <div id="startBtn"
                 class="start-btn"
                 v-show="loaded && !started"
                 @click="startGame"
            />
        </div>
        <div id="qaWrap"
             class="qa-wrap"
             v-show="loaded"
        >
            <div class="qa-container" qa-type="tip">
                <div id="qaTip" class="qa-content" />
                <div class="btn-wrap" />
            </div>
            <div class="qa-container" qa-type="question">
                <div id="qaQuestion" class="qa-content" />
                <div class="btn-wrap">
                    <div class="btn-true" />
                    <div class="btn-false" />
                </div>
            </div>
            <div class="qa-container" qa-type="false">
                <div class="qa-content">
                    <br />
                    <div class="qa-wrong-msg" />
                    <br />
                    <div class="qa-wrong-img" />
                </div>
            </div>
            <div class="qa-container" qa-type="true">
                <div class="qa-content">
                    <br />
                    <div class="qa-win-msg" />
                    <br />
                    <div class="qa-win-img" />
                </div>
            </div>
            <div class="qa-mask" />
        </div>
        <div class="game-over"
             v-show="failed"
             ref="gameover"
        />
        <canvas id="platformerGame" ref="canvas" />
        <div class="bg-pass" v-show="passed" />
        <div class="black-mask"
             v-show="failed"
             ref="blackMask"
        />
    </div>
</template>

<script>
import { TweenLite } from 'gsap'
import { pixiImgLoader, gameInit } from './animation'
import { config } from './animation/config'

export default {
    props: {
        setActivePage: {
            type: Function,
            default: () => {}
        },
        updateScore: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            loaded: false,
            started: false,
            passed: false,
            failed: false,
            config
        }
    },
    mounted() {
        if (this.loaded) return
        const vm = this
        pixiImgLoader(() => {
            setTimeout(() => {
                vm.loaded = true
                gameInit(() => {
                    vm.passed = true
                    TweenLite.to(vm.$refs.canvas, 3, { opacity: 0 })

                    setTimeout(() => {
                        vm.updateScore()
                    }, 2000)
                }, () => {
                    vm.failed = true
                    TweenLite.from(vm.$refs.gameover, 5, { top: 0,
                        y: '-100%',
                        opacity: 0,
                        onComplete() {
                            TweenLite.to(vm.$refs.blackMask, 5, { opacity: 1,
                                onComplete() {
                                    // location.href = '/'

                                    vm.updateScore()
                                } })
                        } })
                })
            }, 1000)
        })
    },
    methods: {
        startGame() {
            this.started = true
            config.environment.pause = false
        }
    }
}
</script>

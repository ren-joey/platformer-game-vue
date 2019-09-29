<template>
    <div id="drawGame" class="draw-game-wrap">
        <div id="qaWrap" class="qa-wrap">
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
        <div class="canvas-wrap">
            <div class="title-wrap">
                <div class="title-container">
                    彩繪塗鴉
                </div>
            </div>
            <div class="canvas-container">
                <div class="canvas-app">
                    <canvas id="game" />
                </div>
                <div id="colorPicker" class="color-picker" />
            </div>
            <div class="btn-wrap">
                <div class="btn">
                    完成
                </div>
            </div>
        </div>
        <div class="bg-cloud" />
    </div>
</template>

<script>
import { gameInit } from './animation'

export default {
    mounted() {
        gameInit()
    }
}
</script>

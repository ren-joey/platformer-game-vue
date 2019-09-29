<template>
    <div id="drawGame" class="draw-game-wrap">
        <div class="question-wrap" v-if="activeContent === 'question'">
            <div class="title-wrap">
                <div class="title-container">
                    答題回顧
                </div>
            </div>
            <div class="question-container">
                <table border="1">
                    <thead>
                        <tr>
                            <th>題目</th>
                            <th>作答</th>
                            <th>答案</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="q1 in config.answers.win" :key="q1.id">
                            <td v-html="q1.question" />
                            <td v-html="(q1.answer) ? '是' : '否'" />
                            <td v-html="(q1.answer) ? '是' : '否'" />
                        </tr>
                        <tr class="wrong"
                            v-for="q2 in config.answers.wrong"
                            :key="q2.id"
                        >
                            <td v-html="q2.question" />
                            <td v-html="(q2.answer) ? '是' : '否'" />
                            <td v-html="(q2.answer) ? '否' : '是'" />
                        </tr>
                    </tbody>
                </table>
                <div class="btn-wrap">
                    <div class="btn" @click="activeContent = 'result'">
                        關閉
                    </div>
                </div>
            </div>
        </div>
        <div class="result-wrap" v-else-if="activeContent === 'result'">
            <div class="title-wrap">
                <div class="title-container">
                    獲得分數
                </div>
            </div>
            <div class="result-board">
                <div class="name" v-html="name" />
                <div class="score" v-html="config.result.coins" />
                <div class="desc">
                    剩餘的每個生命可額外加10分！<br />
                    系統將自動記錄最高分數。請繼續完成彩繪塗鴉！
                </div>
                <div class="confirm" @click="activeContent = 'pre-canvas'" />
                <div class="rank" @click="activeContent = 'rank'" />
            </div>
        </div>
        <div class="rank-wrap" v-if="activeContent === 'rank'">
            <div class="title-wrap">
                <div class="title-container">
                    目前排行
                </div>
            </div>
            <div class="rank-container">
                <table border="1">
                    <thead>
                        <tr>
                            <th>名次</th>
                            <th>學校名稱</th>
                            <th>班級</th>
                            <th>座號</th>
                            <th>姓名</th>
                            <th>總分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, idx) in rank" :key="user.school_id + user.class + user.seat_number">
                            <td v-html="idx + 1" />
                            <td v-html="user.school_name" />
                            <td v-html="user.class" />
                            <td v-html="user.seat_number" />
                            <td v-html="user.name" />
                            <td v-html="user.score" />
                        </tr>
                    </tbody>
                </table>
                <div class="btn-wrap">
                    <div class="btn" @click="activeContent = 'result'">
                        關閉
                    </div>
                </div>
            </div>
        </div>
        <div class="pre-canvas-wrap" v-else-if="activeContent === 'pre-canvas'">
            <div class="title-wrap">
                <div class="title-container">
                    彩繪塗鴉
                </div>
            </div>
            <div class="pre-canvas-board">
                <div class="desc">
                    緊接著請發揮創意，完成塗鴉彩繪後，完成大冒險任務！
                </div>
                <div class="confirm" @click="activeContent = 'canvas'" />
            </div>
        </div>
        <div class="canvas-wrap" v-else-if="activeContent === 'canvas'">
            <div class="title-wrap">
                <div class="title-container">
                    彩繪塗鴉
                </div>
            </div>
            <div class="canvas-container">
                <div class="canvas-app">
                    <canvas id="game" ref="drawCanvas" />
                </div>
                <div id="colorPicker" class="color-picker" />
            </div>
            <div class="btn-wrap">
                <div class="btn" @click="updateUrlByMethod">
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
    props: {
        config: {
            type: Object,
            default: () => {}
        },
        rank: {
            type: Array,
            default: () => []
        },
        name: {
            type: String,
            default: ''
        },
        updateUrl: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            activeContent: 'question'
        }
    },
    watch: {
        activeContent(target) {
            if (target === 'canvas') {
                this.$nextTick(() => {
                    gameInit()
                })
            }
        }
    },
    methods: {
        updateUrlByMethod() {
            const canvas = this.$refs.drawCanvas
            const img = canvas.toDataURL('image/png')

            this.updateUrl(img)
        }
    }
}
</script>

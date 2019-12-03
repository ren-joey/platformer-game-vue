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
                        <tr v-for="(user, idx) in rank" :key="idx">
                            <td v-html="+rankStart + idx + 1" />
                            <td v-html="user.school_name" />
                            <td v-html="user.class" />
                            <td v-html="user.seat_number" />
                            <td v-html="nameMask(user.name)" />
                            <td v-html="user.score" />
                        </tr>
                    </tbody>
                </table>
                <br />
                <div class="text-center" v-if="users.length > 0">
                    <nav aria-label="Page navigation example" style="display: inline-block;">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" @click="rankStart -= 100">上一頁</a>
                            </li>
                            <li class="page-item"
                                v-for="(page, idx) in pages"
                                v-show="page > rankStart - 500 && page < rankStart + 500"
                                :class="{active: page === rankStart}"
                                :key="idx"
                            >
                                <a class="page-link" @click="rankStart = page">{{ idx + 1 }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" @click="rankStart += 100">下一頁</a>
                            </li>
                        </ul>
                    </nav>
                </div>
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
        users: {
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
            activeContent: 'question',
            rankStart: 0
        }
    },
    computed: {
        rank() {
            return this.users.concat().sort((a, b) => b.score - a.score).slice(this.rankStart, this.rankStart + 100)
        },
        pages() {
            if (this.users.length === 0) return []
            const pages = []
            for (let i = 0; i <= this.users.length; i += 100) {
                pages.push(i)
            }
            return pages
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
        nameMask(name) {
            const nameMask = name.split('')
            nameMask[1] = '◯'
            return nameMask.join('')
        },
        updateUrlByMethod() {
            const canvas = this.$refs.drawCanvas
            const img = canvas.toDataURL('image/png')

            this.updateUrl(img)
        }
    }
}
</script>

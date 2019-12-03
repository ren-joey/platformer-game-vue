<template>
    <div class="wrap">
        <template v-if="activePage === 'index'">
            <div class="home">
                <div class="wrapper">
                    <header>
                        <div class="title-badge" />
                        <div class="title-img" />
                        <div class="slogan" />
                    </header>
                    <div class="main-container">
                        <div class="nav-bar">
                            <nav class="nav nav-1"
                                 :class="{active: activeContent === 'announcement'}"
                                 @click="activeContent = 'announcement'"
                            />
                            <nav class="nav nav-2"
                                 :class="{active: activeContent === 'info'}"
                                 @click="activeContent = 'info'"
                            />
                            <nav tag="div"
                                 class="nav nav-3"
                                 @click="loginEnable = true"
                            />
                            <nav class="nav nav-4"
                                 :class="{active: activeContent === 'rank'}"
                                 @click="activeContent = 'rank'"
                            />
                            <nav class="nav nav-5"
                                 :class="{active: activeContent === 'images'}"
                                 @click="activeContent = 'images'"
                            />
                        </div>
                        <div v-if="activeContent === 'announcement'" class="main-content">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th style="width: 180px;">
                                            <strong>一、主辦單位：</strong>
                                        </th>
                                        <td>臺中市政府衛生局</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>二、協辦單位：</strong>
                                        </th>
                                        <td>臺中市政府教育局</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>三、參加對象：</strong>
                                        </th>
                                        <td>臺中市國小六年級學童</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>四、活動目的：</strong>
                                        </th>
                                        <td>為落實菸害防制的預防教育向下扎根，臺中市政府衛生局建立網路學習與競賽環境，透過趣味競賽遊戲氛圍，讓學童了解菸品、二手菸、三手菸、電子菸的危害，與學習拒菸的能力，進而達成從小不吸菸的活動目的。</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>五、活動期間：</strong>
                                        </th>
                                        <td>2019/09/30 ~ 2019/11/27</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>六、檔案下載：</strong>
                                        </th>
                                        <td>
                                            <div class="d-flex">
                                                <a href="/file/有獎徵答題目.pdf"
                                                   class="download-item"
                                                   download
                                                >
                                                    <div class="download-icon" />
                                                    <div class="download-text">
                                                        <strong>有獎徵答題目</strong>
                                                    </div>
                                                </a>
                                                <a href="/file/教學操作手冊0930.pdf"
                                                   class="download-item"
                                                   download
                                                >
                                                    <div class="download-icon" />
                                                    <div class="download-text">
                                                        <strong>教學操作手冊</strong>
                                                    </div>
                                                </a>
                                                <a href="/file/學校序號一覽表.pdf"
                                                   class="download-item"
                                                   download
                                                >
                                                    <div class="download-icon" />
                                                    <div class="download-text">
                                                        <strong>學校序號一覽表</strong>
                                                    </div>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else-if="activeContent === 'info'"
                             class="main-content"
                             style="text-align: center;"
                        >
                            <img src="../assets/images/info.jpg"
                                 alt=""
                                 width="640"
                                 height="655"
                            />
                        </div>
                        <div v-else-if="activeContent === 'rank'" class="main-content">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>排名</th>
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
                            <div class="text-center" v-if="!loaded">
                                <img src="https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif"
                                     alt=""
                                     srcset=""
                                />
                            </div>
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
                        </div>
                        <div v-else-if="activeContent === 'images'" class="main-content">
                            <div class="row">
                                <div class="col-3"
                                     v-for="(user) in images"
                                     :key="user.url"
                                >
                                    <div class="p-3" style="font-size: 0.85em">
                                        <img :src="`/api/school/${user.url}`"
                                             width="100%"
                                             height="auto"
                                             alt=""
                                        />
                                        <br />
                                        {{ `${user.school_name} ${user.class}` }}
                                        <br />
                                        {{ nameMask(user.name) }}
                                    </div>
                                </div>
                            </div>
                            <div class="text-center" v-if="!loaded">
                                <img src="https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif"
                                     alt=""
                                     srcset=""
                                />
                            </div>
                            <div class="text-center" v-if="images.length > 0">
                                <nav aria-label="Page navigation example" style="display: inline-block;">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" @click="imageStart -= 24">上一頁</a>
                                        </li>
                                        <li class="page-item"
                                            v-for="(page, idx) in imagePages"
                                            v-show="page > imageStart - 120 && page < imageStart + 120"
                                            :class="{active: page === imageStart}"
                                            :key="idx"
                                        >
                                            <a class="page-link" @click="imageStart = page">{{ idx + 1 }}</a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" @click="imageStart += 24">下一頁</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loginEnable"
                 class="login"
            >
                <div class="login-board">
                    <select id="schoolSelect"
                            name="school_id"
                            v-model="school_id"
                    >
                        <option value="-1">
                            請選擇
                        </option>
                        <option v-for="school in schools"
                                :value="school.id"
                                :key="school.id + school.address"
                                v-html="school.id.padStart(3, 0) + ' ' + school.name"
                        />
                    </select>
                    <input id="className"
                           type="text"
                           v-model="class_number"
                    />
                    <input id="seatNumber"
                           type="text"
                           v-model="seat_number"
                    />
                    <input id="name"
                           type="text"
                           v-model="name"
                    />
                    <div id="verificationCode" v-html="verification_code" />
                    <input id="verification"
                           type="text"
                           v-model="verification"
                    />
                    <div class="send" @click="send" />
                    <div class="clear" @click="clear" />
                </div>
            </div>
        </template>

        <PlatformerGame v-else-if="activePage === 'platformerGame'"
                        :setActivePage="setActivePage"
                        :updateScore="updateScore"
        />
        <DrawGame v-else-if="activePage === 'drawGame'"
                  :name="name"
                  :config="config"
                  :users="users"
                  :updateUrl="updateUrl"
        />
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import PlatformerGame from './PlatformerGame'
import DrawGame from './DrawGame'
import { config } from './PlatformerGame/animation/config'
import { getRandomNumber } from '@/utils'

export default {
    name: 'Home',
    components: {
        PlatformerGame, DrawGame
    },
    data() {
        return {
            activePage: 'index',
            activeContent: 'announcement',
            school_id: -1,
            class_number: null,
            seat_number: null,
            name: null,
            verification_code: getRandomNumber(0, 16777215).toString(16).padStart(6, 0),
            verification: null,
            schools: [],
            loginEnable: false,
            users: [],
            url: '',
            imageStart: 0,
            rankStart: 0,
            loaded: false,
            config
        }
    },
    computed: {
        school_name() {
            const vm = this
            if (vm.school_id === -1) return null
            return this.schools.find(school => school.id === vm.school_id).name
        },
        question() {
            return JSON.stringify(this.config.answers)
        },
        score() {
            return this.config.result.coins
        },
        images() {
            return this.users.filter(user => (user.url)).slice(this.imageStart, this.imageStart + 24)
        },
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
        },
        imagePages() {
            if (this.users.length === 0) return []
            const images = this.users.filter(user => (user.url))
            if (images.length === 0) return []
            const pages = []
            for (let i = 0; i <= images.length; i += 24) {
                pages.push(i)
            }
            return pages
        }
    },
    created() {
        const vm = this
        axios.get('api/school/').then((response) => {
            vm.loaded = true
            const { schools, users } = response.data
            // console.log(response.data)
            vm.schools = schools
            vm.users = users
            // vm.images = users.filter(user => (user.url))
        }).catch((e) => {
            console.log(e)
        })
    },
    methods: {
        nameMask(name) {
            const nameMask = name.split('')
            nameMask[1] = '◯'
            return nameMask.join('')
        },
        setActivePage(target) {
            this.activePage = target
        },
        clear() {
            this.school_id = -1
            this.class_number = null
            this.seat_number = null
            this.name = null
        },
        send() {
            const { school_id, school_name, class_number, seat_number, name, score, question, url, verification_code, verification } = this

            if (school_id === -1) {
                alert('請選擇學校')
                return
            }

            if (class_number === null || class_number === '') {
                alert('請輸入班級')
                return
            }
            if (seat_number === null || seat_number === '') {
                alert('請輸入座號')
                return
            }
            if (name === null || name === '') {
                alert('請輸入姓名')
                return
            }
            const reg = new RegExp('[A-Za-z0-9$&+,:;=?@#|"~<>.^*%!-{}]')
            if (reg.test(name) === true) {
                alert('請輸入正確的中文姓名，中獎時才能將獎品送到你的手上哦')
                return
            }
            if (verification_code !== verification) {
                alert('驗證碼錯誤，請重新確認。')
                return
            }

            $.ajax({
                method: 'POST',
                url: '/api/school/add.php',
                dataType: 'json',
                data: {
                    school_id,
                    school_name,
                    class: class_number,
                    seat_number,
                    name,
                    score,
                    question,
                    url
                }
            }).always((result) => {
                // console.log(result)
                if (result.responseText === 'success') {
                    // this.$router.push({ path: 'platformer-game' })
                    this.activePage = 'platformerGame'
                } else if (result.responseText === 'exist') {
                    alert('您已經註冊過，繼續突破自己的紀錄吧！系統會自動上傳你最高的分數。')
                    this.activePage = 'platformerGame'
                }
            })
        },
        updateScore() {
            const { school_id, class_number, seat_number, score, question } = this
            $.ajax({
                method: 'POST',
                url: '/api/school/score.php',
                dataType: 'json',
                data: {
                    school_id,
                    class: class_number,
                    seat_number,
                    score,
                    question
                }
            }).always((result) => {
                if (result.responseText === 'success') {
                    alert('個人新紀錄！')
                    // this.$router.push({ path: 'platformer-game' })
                    this.activePage = 'drawGame'
                } else if (['success', 'error'].indexOf(result.responseText) === -1) {
                    alert(`您先前的最高分為${result}，繼續努力打破紀錄吧！`)
                    this.activePage = 'drawGame'
                }
            })
        },
        updateUrl(image) {
            const { school_id, class_number, seat_number } = this
            $.ajax({
                method: 'POST',
                url: '/api/school/image.php',
                dataType: 'json',
                data: {
                    school_id,
                    class: class_number,
                    seat_number,
                    image
                }
            }).always((result) => {
                // console.log(result)
                if (result.responseText === 'success') {
                    // this.$router.push({ path: 'platformer-game' })
                    // this.activePage = 'drawGame'

                    alert('恭喜您已經完成活動！感謝您的參與！')
                    location.href = '/'
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import '@/styles/index';
</style>

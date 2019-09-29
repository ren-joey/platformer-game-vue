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
                            <nav class="nav nav-1" @click="activeContent = 'announcement'" />
                            <nav class="nav nav-2" />
                            <nav tag="div"
                                 class="nav nav-3"
                                 @click="loginEnable = true"
                            />
                            <nav class="nav nav-4" @click="activeContent = 'rank'" />
                            <nav class="nav nav-5" @click="activeContent = 'images'" />
                        </div>
                        <div v-if="activeContent === 'announcement'" class="main-content">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th style="width: 180px;">
                                            <strong>一、主辦單位：</strong>
                                        </th>
                                        <td>台中市政府衛生局</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>二、協辦單位：</strong>
                                        </th>
                                        <td>台中市政府衛生局</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>三、參加對象：</strong>
                                        </th>
                                        <td>台中市國小六年級學童</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>四、活動目的：</strong>
                                        </th>
                                        <td>為落實菸害防制的預防教育向下扎根，台中市政府衛生局建立網路數位學習與競賽環境，透過趣味競賽電玩氛圍、置入優化知識教材，使學童更有興趣學習使用，因此了解二手菸與二手菸的害處與不吸菸觀念。達到遠離菸品危害、維護學童健康之活動目的。</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>五、活動期間：</strong>
                                        </th>
                                        <td>2019/09/01 ~ 2019/10/31</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>六、檔案下載：</strong>
                                        </th>
                                        <td>
                                            <div class="d-flex">
                                                <div class="download-item">
                                                    <div class="download-icon" />
                                                    <div class="download-text">
                                                        <strong>遊戲題庫</strong>
                                                    </div>
                                                </div>
                                                <div class="download-item">
                                                    <div class="download-icon" />
                                                    <div class="download-text">
                                                        <strong>教學說明</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                        <td v-html="idx + 1" />
                                        <td v-html="user.school_name" />
                                        <td v-html="user.class" />
                                        <td v-html="user.seat_number" />
                                        <td v-html="user.name" />
                                        <td v-html="user.score" />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else-if="activeContent === 'images'" class="main-content">
                            <div class="row">
                                <div class="col-3"
                                     v-for="user in images"
                                     :key="user.url"
                                >
                                    <div class="p-3">
                                        <img :src="`/api/school/${user.url}`"
                                             width="100%"
                                             height="auto"
                                             alt=""
                                        />
                                        <br />
                                        {{ `${user.school_name} ${user.class}` }}
                                        <br />
                                        {{ user.name }}
                                    </div>
                                </div>
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
                        <option v-for="school in schools"
                                :value="school.id"
                                :key="school.id + school.address"
                                v-html="school.name"
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
                  :rank="rank"
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
            school_id: null,
            class_number: null,
            seat_number: null,
            name: null,
            verification_code: getRandomNumber(0, 16777215).toString(16).padStart(6, 0),
            verification: null,
            schools: [],
            loginEnable: false,
            url: '',
            images: [],
            rank: [],
            config
        }
    },
    computed: {
        school_name() {
            const vm = this
            return this.schools.find(school => school.id === vm.school_id).name
        },
        question() {
            return JSON.stringify(this.config.answers)
        },
        score() {
            return this.config.result.coins
        }
    },
    created() {
        const vm = this
        axios.get('api/school/').then((response) => {
            const { schools, rank, users } = response.data
            vm.schools = schools
            vm.rank = rank
            vm.images = users.filter(user => (user.url))
        }).catch((e) => {
            console.log(e)
        })
    },
    methods: {
        setActivePage(target) {
            this.activePage = target
        },
        clear() {
            this.school_id = 1
            this.class_number = null
            this.seat_number = null
            this.name = null
        },
        send() {
            const { school_id, school_name, class_number, seat_number, name, score, question, url, verification_code, verification } = this

            if (verification_code !== verification) {
                alert('驗證碼錯誤，請重新確認。')
                return
            }
            if (class_number === null) {
                alert('請輸入班級')
                return
            }
            if (seat_number === null) {
                alert('請輸入座號')
                return
            }
            if (name === null) {
                alert('請輸入姓名')
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
                console.log(result)
                if (result.responseText === 'success') {
                    // this.$router.push({ path: 'platformer-game' })
                    this.activePage = 'platformerGame'
                }
            })
        },
        updateScore() {
            console.log('update')
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
                console.log(result)
                if (result.responseText === 'success') {
                    // this.$router.push({ path: 'platformer-game' })
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
                console.log(result)
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

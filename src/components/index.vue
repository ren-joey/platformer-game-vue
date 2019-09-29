<template>
    <div class="wrap">
        <div class="home">
            <div class="wrapper">
                <header>
                    <div class="title-badge" />
                    <div class="title-img" />
                    <div class="slogan" />
                </header>
                <div class="main-container">
                    <div class="nav-bar">
                        <nav class="nav nav-1" />
                        <nav class="nav nav-2" />
                        <router-link tag="div"
                                     class="nav nav-3"
                                     to="/platformer-game"
                        />
                        <nav class="nav nav-4" />
                        <nav class="nav nav-5" />
                    </div>
                    <div class="main-content">
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
                </div>
            </div>
        </div>
        <div class="login">
            <div class="login-board">
                <select name="" id="">
                    <option value="" />
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            schools: []
        }
    },
    created() {
        axios.get('api/school/').then((response) => {
            console.log(response)
        }).catch((e) => {
            console.log(new Error(e))
        })
    }
}
</script>

<style lang="scss">
    @import '@/styles/index';
</style>

<template>
    <div class="wrapper">
        <div class="text-center" v-if="!fetching">
            <input type="password"
                   class="form-control"
                   placeholder="請輸入下載密碼"
                   v-model="verification"
            />
            <button class="btn btn-outline-primary mt-2" @click="downloadXlsxFile">
                下載所有玩家excel檔
            </button>
        </div>
        <div v-else class="text-center">
            <img src="https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif"
                 alt=""
                 srcset=""
                 width="200"
                 height="auto"
            /><br />
            下載中請稍後<br />
            <small>由於資料量較大，可能需要數十秒的時間...</small>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import * as XLSX from 'xlsx'

export default {
    data() {
        return {
            fetching: false,
            verification: ''
        }
    },
    methods: {
        downloadXlsxFile() {
            const vm = this

            if (vm.verification !== 'nosmokingcomtw') {
                alert('密碼錯誤')
                return
            }

            vm.fetching = true
            axios.get('api/school/').then((response) => {
                const { users } = response.data
                // console.log(response.data)
                // vm.schools = schools
                // vm.users = users
                // vm.images = users.filter(user => (user.url))

                /* make the worksheet */
                const ws = XLSX.utils.json_to_sheet(users)

                /* add to workbook */
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, ws, 'People')

                /* generate an XLSX file */
                XLSX.writeFile(wb, 'sheetjs.xlsx')
                vm.fetching = false
            }).catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

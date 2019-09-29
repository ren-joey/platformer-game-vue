const config = {
    load: {
        progress: 0
    },
    character: {
        runningSpeed: 3,
        jumpingSpeed: 3,
        jumping: false,
        falling: false,
        dying: false,
        lives: 3,
        toward: 1
    },
    screen: {
        cols: 23,
        rows: 11
    },
    environment: {
        gravity: 1,
        cols: 165,
        rows: 11,
        position: 0,
        pause: true,
        gameOver: false
    },
    preference: {
        fps: 60
    },
    keypress: {},
    result: {
        coins: 0,
        lives: 3
    },
    answers: {
        win: [],
        wrong: []
    },
    questions: {
        easy: [
            { id: 1, question: '菸草所含畫決物質有4000多種，其中43種為致癌物', answer: true },
            { id: 2, question: '於草中所含的尼古丁會有成癮性', answer: true },
            { id: 3, question: '吸菸對人體會造成高血壓，心臟病，腦血管疾病等慢性疾病', answer: true },
            { id: 4, question: '吸菸會造成肺癌，鼻咽癌，胃癌以及子宮頸癌', answer: true },
            { id: 5, question: '吸菸不會對男生造成不孕症', answer: false },
            { id: 6, question: '長期暴露在二手菸之中，會增加10〜30％肺癌機率', answer: true },
            { id: 7, question: '吸菸會降低身體免疫力', answer: true },
            { id: 8, question: '吸菸容易造成咳嗽，支氣管炎等症狀', answer: true },
            { id: 9, question: '菸品中的一氧化碳會造成身體疲倦', answer: true },
            { id: 10, question: '菸品中的焦油會讓人牙齒和手指變黃', answer: true },
            { id: 11, question: '青少年正值成長期，由於新陳代謝快，吸菸對身體上的害處較小', answer: false },
            { id: 12, question: '電子煙是一種外形類似菸品的產品，通常由鋰電池，霧化器，卡匣煙彈或補充液所組成', answer: true },
            { id: 13, question: '一小瓶電子煙油的尼古丁含量相當於2000支菸', answer: true },
            { id: 14, question: '吸菸者較非吸菸者，平均壽命減少約10年', answer: true },
            { id: 15, question: '不吸菸能增加自信心，還能提昇人際關係，不用擔心他人眼光', answer: true },
            { id: 16, question: '戒菸的立即好處是身上不再有菸臭，牙齒變得較白', answer: true },
            { id: 17, question: '三手菸危害大，11種高度致癌化合物是沒有安全範圍的', answer: true },
            { id: 18, question: '爸爸想要戒菸，可以就近到衛生所看戒菸門診', answer: true },
            { id: 19, question: '幫助戒菸的方法有咬胡蘿蔔條，芹菜條，小黃瓜以及多運動', answer: true },
            { id: 20, question: '供應菸品予未滿十八歲者，處新台幣三千元以上一萬元以下之罰鍰', answer: true },
            { id: 21, question: '醫院屬於室內外全面禁菸場所，所以圍牆內的大樹下可以抽菸', answer: false },
            { id: 22, question: '送營養午餐的叔叔開著車，抽著菸進學校，沒關係，並不違法', answer: false },
            { id: 23, question: '吸煙的人皮膚顯得暗淡沒有彈性', answer: true },
            { id: 24, question: '85％的肺癌患者和吸菸有關，而5％的肺癌患者和吸二手菸有關', answer: true },
            { id: 25, question: '超商不能提供茶品給未滿十八歲者，但是親人可以', answer: false },
            { id: 26, question: '計程車內只有乘客可以吸菸', answer: false },
            { id: 27, question: '禁菸場所沒有張貼明顯的禁菸標誌，會被罰一萬五萬元', answer: true },
            { id: 28, question: '提醒吸菸的人『要吸菸到屋外』是拒吸二手菸的方法之一', answer: true },
            { id: 29, question: '吸菸也是容易罹患骨質疏鬆症的', answer: true },
            { id: 30, question: '國小校園有四個大門，四個大門都要貼有禁菸標示', answer: true },
            { id: 41, question: '菸草燃燒後產生煙霧內含有尼古丁會使人上癮', answer: true },
            { id: 42, question: '菸草燃燒後產生煙霧導致一氧化碳過高，使人缺氧及記憶力變差', answer: true },
            { id: 43, question: '菸草燃燒後內含有焦油包含很多致癌物質', answer: true },
            { id: 44, question: '吸菸不會造成-口臭', answer: false },
            { id: 45, question: '吸菸不會造成-牙周病', answer: false },
            { id: 46, question: '吸菸不會造成-早期牙齒敗壞', answer: false },
            { id: 47, question: '在禁菸場所吸菸者罰二千至一萬元', answer: true },
            { id: 48, question: '菸害防治法規定，不得供應菸品給未滿18歲的人', answer: true },
            { id: 49, question: '誰能決定你要不要戒菸-自己', answer: true },
            { id: 50, question: '戒菸後肺功能會變好', answer: true },
            { id: 61, question: '戒菸專線：0800-63-63-63', answer: true },
            { id: 62, question: '三人以上的室內工作場所不可以吸菸？', answer: true },
            { id: 63, question: '可以賣菸給幫阿公買菸的小朋友，對不對？', answer: false },
            { id: 64, question: '學校樓梯口，陽台都不可以抽菸', answer: true },
            { id: 65, question: '二手菸比一手菸更毒', answer: true },
            { id: 66, question: '三手菸的毒性化即使菸味散去，依舊會存在吸菸的環境中', answer: true },
            { id: 67, question: '孕婦吸菸會導致胎兒早產及體重不足', answer: true },
            { id: 68, question: '不吸菸的人被迫吸到菸草燃燒產生的有害物質稱為二手菸', answer: true },
            { id: 69, question: '全面禁菸場所包括（餐飲店，商場，旅館，醫療機構，大眾運輸工具，學校，公眾休閒娛樂場所）', answer: true },
            { id: 70, question: '未滿18歲青少年吸菸無須接受戒菸教育', answer: false },
            { id: 71, question: '拒絕別人邀請吸菸的方法「謝謝你，我不吸菸」', answer: true },
            { id: 72, question: '菸品替代物有無糖口香糖，蔬菜棒', answer: true },
            { id: 73, question: '戒菸四絕：放鬆深呼吸，喝杯冷水，活動ー下，清水沖臉', answer: true },
            { id: 74, question: '所有的電梯都是禁菸場所，並不只限於公共場所的電梯？', answer: true },
            { id: 75, question: '可以在雜誌，電台做菸品廣告，對不對？', answer: false },
            { id: 76, question: '夾娃娃機內不可以放置菸品供大家夾取,,對不對？', answer: true },
            { id: 77, question: '可以在網路上賣菸，對不對？', answer: false },
            { id: 78, question: '二手菸的主流煙是吸菸者所吐出的煙，因為空氣充足所以燃燒完全', answer: true },
            { id: 79, question: '二手菸的側流煙是從燃燒的菸頭直接釋放到環境中的煙', answer: true },
            { id: 80, question: '未滿十八歲的人吸菸，需要接受3小時戒菸教育', answer: true },
            { id: 81, question: '菸害防制法是政府為防制菸害，保障大家的健康而訂定的', answer: true },
            { id: 82, question: '菸害防制法的縣市主管機關為衛生局', answer: true }
        ]
    }
}

export { config }
export { config as default }

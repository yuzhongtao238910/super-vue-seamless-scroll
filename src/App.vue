<script setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { ref, onMounted } from "vue"
// data 就可以是父组件传递过来的数据
import { data } from "./data.js"
let count = 0
let uu = []
let interval = null
const list = ref(data);
const offset = ref(0)
const target = ref(null)
const little_Or_big = ref(null)
let testData = []


onMounted(() => {
    const size = target.value.clientHeight
    if (data.length > 0) {
        count = Math.ceil(size / 22)
        data.forEach((item, index) => {
            item._id = index
        })
        if (data.length / count > 2) {
            // 数据量大
            little_Or_big.value = true
            testData = data.slice(0, 2 * count + 1)
            if (!interval) {
                interval = setInterval(load1, 1000 / 50)
            }
        } else if (data.length / count <= 2) {
            // 数据量小
            little_Or_big.value = false
            testData = [...data]
            if (!interval) {
                interval = setInterval(load2, 1000 / 50)
            }
        }
    }
})
const load1 = () => {
    offset.value = offset.value - 1
    if (offset.value === -count * 22) {
        offset.value = 0
        const temp = testData[count]._id
        // console.log(testData[count], chartData.value, testData, count)
        const yy = []
        for (let i = temp; i < temp + 2 * count + 1; i++) {
            if (i < data.length) {
                yy.push({
                    ...data[i]
                })
            } else {
                yy.push({
                    ...data[i - data.length]
                })
            }
        }
        testData = yy
    }
}
const load2 = () => {
    offset.value = offset.value - 1
    if (offset.value === -data.length * 22) {
        offset.value = 0
        testData = [...data]
    } else {
        if (testData.length < 1.5 * data.length) {
            data.forEach((item, index) => {
                uu.push({
                    ...item,
                    // _id: item._id + chartData.value.length
                })
            })
            testData.push(...uu)
            uu = []
        }
    }
}
</script>

<template>
    <div class="temp"></div> 
    <div class="container">
        <vue3-seamless-scroll :list="list" class="scroll">
            <div class="item" v-for="(item, index) in list" :key="index">
                <span>{{item.time}}</span> --- <span>{{item.status}}</span>
            </div>
        </vue3-seamless-scroll>
    </div>

    <hr />
    <div class="scroll-container" ref="target">
        <div
            class="scroll-list"
            :style="{transform: `translate3d(0,${offset}px,0)`}"
        >   <div
                v-for="(item, index) in testData"
                :key="index"
                class="item"
            >
                <div class="it">
                    <span>{{ item.time }}</span> - <span>{{ item.status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.temp {
    height: 200px;
}
.container {
    border: 1px solid gray;
    margin: 0 auto;
    width: 400px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 2px;
}
.scroll {
    overflow: hidden;
    .item {
        color: black;
    }
}
.scroll-container {
    margin: 0 auto;
    margin-top: 2px;
    width: 400px;
    height: 100px;
    overflow: hidden;
    border: 1px solid gray;
}

.scroll-list {
    .item {
        height: 22px;
        line-height: 22px;
    }
}
</style>

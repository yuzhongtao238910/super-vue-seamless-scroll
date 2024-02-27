const data = []
for (let i = 0; i < 5; i++) {
  data.push({
    time: `Vue3.0 无缝滚动组件展示数据第${i}条`,
    status: i % 2 === 0 ? 1 : 0,
  })
}



export {data}
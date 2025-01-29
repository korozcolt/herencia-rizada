// app/js/main.js
const app = Vue.createApp({
    template: `
        <div class="app-container">
            <router-view></router-view>
        </div>
    `
})

app.use(router)
app.mount('#app')
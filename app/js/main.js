// app/js/main.js
const app = Vue.createApp({
    template: `
        <div class="app-container">
            <div v-if="loading">Cargando...</div>
            <div v-else>
                {{ status }}
            </div>
        </div>
    `,
    data() {
        return {
            loading: true,
            status: '',
            wpBaseUrl: 'https://herenciarizada.com'
        }
    },
    async mounted() {
        try {
            const response = await fetch(`${this.wpBaseUrl}/wp-json/wp/v2/posts`, {
                headers: {
                    'Authorization': 'Basic YW5hc29maWFvcm96Y286QW5hU29maWEyMDEzKw=='
                }
            });
            
            const data = await response.json();
            console.log('Response:', data);
            
            if(response.ok) {
                this.status = `Posts cargados: ${data.length}`;
            } else {
                this.status = `Error: ${data.message || 'Error desconocido'}`;
            }
            
        } catch (error) {
            console.error('Error:', error);
            this.status = 'Error de conexión';
        } finally {
            this.loading = false;
        }
    }
})

app.mount('#app')
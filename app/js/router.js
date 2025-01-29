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
            wpBaseUrl: 'https://herenciarizada.com', // Asegúrate de que esta URL sea correcta
            username: 'anasofiaorozco', // Reemplaza con tu nombre de usuario
            password: 'AnaSofia2013+' // Reemplaza con tu contraseña
        }
    },
    async mounted() {
        try {
            // Codificar las credenciales en Base64
            const authString = `${this.username}:${this.password}`;
            const encodedAuth = btoa(authString);

            // Realizar la solicitud GET con autenticación básica
            const response = await fetch(`${this.wpBaseUrl}/wp-json/wp/v2/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${encodedAuth}`,
                    'Content-Type': 'application/json'
                }
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Procesar los datos de la respuesta
            const data = await response.json();
            console.log('Response:', data);
            this.status = `Posts cargados: ${data.length}`;

        } catch (error) {
            console.error('Error:', error);
            this.status = `Error de conexión: ${error.message}`;
        } finally {
            this.loading = false;
        }
    }
});

app.mount('#app');
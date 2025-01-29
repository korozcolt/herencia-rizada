const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: {
                template: `
                    <div class="app-container">
                        <div v-if="loading">Cargando...</div>
                        <div v-else>
                            <div v-if="authStatus.isAuthenticated">
                                <div>Bienvenido: {{user.name}}</div>
                                <div>Posts cargados: {{posts.length}}</div>
                            </div>
                            <div v-else>
                                {{ status }}
                            </div>
                        </div>
                    </div>
                `,
                data() {
                    return {
                        loading: true,
                        status: '',
                        authStatus: {
                            isAuthenticated: false,
                            user: null
                        },
                        user: null,
                        posts: []
                    }
                },
                async mounted() {
                    try {
                        // Verificar autenticación usando WPApi global
                        this.authStatus = await WPApi.auth.checkAuth();
                        console.log('Auth status:', this.authStatus);
                    } catch (error) {
                        console.error('Error:', error);
                        this.status = 'Error de conexión';
                    } finally {
                        this.loading = false;
                    }
                }
            }
        }
    ]
});
import WPApi from '../integrations/wp/api.js';

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
                        // Verificar autenticación
                        this.authStatus = await WPApi.auth.checkAuth();
                        
                        if(this.authStatus.isAuthenticated) {
                            // Si está autenticado, obtener datos del usuario
                            this.user = await WPApi.users.getCurrent();
                            
                            // Obtener posts
                            this.posts = await WPApi.posts.getAll();
                        } else {
                            this.status = 'Usuario no autenticado';
                        }
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
})

export default router;
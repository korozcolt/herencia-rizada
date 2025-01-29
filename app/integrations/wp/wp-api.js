const WPService = {
    baseURL: '/wp-json',
    async checkAuth() {
        try {
            const response = await fetch(`${this.baseURL}/wp/v2/users/me`, {
                credentials: 'same-origin'
            });
            return response.ok ? await response.json() : false;
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
    }
}
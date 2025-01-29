const WPApi = {
    config: {
        baseURL: 'https://herenciarizada.com/wp-json/wp/v2',
        auth: {
            key: 'YW5hc29maWFvcm96Y286QW5hU29maWEyMDEzKw=='
        }
    },

    getHeaders() {
        return {
            'Authorization': `Basic ${this.config.auth.key}`,
            'Content-Type': 'application/json'
        }
    },

    auth: {
        async checkAuth() {
            try {
                const response = await fetch(`${WPApi.config.baseURL}/users/me`, {
                    headers: WPApi.getHeaders()
                });
                return response.ok;
            } catch (error) {
                console.error('Auth check failed:', error);
                return false;
            }
        }
    }
};
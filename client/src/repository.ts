import axios from "axios";
import Cookies from "js-cookie";

const REACT_APP_API_URL  = process.env.REACT_APP_BASE_URL;

const repository = axios.create({
    baseURL: REACT_APP_API_URL
});

repository.interceptors.request.use(
    async (config) => {
        const access_token = Cookies.get('jwt_token');

        if (access_token) {
            config.headers.set('Authorization', `Bearer ${access_token}`);
        }

        let curTime = Number(new Date().getTime()) / 1000;
        let expTime = Number(Cookies.get('expired_at')) / 1000;

        if ((expTime - curTime) <= 0) {
            Cookies.remove('jwt_token');
            Cookies.remove('expired_at');
            window.location.replace("/app");
            return config;
        }

        if ((expTime - curTime) < 600 && (expTime - curTime) > 0) {
            try {
                Cookies.remove('jwt_token');
                Cookies.remove('expired_at');
                const response = await repository.get("auth/refresh-token", {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                Cookies.set('jwt_token', response.data.access_token);
                Cookies.set('expired_at', response.data.expired_at);
            } catch (e) {
                Cookies.remove('jwt_token');
                Cookies.remove('expired_at');
                window.location.replace("/app");
                return config;
            }
        }

        return config;
    },
);

export default repository;

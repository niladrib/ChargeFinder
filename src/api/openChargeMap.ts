import axios from "axios";

const openChargeMap = () => {
    const instance = axios.create({
        baseURL: 'https://api.openchargemap.io/v3'
    });
    instance.interceptors.request.use(
        async (config) => {
            config.params['key'] = process.env.EXPO_PUBLIC_OPEN_CHARGE_MAP_API_KEY!;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
};

export default openChargeMap();
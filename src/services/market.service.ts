import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=joystick-games&vs_currencies=usd';

class MarketPriceService {
    private apiUrl: string;
    private axios = {} as AxiosInstance;

    constructor(apiUrl?: string) {
        this.apiUrl = apiUrl ? apiUrl : '';
        this.createAxiosInstance();
    }

    private createAxiosInstance() {
      this.axios = axios.create()
    }

    setApiUrl(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    get<T>(url: string, config?: AxiosRequestConfig) {
        return this.axios.get<T>(this.apiUrl + url, config);
    }

    async marketPrice() {
        return this.axios.get(this.apiUrl);       
    }
}

export const marketPriceService = new MarketPriceService(API_URL)
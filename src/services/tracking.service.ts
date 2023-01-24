import { http } from './api'
import { SALE_TYPE } from '../constants'
class TrackingService {
  async checkPassword (password: string) {
    const type = Number(SALE_TYPE);
    const url = `/api/user/password/${type}/${encodeURIComponent(password)}`
    const res = await http.get<any>(url);
    return res.data;
  }
  async createTracking (password: string, wallet: string, hash: string, amount: number, tokens: number) {
    const type = Number(SALE_TYPE);
    const payload = {
      password, wallet, hash, amount, tokens, type
    }
    try {
      const res = await http.post<any>(`/api/user/tracking`, payload);
      return res.data;  
    } catch (e) {
      return null;
    }
  }
}

export const trackingService = new TrackingService()

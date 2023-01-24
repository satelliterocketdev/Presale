import { http } from './api'
import * as ethers from 'ethers';

class OtcSignatureService {
  async makeSignature (addr: string) {
    const privateKey = process.env.REACT_APP_SIGN_PRIVATEKEY || '';
    const wallet = new ethers.Wallet(privateKey);
    const message = 'deposits-signature';
    let messageHash = ethers.utils.solidityKeccak256(['address', 'string'], [addr, message]);
    let signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    return signature;
  }
}

export const otcSignatureService = new OtcSignatureService()

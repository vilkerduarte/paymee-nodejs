import { Phone,Payout,Beneficiary,Document,Bank,Shopper,Payment } from "./lib/models.js";
import Paymee from "./paymee-lib.js";

let apikey = process?.env?.PAYMEE_KEY || null;
let apitoken = process?.env?.PAYMEE_TOKEN || null;

const PayMee = new Paymee(apikey,apitoken);

export { Phone,Payout,Beneficiary,Document,Bank,Shopper,Payment };
export default PayMee;
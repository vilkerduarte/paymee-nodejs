import { Payment, Payout } from "./lib/models.js";

function clearNullValues(data){
    for (const x in data) {
        let value = data[x];
        if(value === null){
            delete data[x];
        }else{
            if(typeof value === 'object'){
                data[x] = clearNullValues(value);
            }
        }
    }
    return data;
}

export default class Paymee {
    constructor(API_KEY, API_TOKEN) {
        this.setCredentials(API_KEY, API_TOKEN);
        this.setProduction();
    }
    setProduction() {
        this._URL = 'https://api.paymee.com.br/v1.1/';
    }
    setSandbox() {
        this._URL = 'https://apisandbox.paymee.com.br/v1.1/';
    }
    setCredentials(API_KEY, API_TOKEN) {
        if (API_KEY && API_TOKEN) {
            this.KEY = API_KEY;
            this.TOKEN = API_TOKEN;
        }
    }
    async _getResult(response) {
        async function resolveJSON(data) {
            try {
                data = await data.json();
                return data;
            } catch (e) {
                console.error("Error: 2556",e);
                return null;
            }
        }
        let result = {};
        if (response.ok) {
            result.status = 200;
        } else {
            console.error("Error: 6433",response);
            result.status = response.status;
        }
        result.result = await resolveJSON(response);
        return result;
    }

    async _request(url,method,additional_headers,data){
        let options = {
            method,
            headers: {
                "x-api-key":this.KEY,
                "x-api-token":this.TOKEN,
                "Content-Type": "application/json"
            }
        }
        if (data) {
            data = clearNullValues(data);
            options.body = JSON.stringify(new Object(data));
        }
        if (additional_headers && typeof additional_headers === 'object') {
            for (const key in additional_headers) {
                headers[key] = additional_headers[key];
            }
        }
        try {
            let response = await fetch(url, options);
            return await this._getResult(response);
        } catch (error) {
            console.error("Erro: 5138",error);
            return null;
        }
    }

    async _post(endpoint, data, additional_headers) {
        return await this._request(this._URL + endpoint,'POST',additional_headers,data);
    }

    async _get(endpoint, additional_headers) {
        return await this._request(this._URL + endpoint,'POST',additional_headers);
    }

    /**
     * @async
     * @param {Payment} payment
     * @returns {object}
     */
    async createPayment(payment) {
        if(payment instanceof Payment){
            return await this._post('checkout/transparent',payment);
        }else{
            throw new Error('O parâmetro deve ser um objeto do tipo Payment.');
        }
    }

    /**
     * @async
     * @param {Payout} payout Objeto de Pagamento
     * @returns {object}
     */
    async createPayout(payout) {
        if(payout instanceof Payout){
            return await this._post('payout/create',payout);
        }else{
            throw new Error('O parâmetro deve ser um objeto do tipo Payout.');
        }
    }

    /**
     * @async
     * @param {string} uuid Identificação UUID da transação pix
     * @returns {object}
     */
    async getPixTransaction(uuid) {
        return await this._get(`transactions/pix/${uuid}`);
    }

    /**
     * @async
     * @param {string} uuid Identificação UUID da transação
     * @returns {object}
     */
    async getTransaction(uuid) {
        return await this._get(`transactions/${uuid}`);
    }
    
}
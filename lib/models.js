export class Phone {
    /**
     * @constructor
     * @param {"MOBILE"|"HOME"|"WORK"|"OTHER"} type
     * @param {string} number Phone Number
     */
    constructor(type,number){
        this.type = type || null;
        this.number = number || null;
    }
}

export class Payout {
    /**
     * @constructor
     * @param {object} payout
     * @param {string} payout.currency
     * @param {number} payout.amount
     * @param {string} payout.email
     * @param {string} payout.referenceCode
     * @param {string} payout.scheduledDate
     * @param {string} payout.callbackURL
     * @param {string} payout.notes
     * @param {Beneficiary} payout.beneficiary
     */
    constructor({
        currency,
        amount,
        email,
        referenceCode,
        scheduledDate,
        callbackURL,
        notes,
        beneficiary
    }){
        this.currency = currency || null;
        this.amount = amount || null;
        this.email = email || null;
        this.referenceCode = referenceCode || null;
        this.scheduledDate = scheduledDate || null;
        this.callbackURL = callbackURL || null;
        this.notes = notes || null;
        this.beneficiary = beneficiary && beneficiary instanceof Beneficiary ? beneficiary : null;
    }
}

export class Beneficiary{
    /**
     * @constructor
     * @param {object} beneficiary
     * @param {string} beneficiary.email
     * @param {Document} beneficiary.document
     * @param {Bank} beneficiary.bankDetails
     */
    constructor({
        email,
        document,
        bankDetails
    }){
        // this.email = email || null;
        this.document = document && document instanceof Document ? document : null;
        this.bankDetails = bankDetails && bankDetails instanceof Bank ? bankDetails : null;
    }
}

export class Document {
    /**
     * @constructor
     * @param {"CPF"|"CNPJ"} type Tipo de Documento (CPF ou CNPJ)
     * @param {string} number Número do Documento
     */
    constructor(type,number){
        this.type = type || null;
        if(number){
            number = number.replace(/[^0-9]/g,'');
        }
        this.number = number || null;
    }
}

export class Bank {
    /**
     * @constructor
     * @param {object} bank
     * @param {string} bank.branch Bank ID
     * @param {string} bank.account Account Number
     * @param {"CORRENTE"|"POUPANÇA"|"CHECKING"|"SAVING"|"UNKNOWN"} bank.type Account Type
     * @param {string} bank.bankCode
     * @param {string} bank.pixKey
     */
    constructor({
        branch,
        account,
        type,
        bankCode,
        pixKey,
    }){
        this.branch = branch||null;
        this.account = account||null;
        this.type = type || "UNKNOWN";
        if(this.type === 'CORRENTE'){ 
            this.type = 'CHECKING';
        }else if(this.type === 'POUPANÇA'){ 
            this.type = 'SAVING';
        }
        this.bankCode = bankCode || null;
        this.pixKey = pixKey || null;
    }
}

export class Shopper {
    /**
     * @constructor
     * @param {object} shopper
     * @param {string} shopper.id
     * @param {string} shopper.name
     * @param {string} shopper.email
     * @param {Document} shopper.document
     * @param {Bank} shopper.bankDetails
     * @param {Phone} shopper.phone
     */
    constructor({
        id,
        name,
        email,
        document,
        bankDetails,
        phone,
    }){
        this.id = id||null;
        this.name = name||null;
        this.email = email||null;
        this.document = document && document instanceof Document ? document : null;
        this.bankDetails = bankDetails && bankDetails instanceof Bank ? bankDetails : null;
        this.phone = phone && phone instanceof Phone ? phone : null;
    }
}

export class Payment {
    /**
     * @constructor
     * @param {object} payment
     * @param {string} payment.currency
     * @param {number} payment.amount
     * @param {string} payment.referenceCode
     * @param {number} payment.maxAge
     * @param {string} payment.brand_id
     * @param {string} payment.paymentMethod
     * @param {string} payment.callbackURL
     * @param {Shopper} payment.shopper
     * @param {string} payment.observation
     * @param {number} payment.recurrence
     */
    constructor({
        currency,
        amount,
        referenceCode,
        maxAge,
        brand_id,
        paymentMethod,
        callbackURL,
        shopper,
        observation,
        recurrence,
    }){
        this.currency = currency||'BRL';
        this.amount = amount||null;
        this.referenceCode = referenceCode||null;
        this.maxAge = maxAge||null;
        this.brand_id = brand_id||null;
        this.paymentMethod = paymentMethod||'PIX';
        this.callbackURL = callbackURL||null;
        this.shopper = shopper && shopper instanceof Shopper ? shopper : null;
        this.observation = observation||null;
        this.recurrence = recurrence||null;
    }
    /**
     * @param {string} currency 
     */
    setCurrency(currency){ this.currency = currency }

    /**
     * @param {number} amount 
     */
    setAmount(amount){ this.amount = amount }

    /**
     * @param {string} referenceCode 
     */
    setReferenceCode(referenceCode){ this.referenceCode = referenceCode }

    /**
     * @param {number} maxAge 
     */
    setMaxAge(maxAge){ this.maxAge = maxAge }

    /**
     * @param {string} brand_id 
     */
    setBrand_id(brand_id){ this.brand_id = brand_id }

    /**
     * @param {string} paymentMethod 
     */
    setPaymentMethod(paymentMethod){ this.paymentMethod = paymentMethod }

    /**
     * @param {string} callbackURL 
     */
    setCallbackURL(callbackURL){ this.callbackURL = callbackURL }

    /**
     * @param {object} shopper 
     */
    setShopper(shopper){ this.shopper = shopper }

    /**
     * @param {string} observation 
     */
    setObservation(observation){ this.observation = observation }

    /**
     * @param {number} recurrence 
     */
    setRecurrence(recurrence){ this.recurrence = recurrence }

    /**
     * 
     * @returns {string} JSON encoded
     */
    getJSON(){
        return JSON.stringify(this,null,2);
    }
}
# Biblioteca Não Oficial
## Comunidade Aberta

Sinta-se convidado a cooperar nesse módulo.

Atualmente temos implantado:
- Criação de Pagamentos [createPayment];
- Criação de Payouts [createPayout];
- Coleta de Transação PIX [getTransactionPIX];
- Coleta de Transação Comum [getTransaction];

### Intalação
```npm i paymee```

### Inserindo Credenciais
Você pode configurar as suas credenciais em uma variável de ambiente ```PAYMEE_KEY``` e ```PAYMEE_TOKEN```.
#### Exemplo:
```
    #/path/.env
    PAYMEE_KEY="66355042-224a-344d-bfe0-9afd23006b94"
    PAYMEE_TOKEN="863bbc2f-f120-365f-b102-b7b63ef0a5e6"
```
Caso as credenciais não estejam presentes nas variáveis de ambiente, será necessário informá-las da seguinte forma:
```javascript
    import PayMee from 'paymee';
    PayMee.setCredentials('66355042-224a-344d-bfe0-9afd23006b94','863bbc2f-f120-365f-b102-b7b63ef0a5e6');
    ...
```

### Exemplo de Uso
```javascript
    import PayMee,{Payment,Shopper,Document,Phone} from 'paymee';

    // Defina suas credenciais, caso elas não estejam direcionadas no arquivo .env
    PayMee.setCredentials(API_KEY,API_TOKEN);

    PayMee.setSandbox(); // Direciona a API para o ambiente sandbox

    let venda = new Payment({
        currency:"BRL", // default: BRL
        paymentMethod:"PIX", // default: PIX
        amount:9.90,
        referenceCode:"AA45622003", // código de referencia externa (para controle externo, porém único)
        maxAge:30, // tempo de expiração em minutos
        shopper:new Shopper({
            name:"Vilker Duarte",
            email:"myemail@teste.com",
            document:new Document(
                "CPF", // Tipo de Doc. (CPF ou CNPJ ou OTHER)
                "99999999999" // Nº do Documento
            ), 
            phone:new Phone(
                "MOBILE", //  MOBILE | HOME | WORK | OTHER
                "12996048024"
            )
        })
    });

    PayMee.createPayment(venda).then((response)=>{
        console.log(response);
    })
```

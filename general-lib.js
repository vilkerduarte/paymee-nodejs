export function base64Encode(data){
    return Buffer.from(data).toString('base64');
}
export function base64Decode(data){
    return Buffer.from(data,'base64').toString();
}
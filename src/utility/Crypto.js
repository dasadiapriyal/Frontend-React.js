const encrypter = require('object-encrypter')
// const engine = encrypter('3.141.115.207')

let engine = encrypter('192.168.100.33')

if(process.env.NODE_ENV === 'development'){
    engine = encrypter('192.168.100.33')
} else {
    engine = encrypter('3.141.115.207')
}


export function encryptData(plainObject) {
    if (!plainObject) {
        return
    }
    let encryptedData = engine.encrypt(plainObject)
    return encryptedData
}

export function decryptData(data) {
    if (!data) {
        return
    }
    let decryptedData = engine.decrypt(data)
    return decryptedData
}
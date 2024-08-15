const CryptoJS = require('crypto-js'); // Importamos la libreria.
// Funcion para encriptar las contraseñas.
function cifrarTexto(texto) {
    const key = 'uQY&oe=66CB38EC&';
    const iv = '6788779854015066658';

    const cutKey = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).substr(0, 32);
    const cutIv = CryptoJS.SHA256(iv).toString(CryptoJS.enc.Hex).substr(0, 16);
    const $key = CryptoJS.enc.Utf8.parse(cutKey);
    const $iv = CryptoJS.enc.Utf8.parse(cutIv);

    const encrypted = CryptoJS.AES.encrypt(texto, $key, {
        iv: $iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const doblebase64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted.toString()));
    return doblebase64;
}
// Funcion para desencriptar las contraseñas.
function descifrarTexto(textoCifrado) {
    const key = 'uQY&oe=66CB38EC&';
    const iv = '6788779854015066658';

    const cutKey = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).substr(0, 32);
    const cutIv = CryptoJS.SHA256(iv).toString(CryptoJS.enc.Hex).substr(0, 16);
    const $key = CryptoJS.enc.Utf8.parse(cutKey);
    const $iv = CryptoJS.enc.Utf8.parse(cutIv);
    const base64Simple = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(textoCifrado));

    const decryptedBytes = CryptoJS.AES.decrypt(base64Simple, $key, {
        iv: $iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}
// Funcion para convertir los boleanos en string.
function convertirBoleean(valorPermiso){
    if(valorPermiso){
        return 'Si';
    }else{
        return 'No';
    }
}
// Exportamos las funciones para poder utilizarlas en el server.
module.exports = {cifrarTexto, descifrarTexto, convertirBoleean};


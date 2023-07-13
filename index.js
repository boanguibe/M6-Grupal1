//https://mindicador.cl/api/{tipo_indicador}/{dd-mm-yyyy}

let moneda = process.argv[2];
let pesos = process.argv[3];
let f = new Date();
let fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear();
const archivo = require('fs');
const path = './files/texto.txt';


const https = require('https');
https.get(`https://mindicador.cl/api/${moneda}/${fecha}`, function (res) {
    res.setEncoding('utf-8');
    let data = '';

    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        let dailyIndicators = JSON.parse(data); // JSON to JavaScript object
        const conversion = pesos / dailyIndicators.serie[0].valor;
        archivo.appendFileSync(path, `\nA la fecha: ${fecha}\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${pesos} pesos\nConvertido a "${moneda}" da un total de: ${conversion.toFixed(3)}\n`);

        console.log(archivo.readFileSync(path).toString());


    });

}).on('error', function (err) {
    console.log('Error al consumir la API!');
});
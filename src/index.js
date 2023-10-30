//-> regex pegar prks e Fiberlinkxxxx/(prks00[\w]*)[\s]*\|\s(Fiberlink\s[1-3]*0*[\w])/gm
//import fs from 'fs';
const fs = require('fs');
const serialRouter = []


function extraiGpon(texto){
    const regex = /(prks00[\w]*)[\s]*\|\s(Fiberlink\s[1-3]*0*[\w])/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({["Serial"]: captura[1],["Modelo"]: captura[2]}))
    //console.log(resultados[1].Serial)
    resultados.forEach(elemento =>{
        //console.log(elemento.Serial)
        extraiElias(elemento.Serial);
    })
}

async function lerArquivo(pathArquivo){
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(pathArquivo, encoding);
        return extraiGpon(texto);
    } catch (error) {
        console.log('erro',error);
    }
}

async function extraiElias(elias){
    pathArquivo = "./arquivos/sh-ru-olt-clg1.txt"
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(pathArquivo, encoding);
        const regex = new RegExp(eval(`/${elias}\\salias\\s[\\w]*/gm`))
        //console.log(regex)
        //console.log(elias)
        const resultados = [...texto.matchAll(regex)];
        const cli = resultados.map(resultado=>({["Cliente"]:resultado[0]}))
        console.log(cli)
    } catch (error) {
        console.log('erro',error);
    }
    
}
lerArquivo("./arquivos/onu-model-1-1.txt")
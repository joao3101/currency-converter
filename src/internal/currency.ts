import { Response } from 'express';
const path = require('path');
const fsPromises = require('fs/promises');

const filePath = path.resolve(__dirname, './currency.json');
const sdk = require('api')('https://docs.openexchangerates.org/openapi/630540699807941f67a92f40');

export interface Convertion {
    value: number;
    from: string;
    to: string;
}

const readCurrency = async () => {
    try {
        // Get the content of the JSON file 
        const data = await fsPromises.readFile(filePath);

        // Turn it to an object
        const obj = JSON.parse(data);

        // Do something with the result
        return obj;
    } catch (err) {
        return err;
    }
}


async function convertCurrency(req: Convertion, res: Response) {
    // get the data from req.body
    await readCurrency();
    sdk.auth(process.env.OPEN_EXCHANGE_TOKEN);
    sdk.convert({ prettyprint: 'false', value: req.value, from: req.from, to: req.to })
        .then((res: any) => console.log(res))
        .catch((err: any) => console.error(err));
    // return response
    return res.status(200).json({
        message: res.json
    });
};

module.exports = {convertCurrency}
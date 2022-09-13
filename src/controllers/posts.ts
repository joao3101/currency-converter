/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
const sdk = require('api')('https://docs.openexchangerates.org/openapi/630540699807941f67a92f40');

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let value: number = req.body.value;
    let to: string = req.body.to;
    let from: string = req.body.from;
    const convertReq: Convertion = {
        value: value,
        to: to,
        from: from
    }

    let rsp: any;
    const promiseSolver = (async () => {
        rsp = await convertCurrency(convertReq, res);
    })();
    promiseSolver.then(function () {
        return rsp.status(200).json({
            message: rsp.json
        });
    });

};

interface Convertion {
    value: number;
    from: string;
    to: string;
}

async function convertCurrency(req: Convertion, res: Response) {
    // get the data from req.body
    sdk.auth(process.env.OPEN_EXCHANGE_TOKEN);
    sdk.convert({ prettyprint: 'false', value: req.value, from: req.from, to: req.to })
        .then((res: any) => console.log(res))
        .catch((err: any) => console.error(err));
    // return response
    return res.status(200).json({
        message: res.json
    });
};

export default { addPost };
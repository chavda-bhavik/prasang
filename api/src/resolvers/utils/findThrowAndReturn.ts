import { db } from "../../global";

const findThrowAndReturn = async (db: db, modal: string, where: any) => {
    let data = await db[modal].findOne(where);
    if(data) return data;
    else throw new Error(`${modal} Not found!`);
}

export default findThrowAndReturn;
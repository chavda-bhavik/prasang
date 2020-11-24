import { db } from "../../global";

const findThrowAndReturn:any = async (db: db, modal: string, where: any, throwError: Boolean = true) => {
    let data = await db[modal].findOne(where);
    if(data) return data;
    else {
        if(throwError)
            throw new Error(`${modal} Not found!`);
        else
            return null;
    }
}

export default findThrowAndReturn;
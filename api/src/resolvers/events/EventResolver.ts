import { Context, } from "../../global"
import Event from '../../models/Events'

const EventResolver = {
    category: async ( parent: Event, _ , { db }:Context) => {
        return db.EventCategories.findOne({
            where: {
                categoryId: parent.categoryId
            }
        });
    }
}

export default EventResolver
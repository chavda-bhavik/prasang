import { Context, } from "../../global"
import EventCategories from "../../models/EventCategories"

const EventCategoryResolver = {
    events: async (parent:EventCategories, _, ctx: Context) => {
        return ctx.db.Events.findAll({
            where: {
                categoryId: parent.categoryId
            }
        })
    }
}

export default EventCategoryResolver
import { Context, } from "../../global"
import Event from '../../models/Events'

const EventResolver = {
    category: async ( parent: Event, _ , { db }:Context) => {
        return db.EventCategories.findOne({
            where: {
                categoryId: parent.categoryId
            }
        });
    },
    participations: async (parent: Event, _, { db }: Context) => {
        return db.Participations.findAll({
            where: {
                eventId: parent.eventId
            }
        })
    }
}

export default EventResolver
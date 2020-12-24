import { Context } from "../../global";
import Winner from "../../models/Winners";

const WinnerResolver = {
    participation: async (parent: Winner, _, { db }: Context) => {
        return db.Participations.findByPk(parent.participationId)
    }
}

export default WinnerResolver;
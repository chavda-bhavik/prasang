import { Context } from "../../global";
import findThrowAndReturn from "../utils/findThrowAndReturn";
import { fetchCategory } from "./EventCategoryArgTypes";

const Query = {
    eventCategories: (_, _2, ctx: Context) => {
        return ctx.db.EventCategories.findAll();
    },
    eventCategory: (_, args:fetchCategory, { db }: Context) => {
        return findThrowAndReturn(db, "EventCategories", {
            where: { categoryId: args.categoryId }
        });
    }
}

export default Query;
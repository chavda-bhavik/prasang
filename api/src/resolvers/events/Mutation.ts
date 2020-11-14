import { Context } from "../../global";
import { addCategory, editCategory, deleteCategory } from './EventArgTypes';

const Mutation = {
    addEventCategory: async (_, args: addCategory, ctx: Context) => {
        return ctx.db.EventCategories.create({
            name: args.name,
            imagePath: args.imagePath
        }, {
            raw: true
        });
    },
    editEventCategory: async (_, args: editCategory, ctx: Context) => {
        let categoryFound = await ctx.db.EventCategories.count({
            where: {
                categoryId: args.categoryId,
            }
        });
        if(!categoryFound) {
            throw new Error("Category not found!");
        }
        await ctx.db.EventCategories.update({
            name: args.name,
            imagePath: args.imagePath
        }, {
            where: {
                categoryId: args.categoryId
            }
        });
        return ctx.db.EventCategories.findOne({
            where: {
                categoryId: args.categoryId
            }
        })
    },
    deleteEventCategory: async (_, args: deleteCategory, { db }: Context) => {
        let categoryFound = await db.EventCategories.findOne({
            where: {
                categoryId: args.categoryId,
            }
        });
        if(!categoryFound) {
            throw new Error("Category not found!");
        }
        await db.EventCategories.destroy({
            where: {
                categoryId: args.categoryId
            }
        });
        return categoryFound;
    }
}

export default Mutation
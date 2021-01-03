import { Context, fileField } from "../../global";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "./EventCategoryArgTypes";
import { processSingleUpload } from "../utils/Upload";

const Mutation = {
  addEventCategory: async (_, args: addCategory, ctx: Context) => {
    let image: fileField;
    try {
      image = await processSingleUpload(args.image);
    } catch (error) {
      throw new Error(error);
    }
    return ctx.db.EventCategories.create(
      {
        name: args.name,
        imagePath: image.path,
        description: args.description,
      },
      {
        raw: true,
      }
    );
  },
  editEventCategory: async (_, args: editCategory, ctx: Context) => {
    let categoryFound = await ctx.db.EventCategories.findOne({
      where: {
        categoryId: args.categoryId,
      },
    });
    if (!categoryFound) {
      throw new Error("Category not found!");
    }

    let updateData: {
      name?: String;
      imagePath?: String;
    } = {};
    if (args.name) {
      updateData.name = args.name;
    }
    if (args.image) {
      let image: fileField = await processSingleUpload(args.image);
      updateData.imagePath = image.path;
    }

    await ctx.db.EventCategories.update(updateData, {
      where: {
        categoryId: args.categoryId,
      },
    });
    return ctx.db.EventCategories.findOne({
      where: {
        categoryId: args.categoryId,
      },
    });
  },
  deleteEventCategory: async (_, args: deleteCategory, { db }: Context) => {
    let categoryFound = await db.EventCategories.findOne({
      where: {
        categoryId: args.categoryId,
      },
    });
    if (!categoryFound) {
      throw new Error("Category not found!");
    }
    await db.EventCategories.destroy({
      where: {
        categoryId: args.categoryId,
      },
    });
    return categoryFound;
  },
};

export default Mutation;

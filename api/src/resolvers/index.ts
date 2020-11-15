import { mergeResolvers } from "@graphql-tools/merge";

import DemoResolver from './demo/index'
import EventCategoriesResolver from './eventcategories/index'
import EventResolver from './events/index'

const index = [
    DemoResolver,
    EventCategoriesResolver,
    EventResolver
]

export default mergeResolvers(index);
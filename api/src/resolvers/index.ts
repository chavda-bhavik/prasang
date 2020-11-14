import { mergeResolvers } from "@graphql-tools/merge";

import DemoResolver from './demo/index'
import EventResolver from './events/index'

const index = [
    DemoResolver,
    EventResolver
]

export default mergeResolvers(index);
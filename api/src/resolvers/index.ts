import { mergeResolvers } from "@graphql-tools/merge";

import DemoResolver from './demo/index'

const index = [
    DemoResolver
]

export default mergeResolvers(index);
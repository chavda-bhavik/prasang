import { mergeResolvers } from "@graphql-tools/merge";

import DemoResolver from './demo/index'
import RoleResolver from './roles/index'
import UserResolver from './users/index'

const index = [
    DemoResolver,
    RoleResolver,
    UserResolver
]

export default mergeResolvers(index);
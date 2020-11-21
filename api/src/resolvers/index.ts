import { mergeResolvers } from "@graphql-tools/merge";

import DemoResolver from './demo/index'
import RoleResolver from './roles/index'
import UserResolver from './users/index'
// import WinnerArgTypes from './winner/WinnerArgTypes'

const index = [
    DemoResolver,
    RoleResolver,
    UserResolver
]

export default mergeResolvers(index);
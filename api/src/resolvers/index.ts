import DemoResolver from './demo/index'
import RoleResolver from './roles/index'
import UserResolver from './users/index'
import EventCategoriesResolver from './eventcategories/index'
import EventResolver from './events/index'
import DashboardResolver from './dashboard/index'
import ParticipationResolver from './participations/index'
// import WinnerArgTypes from './winner/WinnerArgTypes

const index = [
    DemoResolver,
    EventCategoriesResolver,
    EventResolver,
    RoleResolver,
    UserResolver,
    DashboardResolver,
    ParticipationResolver
]

export default index;

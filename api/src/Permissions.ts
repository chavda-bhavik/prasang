import { Context, db } from "./global";
import User from "./models/Users";
import { rule, shield, and, or } from "graphql-shield";
import getUserId from "./resolvers/utils/getUserId";

export const getUser = async (req: Request, db: db): Promise<User | null> => {
    let userId: string = getUserId(req);
    if (!userId) return null;
    let user = await db.Users.findOne({
        where: {
            userId: userId,
        },
        include: [
            {
                model: db.Roles,
                attributes: ["name"],
            },
        ],
        plain: true,
    });
    if (user) return user;
    return null;
};

const IsAuthenticated = rule({ cache: "contextual" })(
    async (_, _2, { user }: Context, _3) => {
        const result = !!user;
        return result;
    }
);

const IsAdmin = rule({ cache: "contextual" })(
    async (_, _2, { user }: Context, _3) => {
        const u = await user;
        const result = u?.roles.name === "Admin";
        return result;
    }
);

const IsUser = rule({ cache: "contextual" })(
    async (_, _2, { user }: Context, _3) => {
        const u = await user;
        const result = u?.roles.name === "User";
        return result;
    }
);

export const Permissions = shield(
    {
        Query: {
            Dashboard: and(IsAuthenticated, IsAdmin),
            usersProfile: and(IsAuthenticated, or(IsAdmin, IsUser)),
            // Participations
            participations: and(IsAuthenticated, or(IsAdmin, IsUser)),
            // Photos
            photos: and(IsAuthenticated, or(IsAdmin, IsUser)),
        },
        Mutation: {
            // Event Categories
            addEventCategory: and(IsAuthenticated, IsAdmin),
            editEventCategory: and(IsAuthenticated, IsAdmin),
            deleteEventCategory: and(IsAuthenticated, IsAdmin),
            // Events
            addEvent: and(IsAuthenticated, IsAdmin),
            editEvent: and(IsAuthenticated, IsAdmin),
            deleteEvent: and(IsAuthenticated, IsAdmin),
            // Participations
            participate: and(IsAuthenticated, IsUser),
            // Photos
            addPhoto: and(IsAuthenticated, IsUser),
            likePhoto: and(IsAuthenticated, IsUser),
            // Comments
            addComment: and(IsAuthenticated, IsUser),
            // Winners
            setWinner: and(IsAuthenticated, IsAdmin),
            // Users
            editProfile: and(IsAuthenticated, IsUser),
        },
    },
    {
        allowExternalErrors: true,
    }
);

import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    IsUUID,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import EventCategories from "./EventCategories";
import slugify from "../resolvers/utils/slugify";

@Table({
    tableName: "events",
})
class Events extends Model {
    @IsUUID(4)
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    eventId: string;

    @Column({
        set(value: string) {
            // @ts-ignore
            this.setDataValue("title", value);
            // @ts-ignore
            this.setDataValue("slug", slugify(value));
        },
    })
    title: string;

    @Column({
        defaultValue: 0,
    })
    priceAmount: number;

    @Column
    description: string;

    @Column
    startDate: Date;

    @Column
    endDate: Date;

    @Column
    lastRegistraionDate: Date;

    @Column({
        defaultValue: 0,
    })
    fees: number;

    @Column
    imageUrl: string;

    @Column
    slug: string;

    @ForeignKey(() => EventCategories)
    @Column({
        type: DataType.UUID,
    })
    categoryId: string;

    @BelongsTo(() => EventCategories)
    category: EventCategories;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}

export default Events;

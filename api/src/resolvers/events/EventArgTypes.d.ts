export interface AddEventType {
    data: {
        title: String
        categoryId: number | string | Buffer | undefined
        description: String
        startDate: String | Date
        endDate: String | Date
        lastRegistraionDate: String | Date
        fees?: Number
        image: any
        imageUrl?: String
    }
}
export interface editEventType {
    eventId: string
    data: {
        title?: String
        categoryId?: number | string | Buffer | undefined
        description?: String
        startDate?: String | Date
        endDate?: String | Date
        lastRegistraionDate?: String | Date
        fees?: Number
        image?: any
        imageUrl?: String
    }
}
export interface deleteEventType {
    eventId: string
}
export interface fetchEventType {
    eventId: string
}
export interface fetchAllEventsType {
    where: {
        ongoing?: Boolean
        upcoming?: Boolean
        all?: Boolean
        startDate?: String | Date
        endDate?: String | Date
        paid?: Boolean
        categoryId?: string
    }
}
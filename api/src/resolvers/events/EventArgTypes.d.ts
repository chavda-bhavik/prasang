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
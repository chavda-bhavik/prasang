export interface addPhoto {
    eventId: any;
    image: any;
}
export interface likePhoto {
    photoId: string;
}
export interface fetchPhoto {
    photoId: string;
}
export interface fetchPhotosType {
    options: {
        eventId?: string;
        likesPlus?: number;
        commentsPlus?: number;
        offset?: number;
        limit?: number;
    };
}
interface range {
    start: number;
    end: number;
}

export default (date: String | Date):Date|String => {
    if(typeof date === 'string') {
        let from:number[]
        if(date.includes("-")) {
            from = date.split("-").map( val => +val );
        } else {
            from = date.split("/").map( val => +val );
        }
        return new Date(from[2], from[1]-1, from[0]);
    } else {
        return date;
    }
}
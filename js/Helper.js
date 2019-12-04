function parseDateStringToDate(unparsedDateString) {

    // If we would not use this, the parsed Date-String would end in a String instead of an Date object.
    function reviver(key, value) {
        if (typeof value === "string") {
            return new Date(value);
        }

        return value;
    }
    return JSON.parse(unparsedDateString, reviver);
}
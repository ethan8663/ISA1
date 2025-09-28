class UserFaceMessage {
    static GREETING = "Hello"
    static GREETING2 = "What a beautiful day."
    static DATE_TIME = "Server current date and time is"
    static NOT_FOUND = "404 Not Found"
}

class Endpoint {
    static GET_DATE = "/getDate/"
    static WRITE_FILE = "/writeFile/"
    static READ_FILE = "/readFile/"
    static ROOT = "/"
}



module.exports = { UserFaceMessage, Endpoint }
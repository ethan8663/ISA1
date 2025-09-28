const http = require('http')
const url = require('url')
const fs = require('fs')

const { getDate } = require('./modules/utils')
const { UserFaceMessage, Endpoint } = require('./lang/en/en')

const LINE_BREAK = "\n"
const FILE_NAME = "file.txt"
const EMPTY_CONTENT = ""

http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    if(q.pathname === Endpoint.GET_DATE) {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(`
        <!DOCTYPE html>
            <html>
                <body>
                    <h1 style="color:blue;">${UserFaceMessage.GREETING} ${q.query["name"]}, ${UserFaceMessage.GREETING2}. ${UserFaceMessage.DATE_TIME} ${getDate()}</h1>
                </body>
            </html>
            `);
    } else if(q.pathname === Endpoint.WRITE_FILE) {
        const content = q.query["text"]
        if(fs.existsSync(FILE_NAME)) {
            fs.appendFileSync(FILE_NAME, content + LINE_BREAK)
        } else {
            fs.writeFileSync(FILE_NAME, content + LINE_BREAK)
        }

        res.writeHead(204)
        res.end(EMPTY_CONTENT)
    } else if(q.pathname.startsWith(Endpoint.READ_FILE)) {
        const fileName = q.pathname.split('/')[2] // origin / endpoint(/readFile/) / file name
        
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404, {'content-type':'text/html'})
                res.end(`${fileName} ${UserFaceMessage.NOT_FOUND}`)
            } else {
                res.writeHead(200, {'content-type' : 'text/plain'})
                res.end(data)
            }
        })
    }
}).listen(process.env.PORT || 8888);                

// http://localhost:8888/readFile/file.txt
// http://localhost:8888/getDate/?name=seohyeon
// http://localhost:8888/writeFile/?text=BCIT
const http = require('http')
const url = require('url')
const fs = require('fs')

const { getDate } = require('./modules/utils')
const { UserFaceMessage } = require('./lang/en/en')

http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    if(q.pathname === "/getDate/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(`
        <!DOCTYPE html>
            <html>
                <body>
                    <h1 style="color:blue;">${UserFaceMessage.GREETING} ${q.query["name"]}, ${UserFaceMessage.GREETING2}. ${UserFaceMessage.DATE_TIME} ${getDate()}</h1>
                </body>
            </html>
            `);
    } else if(q.pathname === "/writeFile/") {
        const content = q.query["text"]
        if(fs.existsSync("file.txt")) {
            fs.appendFileSync("file.txt", content + "\n")
        } else {
            fs.writeFileSync("file.txt", content + "\n")
        }

        res.writeHead(204)
        res.end(``)
    } else if(q.pathname.startsWith("/readFile/")) {
        const fileName = q.pathname.split('/')[2]
        
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404, {'content-type':'text/html'})
                res.end(`${fileName} 404 Not Found`)
            } else {
                res.writeHead(200, {'content-type' : 'text/plain'})
                res.end(data)
            }
        })
    }
}).listen(process.env.PORT || 8888);                

// http://localhost:8888/readFile/file.txt
// http://localhost:8888/getDate/?name=ethan
// http://localhost:8888/writeFile/?text=BCIT
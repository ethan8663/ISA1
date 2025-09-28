const http = require('http')
let url = require('url')
const { getDate } = require('./modules/utils')
const { UserFaceMessage } = require('./lang/en/en')

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-type": "text/html"});
    res.end(`
    <!DOCTYPE html>
        <html>
            <body>
                <h1 style="color:blue;">${UserFaceMessage.GREETING} ${q.query["name"]}, ${UserFaceMessage.GREETING2}. ${UserFaceMessage.DATE_TIME} ${getDate()}</h1>
            </body>
        </html>
        `);
}).listen(process.env.PORT || 8888);
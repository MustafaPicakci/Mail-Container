var http = require('http');
var fs = require('fs');
var fileBusiness = require("fs");
const cron = require('node-cron');


function read() {
    fs.readFile("incomming_mail.txt", "utf8", function(ex, data) {

        if (ex) {
            console.log(ex);
        } else {
            console.log(data);
        }
    });
}


function copy() {
    fs.copyFile('incomming_mail.txt', 'mail_storage.txt', (err) => {
        if (err) {
            throw err;
        }
    });
}

function del() {
    fileBusiness.unlink("incomming_mail.txt", (error) => {
        if (error) {
            throw error;
        }
    });
}

http.createServer(function(request, response) {
    if (request.url != '/favicon.ico') {
        var date = new Date();

        //here data or mail from forms on your website are printed to the xxx file.
        //Data from your website should be written instead of 'Merhaba'

        fs.appendFile('incomming_mail.txt', '---------------------------------------------\n ' + date + '\n Merhaba \n', function(err) {
            if (err) {
                throw err;
            }
        });
        response.end();
    }


}).listen(8080);

//form data and mails are sent to you every day at 13:00.
cron.schedule('00 13 * * *', () => {

    if (fs.existsSync('./incomming_mail.txt')) {

        read();
        copy();
        del();
    }


});
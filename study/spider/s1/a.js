let cheerio = require('cheerio');
let request = require('request');
let fs = require('fs');
let http = require('http');
let url = require('url');

let allData = [];
let i = 0;
let urlStr = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";

let fetchPage = x => {
    startRequest(x);
};

function startRequest(x) {
    console.log(i+1);
    http.get(x, function(res) {
        let html = ''; // html 内容
        res.setEncoding('utf-8'); // 防止中文乱码

        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            let $ = cheerio.load(html); // $(html)

            let news_item = {
                // 文章标题
                title: $('.article-title a').text().trim(),
                // 文章时间
                time: $('.article-info a').eq(1).text().trim(),
                // 文章url
                link: url.resolve(x, $('.article-title a').attr('href')),
                // 供稿者
                author: $('.article-info a:first-child').text().trim(),
                index: ++ i
            };
            
            allData.push(news_item);
            savedContent($, news_item.title);
            savedImg($, news_item.title, x);
            // console.log(allData);

            if (i < 500) {
                // 下一篇文章的url
                let nextLink = url.resolve(x, $("li.next a").attr('href'));
                fetchPage(encodeURI(nextLink));
            }
            
        });

    }).on('error', err => console.log(err) );
}

function savedContent($,filename) {
    let cont = $('.article-content').text();
    fs.writeFileSync(`./data/${filename}.txt`, cont);
}
function savedImg($, filename, x) {
    let img_dirname = './image/' + filename;
    if (!fs.existsSync(img_dirname)) {
        fs.mkdirSync(img_dirname);
    }

    $('.article-content img').each(function(){
        let self = $(this);
        let img_title = self.parent().next().text().trim(); //获取图片的标题
        if(img_title.length > 35 || img_title === '' ){
            img_title = 'Null';
        }
        let img_filename = img_title + '.jpg';
        let img_src = url.resolve(x, self.attr('src'));
        
        request.head(img_src, err => {
            if (err) {
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream(img_dirname + '/' + img_filename));
    });
}

fetchPage(urlStr);

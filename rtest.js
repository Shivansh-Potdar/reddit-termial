const snoowrap = require('snoowrap');
const jsdom = require("./node_modules/jsdom");
const { window } = new jsdom.JSDOM('<body></body>');
const $ = require('jquery')(window);

async function scrapeSubreddit() {
    const r = new snoowrap({
        userAgent: 'A random string.',
        clientId: 'uYcds9ym9IRLBg',
        clientSecret: 'jFkboj6UTkmpVUaSmPNnfK9S5Ppi7w',
        refreshToken: '244083766827-hzwx_uMei4nOCtE9Y-TnypmVa_COqA'
    });

    const subreddit = await r.getSubreddit('amitheasshole');
    const newPosts = await subreddit.getNew({time: 'week', limit: 5});
    const topPosts = await subreddit.getTop({time: 'week', limit: 5});

    let topdata = [];
    let newdata = [];

    topPosts.forEach((post) => {
        topdata.push({
            link: post.url,
            title: post.title,
            text: post.selftext,
            score: post.score,
            id: post.id
        })
    })

    $.ajax({
        dataType: "json",
        url: "https://www.reddit.com/r/darkjokes/comments/jriz83/.json",
    }).done((data) => {
        $.each(data[1].data.children, function (i, item) {
            var comment = item.data.body
            var author = item.data.author
            var postcomment = '<p>[Author]' + author + '<br>' + comment + '</p>'
            console.log(postcomment)
        });
    })

    console.log(newdata)
};

scrapeSubreddit();
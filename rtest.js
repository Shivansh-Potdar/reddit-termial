const { Comment } = require('snoowrap');
const snoowrap = require('snoowrap');

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
    });
    console.log(topdata)

    for (let x = 0; x < topdata.length; x++) {
        console.log(topdata[x]["title"].toString() + '\n')
        console.log(topdata[x]["text"].toString()+'\n')
        
    }
};

scrapeSubreddit();
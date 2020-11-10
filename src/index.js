import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import Delayed from './Delayed'
import snoowrap from 'snoowrap';

function CheckForcommands(props){
    const [val, setVal] = React.useState("");

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                alert("Please wait for posts to load")
                event.preventDefault();
                setVal(val => val + document.getElementById("commandLine").value);
                if(document.getElementById("commandLine").value === "-begin"){
                    const ele = <MyInput>
                    </MyInput>
                    ReactDOM.render(ele, document.getElementById("command-result"))
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div>
            <form> 
                C://desktop/users/commands/<input type="text" id="commandLine" placeholder={props.plc}/>
            </form>
        </div>
    );
}

function MyInput() {

    async function scrapeSubreddit() {
        const r = new snoowrap({
            userAgent: 'A random string.',
            clientId: 'uYcds9ym9IRLBg',
            clientSecret: 'jFkboj6UTkmpVUaSmPNnfK9S5Ppi7w',
            refreshToken: '244083766827-hzwx_uMei4nOCtE9Y-TnypmVa_COqA'
        });
    
        const subreddit = await r.getSubreddit(document.getElementById("rslashval").value);
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
            console.log()
            console.log()

            const ele = <div>
                            <p>
                            "Title: "    {topdata[0]["title"].toString()}
                            </p>
                            <p>
                            "Score: " {topdata[0]["score"].toString()}
                            </p>
                            <p>
                                {topdata[0]["text"].toString()}
                            </p>
                            <p>
                            "Title: "    {topdata[1]["title"].toString()}
                            </p>
                            <p>
                            "Score: " {topdata[1]["score"].toString()}
                            </p>
                            <p>
                                {topdata[1]["text"].toString()}
                            </p>
                            <p>
                            "Title: "    {topdata[2]["title"].toString()}
                            </p>
                            <p>
                            "Score: " {topdata[2]["score"].toString()}
                            </p>
                            <p>
                                {topdata[2]["text"].toString()}
                            </p>
                            <p>
                            "Title: "    {topdata[3]["title"].toString()}
                            </p>
                            <p>
                            "Score: " {topdata[3]["score"].toString()}
                            </p>
                            <p>
                                {topdata[3]["text"].toString()}
                            </p>
                            <p>
                            "Title: "    {topdata[4]["title"].toString()}
                            </p>
                            <p>
                            "Score: " {topdata[4]["score"].toString()}
                            </p>
                            <p>
                                {topdata[4]["text"].toString()}
                            </p>
                        </div>
            ReactDOM.render(ele, document.getElementById("r-slashdisplay"));
        }
    };

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                scrapeSubreddit();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [scrapeSubreddit]);

    return  (
        <div> 
            <Delayed waitBeforeShow={500}>
                <div>Loading form....</div>
                <Delayed waitBeforeShow={450}>
                    <p>
                        <Delayed waitBeforeShow={200}>
                            3..
                            <Delayed waitBeforeShow={250}>
                                2...
                                <Delayed waitBeforeShow={275}>1....
                                    <Delayed waitBeforeShow={500}>
                                        <form> 
                                            C://desktop/users/r/<input type="text" id="rslashval" placeholder="subreddit name"/>
                                        </form>
                                    </Delayed>
                                </Delayed>
                            </Delayed>              
                        </Delayed>
                    </p>
                    
                </Delayed>
            </Delayed>
        </div>
    );
}

class MainBoad extends React.Component {

render() {
        return (
            <div className="commands">
                <h1>Reddit Terminal</h1>
                    <ul>
                        <li>type -begin</li>
                        <li>get the top 5 posts of subreddit</li>
                        <li>or get new 5 posts</li>
                        <li>do not forget only post text can be read</li>
                    </ul>
                    <CheckForcommands plc="command"/>
            </div>
        );
}
}        



//Render
ReactDOM.render(
    <MainBoad name="Shivansh" />,
    document.getElementById("root")
);
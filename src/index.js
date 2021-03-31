import React, { Component } from 'react';
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
            clientSecret: 'your secret',
            refreshToken: 'your token'
        });
    

        const inputVal = document.getElementById("rslashval").value.split("-");

        const subreddit = await r.getSubreddit(inputVal[2]);
        const newPosts = await subreddit.getNew({time: 'week', limit: 50});
        const topPosts = await subreddit.getTop({time: 'week', limit: 50}).catch({
            url: null,
            title: "Wrong name",
            text: "Please Try Again",
            score: 0,
            id: null
        });
    
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

        newPosts.forEach((post) =>{
            newdata.push({
                link: post.url,
                title: post.title,
                text: post.selftext,
                score: post.score,
                id: post.id
            })
        })

        console.log(topdata)
        console.log(newdata)

        if (inputVal[1] === "new") {
            ReactDOM.render(newdata.map((namae, index) => (
                <li key={index}> {newdata.indexOf(namae)}
                    <p>
                        "Title: "{namae.title}
                    </p>
                    <p>
                        "Score: "{namae.score}
                    </p>
                    <p>
                        "Text: "{namae.text}
                    </p>
                    <p id="reddit-link">
                        "Link: " <a>{namae.link}</a>
                    </p>
                </li>
            )), document.getElementById("root-ul"))
        }

        if(inputVal[1] === "top"){
            ReactDOM.render(topdata.map((namae, index) => (
                <li key={index}>{topdata.indexOf(namae)}
                    <p>
                        "Title: "{namae.title}
                    </p>
                    <p>
                        "Score: "{namae.score}
                    </p>
                    <p>
                        "Text: "{namae.text}
                    </p>
                    <p id="reddit-link">
                        "Link: " <a>{namae.link}</a>
                    </p>
                </li>
            )), document.getElementById("root-ul"))
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
                                        <ul id="root-ul">
                                            <div id="root-comm"/>
                                        </ul>
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

class MainBoad extends Component {

render() {
        return (
            <div className="commands">
                <h1>Reddit Terminal</h1>
                    <ul>
                        <li>type -begin</li>
                        <li>format as: -top/new-subreddit</li>
                        <li>sample: -top-askreddit</li>
                        <li>get the top posts of subreddit</li>
                        <li>or get new posts</li>
                        <li>do not forget only post text can be read</li>
                    </ul>
                    <CheckForcommands plc="command"/>
            </div>
        );
}
}        

//Render
ReactDOM.render(
    <MainBoad />,
    document.getElementById("root")
);

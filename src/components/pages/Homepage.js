import React, {Component} from "react";
import Tweets from "../Tweets/Tweets";
import Grid from "@material-ui/core/Grid";
import InsertTweet from "../Tweets/InsertTweet";
import TweetService from "../Tweets/TweetService";
import AuthService from "../service/AuthService";
import Divider from "@material-ui/core/Divider";
import ReactPaginate from 'react-paginate';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            offset: 0,
            perPage: 5,
            currentPage: 0
        };

        this.getAllFriendsTweets = this.getAllFriendsTweets.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    userID = {
        userID: AuthService.getLoggedInUser().user_id
    };

    componentDidMount() {
        this.getAllFriendsTweets();
    }

    getAllFriendsTweets() {
        TweetService.getAllTweetsFromFriends(this.userID)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                this.setState({
                        tweets: slice,
                    }
                );
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                })
            })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getAllFriendsTweets();
        });

    };

    render() {
        const user = AuthService.getLoggedInUser();
        return (
            <React.Fragment>
                <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}><b>Hello {user.first_name}</b>, enjoy
                    reading tweets</p>

                <Divider/>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <div className={"tweetsHomepage"}>
                            <Tweets tweets={this.state.tweets}/>
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className={"tweetsHomepage"}>
                            <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>New tweet</p>
                            <InsertTweet handler={this.getAllFriendsTweets}/>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Homepage;
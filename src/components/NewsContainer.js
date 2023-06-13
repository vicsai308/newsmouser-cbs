import React, { Component } from 'react'
import LoadingSpinner from './LoadingSpinner';
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types'


export default class NewsContainer extends Component {
        // default proptypes
        static defaultProps = {
            country:'in',
            pageSize: 8,
            category: 'general',
        }
    
        // defining prop types
        static propTypes = {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string,
        }
    constructor() {
        //when constructor is called when object is created in the class.
        super(); //super class must be called by default else error is thrown
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }


    // api news fetch
    async newsFetch() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
        this.setState({ loading: true })
        this.props.setProgress(10);
        // using fetch to grap api response
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json() //convert to json
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    // pagination methods
    pageChange = async (triggeType) => {
        if (triggeType === 'next') {
            await this.setState({ page: this.state.page + 1 });
            console.log(this.state.page);
        } else if (triggeType === 'previous') {
            await this.setState({ page: this.state.page - 1 });
            console.log(this.state.page);
        }
        this.newsFetch();
    }

    // infinite scroll method which is called at each end of scroll...
    fetchData = async () => {
        await this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
        // using fetch to grap api response
        let data = await fetch(url);
        let parsedData = await data.json() //convert to json
        // concat previous plus present result
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
        })
    }

    //life cycle method that uses async await on api calls

    componentDidMount() {
        console.log("componentDidMount");
        this.newsFetch();
    }

    render() {
        return (

            <div className="container">
                <h2 className="my-4 text-center">Top News Hunts </h2>
                {this.state.loading && <LoadingSpinner />}

                <InfiniteScroll
                    style={{overflow:"hidden"}}
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<LoadingSpinner />}
                >
                    <div className="container" style={{ overflowY: 'hidden' }}>
                    <div className="row">
                        {/* inverted conditional check */}
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} published={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="d-flex justify-content-between my-4">
                    <button type="button" disabled={this.state.page <= 1} onClick={() => this.pageChange('previous')} className="btn btn-info">Previous</button>
                    <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={() => this.pageChange('next')} className="btn btn-info">Next</button>
                </div> */}
            </div>
        )
    }
}

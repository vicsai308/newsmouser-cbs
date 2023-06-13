import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        // destructuring props
        let { title, description, imageUrl, url, author, published, source } = this.props;
        return (
            <div>
                <div className="card my-3" style={{ border: "2px solid #2B3035", borderRadius: "15px" }}>
                    <img src={imageUrl} className="card-img-top" style={{ borderRadius: "15px" }} alt="..." />
                    <div className="card-body">
                        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-info text-dark">
                            {source}
                        </span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        {/* converts iso to gmt date string */}
                        <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} at {new Date(published).toGMTString()}</small></p>
                        <a href={url} rel="noreferrer" target="_blank" className="btn btn-info">Pounce</a>
                    </div>
                </div>
            </div>
        )
    }
}

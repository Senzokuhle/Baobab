import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactTable from "react-table";

import "react-table/react-table.css";

import { reviewService } from "../../../services/reviews";
import { createColClassName } from "../../../utils/styling/styling";
import { columns } from "./tablecolumns";

const DEFAULT_EVENT_ID = process.env.REACT_APP_DEFAULT_EVENT_ID || 1;

class ReviewHistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reviewHistory: [],
      isError: false,
      currentPage : 0,
      defaultPageSize : 10
    };
  }

  componentDidMount() {
    this.loadReviewHistory(this.state.currentPage,this.state.defaultPageSize);
  }

  loadReviewHistory = (pageNumber,pageSize,sortColumn) => {
    reviewService
      .getReviewHistory(DEFAULT_EVENT_ID, pageNumber, pageSize,sortColumn)
      .then(response => {
        this.setState({
          isLoading: false,
          reviewHistory: response.reviewHistory.reviews,
          isError: response.reviews === null,
          errorMessage: response.message,
          currentPage: pageNumber,
        });
      });
  };

  fetchData=(state, instance)=> {
    this.setState({ isLoading: true });
    let sortColumn;
    if(state.sorted && state.sorted.length > 0){
      sortColumn = state.sorted[0].id
    }
    this.loadReviewHistory(state.page,state.pageSize,sortColumn);
  }

  render() {
    const { error, isLoading, reviewHistory,defaultPageSize } = this.state;
    //Hard Coded for now
    const numPages = 1;
    const loadingStyle = {
      width: "3rem",
      height: "3rem"
    };

    if (error) {
      return <div className={"alert alert-danger"}>{error}</div>;
    }

    return (
      <div className="ReviewHistory">
        <p className="h5 text-center mb-4">Review History</p>
        <div className={"review-padding"}>
          <ReactTable  loading={isLoading} defaultPageSize={defaultPageSize} pages={numPages} onFetchData={this.fetchData} manual data={reviewHistory} columns={columns} minRows={0} />;
        </div>
      </div>
    );
  }
}

export default withRouter(ReviewHistoryComponent);

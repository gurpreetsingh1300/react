import React from 'react';
import Product from './Product';
import Navigation from './Navigation';
import Footer from './Footer';
import FeedbackComp from './FeedbackComp';
import AppStore from '../Stores/ApplicationStore';
import Action from '../Actions/Action';

function getProductDetailsState(pdtId) {
  var retData = AppStore.FetchPurchasedItems().filter((item) => {
    return item.pdtCode == pdtId;
  });
  var fbData = AppStore.FetchFeedback();
  console.log('retdata', retData[0]);
  console.log('fbData', fbData);
  return {
    productDetails: retData[0],
    fbDetails: fbData
  };
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
    this._onChange = this._onChange.bind(this);
    Action.FetchFeedbackById(this.props.match.params.id);
    this.state = {
      productDetails: {},
      fbDetails: []
    };
  }
  handleSubmitFeedback(rating, feedback, pdtCode) {
    let fbData = {
      'feedback': feedback,
      'rating': rating,
      'productId': this.props.match.params.id
    };
    Action.SubmitFeedback(fbData);
  }
  componentDidMount() {
    this.setState(getProductDetailsState(this.props.match.params.id));
    console.log(this.state, 'from componentDidmount');
    AppStore.addChangeListener(this._onChange);
  }
  render() {
    console.log('from render of productdetails', this.state);
    return (
      <div>
        <Navigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ "maxWidth": "100%" }}>
            <div className={"col-sm-4"}>
              <Product pid={this.state.productDetails.pdtCode} price={this.state.productDetails.pdtPrice} name={this.state.productDetails.pdtName} desc={this.state.productDetails.pdtDescription} img={'http://localhost:4400/' + this.state.productDetails.pdtImg} rating={this.state.productDetails.avgFeedback} />
            </div>
            <div className={"col-sm-8"}>
              {this.state.fbDetails.length !== 0 ? <FeedbackComp feedbacks={this.state.fbDetails} onFeedback={this.handleSubmitFeedback} /> : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  _onChange() {
    //Action.FetchFeedbackById(this.props.match.params.id);
    let stateObj = getProductDetailsState(this.props.match.params.id);
    console.log(stateObj, "from OnChange")
    this.setState(stateObj);
  }
}



export default ProductDetails;

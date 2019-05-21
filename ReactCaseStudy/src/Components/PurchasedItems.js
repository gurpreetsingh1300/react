var React = require('react');
import Product from './Product';
import Navigation from './Navigation';
import Footer from './Footer';
import Action from '../Actions/Action.js';
import AppStore from '../Stores/ApplicationStore.js';

class PurchasedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    AppStore.LoadInitialData();
  }
  componentWillMount() {
    document.body.style.backgroundImage = "none";
  }
  componentDidMount() {
    this.setState({
      products: AppStore.FetchPurchasedItems()
    });
    AppStore.addChangeListener(() => {
      this.setState({
        products: AppStore.FetchPurchasedItems()
      });
      //console.log("state set inside purchaseditems");
    });
  }
  render() {
    var items = [];
    //console.log("from render", this.state.products);
    this.state.products.forEach((item, index) => {
      items.push(<div key={index} className={"col-sm-4 col-md-4"}>
        <Product pid={item.pdtCode} price={item.pdtPrice} name={item.pdtName} desc={item.pdtDescription} img={item.pdtImg} rating={item.avgFeedback} status={item.isDiscontinued} />
      </div>);
    });
    console.log('from render after items', items);
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {items.length > 0 ? items : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PurchasedItems;

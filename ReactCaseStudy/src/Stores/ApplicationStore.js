var Dispatcher = require('./../Dispatcher/dispatcher.js').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var IssueConstants = require('./../Constants/IssueConstants');
import $ from 'jquery';
var CHANGE_EVENT = "change";

class AppStore extends EventEmitter {
  constructor() {
    super();
    this._purchasedItems = [];
    this._productDetails = {};
    this._feedbackDetails = [];
  }

  ValidateCreds(cred) {
    sessionStorage.setItem("username", cred.username);
    sessionStorage.setItem("role", 'customer');
    console.log("inside validatecreds");
    this.isAuthenticated();
    this.emitChange();
  }

  LoadInitialData() {
    $.ajax({
      url: 'http://localhost:3000/products',
      type: 'GET',
      async: false,
      success: (retObj) => {
        console.log('from response', retObj);
        this._purchasedItems = retObj;
        this.emitChange();
      },
      error: function (err) {
        data = err;
      }
    });
  }

  FetchPurchasedItems() {
    return this._purchasedItems;
  }

  FetchFeedbackById(pdtId) {
    $.ajax({
      url: `http://localhost:3000/feedbackDetails?pdtCode=${pdtId}`,
      type: 'GET',
      async: false,
      success: (retObj) => {
        console.log('from response', retObj);
        this._feedbackDetails = retObj;
        this.emitChange();
      },
      error: function (err) {
        data = err;
      }
    });
  }

  FetchFeedback() {
    return this._feedbackDetails;
  }

  AddFeedback(feedbackDetails) {
    console.log('from addfeedback', feedbackDetails);
    var newFb = {
      "pdtCode": feedbackDetails.productId,
      "user": sessionStorage.getItem('username'),
      "body": feedbackDetails.feedback,
      "rating": feedbackDetails.rating
    };
    $.ajax({
      url: 'http://localhost:3000/feedbackDetails',
      type: 'POST',
      data: newFb,
      async: false,
      success: (response) => {
        console.log('from response add feedback', response);
        this.FetchFeedbackById(feedbackDetails.productId);
      },
      error: function (err) {
        console.log("error", err)
      }
    });
  }

  emitChange() {
    console.log('inside change event store');
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener() {
    this.removeListener(CHANGE_EVENT);
  }

  isAuthenticated() {
    if (sessionStorage.getItem('username')) {
      console.log('isAuthenticated is true');
      return true;
    }
    return false;
  }

  handleActions(payload) {
    var action = payload.action;
    switch (action.actionType) {

      case IssueConstants.LOGIN:
        this.ValidateCreds(payload.action.data);
        this.emit('change');
        break;

      case IssueConstants.PURCHASED_ITEMS:
        this.FetchPurchasedItems(payload.action.data);
        this.emit('change');
        break;

      case IssueConstants.SUBMIT_FEEDBACK:
        this.AddFeedback(payload.action.data);
        this.emit('change');
        break;

      case IssueConstants.FB_ID:
        this.FetchFeedbackById(payload.action.data);
        this.emitChange();
        break;

      default:
        return true;
    }
  }

}

var appStore = new AppStore;

Dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;

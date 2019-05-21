var Dispatcher = require('../Dispatcher/dispatcher.js').AppDispatcher;
var IssueConstants = require('../Constants/IssueConstants.js');

module.exports = {

  Login: function (data) {
    Dispatcher.handleAction({
      actionType: IssueConstants.LOGIN,
      data: data
    });
  },
  Logout: function () {
    Dispatcher.handleAction({
      actionType: IssueConstants.LOGOUT,
      data: ""
    });
  },
  SubmitFeedback: function (data) {
    Dispatcher.handleAction({
      actionType: IssueConstants.SUBMIT_FEEDBACK,
      data: data
    });
  },
  DiscontinueProduct: function (data) {
    Dispatcher.handleAction({
      actionType: IssueConstants.DISC_PDT,
      data: data
    });
  },
  FetchFeedbackById: function (data) {
    Dispatcher.handleAction({
      actionType: IssueConstants.FB_ID,
      data: data
    });
  }

};

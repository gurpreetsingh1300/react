import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Rater from './Rater';

class FeedbackComp extends React.Component {
  constructor() {
    super();
    this.state = {
      latestFeedback: "",
      rating: '5'
    };
    this.feedbackSubmitHandler = this.feedbackSubmitHandler.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleFeedbackChange(e) {
    this.setState({ latestFeedback: e.target.value })
  }
  handleClick(rating) {
    this.setState({ rating: rating });
  }
  feedbackSubmitHandler() {
    this.props.onFeedback(this.state.rating, this.state.latestFeedback);
    this.setState({ latestFeedback: "", rating: "5" });
  }
  render() {
    var items = [];
    this.props.feedbacks.forEach(function (fb, index) {
      items.push(<div key={index}><a href="#"><h4>{fb.user}</h4></a><Rater value={fb.rating} maxlength="6" />&nbsp;&nbsp;<span style={{ "fontSize": "9px" }}>{fb.rating}/5</span><br /><div style={{ 'paddingBottom': '10px' }}>{fb.body}</div></div>)
    });
    return (
      <div>
        {items}
        {this.props.status ? null : <Form horizontal className={""}>
          <div className={"form-group"}>
            <textarea className={"form-control"} rows="5" cols="12" value={this.state.latestFeedback} name="username" onChange={this.handleFeedbackChange} ref="username" ></textarea>
          </div>
          <div><Rater value={this.state.rating} maxlength="6" onSelected={this.handleClick} />&nbsp;&nbsp;
        <span style={{ "fontSize": "9px" }}>{this.state.rating}/5</span></div><br />
          <FormGroup>
            <Col sm={8}>
              <Button bsStyle="primary" onClick={this.feedbackSubmitHandler} >
                Submit Feedback
              </Button>
            </Col>
          </FormGroup>
        </Form>}
      </div>
    );
  }
}

export default FeedbackComp;

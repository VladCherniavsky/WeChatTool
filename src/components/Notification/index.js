import React from 'react';
import axios from 'axios';
import './style.css';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sap_order_id: '',
      action: '',
      notificationUrl: 'https://us.qa2.burberry.com/test/pay/confirmpay'
    }
  }

  handleInputChange = (inputField) => {
    return (event) => {
      this.setState({
        ...this.state,
        [inputField]: event.target.value,
      });
    };
  };

  sendNotification = () => {
    const response =  axios({
      url: this.state.notificationUrl,
      data: {
        sap_order_id: 2578406,
        action: 'SUCCESS'
      },
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST'
    }).then().catch((err) => {
      console.log('err', err)
    })
  };

  render() {
    return(
      <div>
        <h3> Notification</h3>

        <form className={'notification'}>
          <div className="element">
            <label >Sap Order Id: </label>
            <input type="text"
                   placeholder={'Sap Order Id'}
                   onChange={this.handleInputChange('sap_order_id')}
                   value={this.state.sap_order_id}/>
          </div>

          <div className="element">
            <label >Action: </label>
            <input type="text"
                   placeholder={'Action'}
                   onChange={this.handleInputChange('action')}
                   value={this.state.action}/>
          </div>
        </form>

        <button className="buttonPool" onClick={this.sendNotification}>
          Send
        </button>
      </div>
    );
  }
}
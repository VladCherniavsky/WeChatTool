import React from 'react';
import './style.css';
import httpClient from '../../services/index';

export default class WeChat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      first_name: '',
      last_name: '',
      phone: '',
      device_type: ''
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

  applyWeChat = () => {
    console.log('apply', this.state)
    this.props.applyWeChat(this.state);
  };

  removeWeChat = () => {
    this.props.removeWeChat();
    console.log('remove', this.state)
  };

  render() {
    const weChatData = this.props.weChatData;
    return (<div>
      <h3> WeChat</h3>
      <form className="weCharForm">
        <div className="element">
          <label>Title: </label>
          <input type="text"
                 onChange={this.handleInputChange('title')}
                 value={this.state.title}/>
        </div>
        <div className="element">
          <label>First Name: </label>
          <input type="text"
                 onChange={this.handleInputChange('first_name')}
                 value={this.state.first_name}/>
        </div>
        <div className="element">
          <label>Last Name: </label>
          <input type="text"
                 onChange={this.handleInputChange('last_name')}
                 value={this.state.last_name}/>
        </div>
        <div className="element">
          <label>Phone: </label>
          <input type="text"
                 onChange={this.handleInputChange('phone')}
                 value={this.state.phone}/>
        </div>
        <div className="element">
          <label>Device type: </label>
          <input type="text"
                 onChange={this.handleInputChange('device_type')}
                 value={this.state.device_type}/>
        </div>
      </form>
      <button className="buttonApplyWechat" onClick={this.applyWeChat}>
        Apply
      </button>
      {weChatData && <button className="buttonRemoveWechat" onClick={this.removeWeChat}>
        Remove
      </button>}



    </div>);
  }
}

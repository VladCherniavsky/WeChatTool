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
      trade_type: '',
      open_id: ''
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
          <label>Trade type: </label>
          <input type="text"
                 onChange={this.handleInputChange('trade_type')}
                 value={this.state.trade_type}/>
        </div>
        <div className="element">
          <label>Open Id: </label>
          <input type="text"
                 onChange={this.handleInputChange('open_id')}
                 value={this.state.open_id}/>
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

import React from 'react';
import './style.css';

export default class ConfirmOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_token: '',
      status: '',
      merchant_sig: '',
      payment_method: ''
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

  confirmOrder = () => {
    this.props.confirmOrder(this.state);
  };

  render() {
    return(
      <div>
        <h3>Confirm Order</h3>

        <form className={'confirmOrder'}>
          <div className="element">
            <label>Payment token: </label>
            <input type="text"
                   placeholder={'Payment token'}
                   onChange={this.handleInputChange('payment_token')}
                   value={this.state.payment_token}/>
          </div>

          <div className="element">
            <label>Status: </label>
            <input type="text"
                   placeholder={'Status'}
                   onChange={this.handleInputChange('status')}
                   value={this.state.status}/>
          </div>

          <div className="element">
            <label>Merchant sig: </label>
            <input type="text"
                   placeholder={'Merchant sig'}
                   onChange={this.handleInputChange('merchant_sig')}
                   value={this.state.merchant_sig}/>
          </div>

          <div className="element">
            <label>Payment method: </label>
            <input type="text"
                   placeholder={'Payment method'}
                   onChange={this.handleInputChange('payment_method')}
                   value={this.state.payment_method}/>
          </div>
        </form>

        <button className="confirmOrderButton" onClick={this.confirmOrder}>
          Confirm
        </button>
      </div>
    );
  }
}

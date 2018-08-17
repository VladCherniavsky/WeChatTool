import React from 'react';
import './style.css';
import httpClient from '../../services/index';

export default class ShipingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.allShippingMethods = 'orders/current/available-shipping-methods';
    this.applyShippingUrl = 'orders/current/shipping-method';
    this.state = {
      shipingOptions: [],
      selectedShippingId: '',
      deliveryType: '',
    };
  }

  componentDidMount() {
    this.props.tokenOrGuestId && this.getAvaliableShippingOptions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.tokenOrGuestId != nextProps.tokenOrGuestId
        || nextState.shipingOptions != this.state.shipingOptions
        || nextState.selectedShippingId !== this.state.selectedShippingId;
  }

  componentDidUpdate() {
    if (!this.state.shipingOptions.length) {
      this.props.tokenOrGuestId && this.getAvaliableShippingOptions();
    }

  }

  getAvaliableShippingOptions  = async () => {
    const {isTokenActive, tokenOrGuestId} = this.props;
    const response = await httpClient.fetch(isTokenActive, tokenOrGuestId,
        this.allShippingMethods, {method: 'GET'});

    const data = response.data;
    if(data) {
      data.response ?
        this.setState({...this.state, shipingOptions: data.response.data}) :
        null;
    }
  };

  handleCheckBoxChange = (event) => {
    let deliveryType = '';
    this.state.shipingOptions.forEach(option => {
      if (option.id === event.target.value) {
        if (option.type === 'COURIER') {
          deliveryType = 'HOME';
        }
        if (option.type === 'DELIVERY_TO_STORE') {
          deliveryType = 'STORE';
        }
      }
    });
    this.setState({
      ...this.state,
      selectedShippingId: event.target.value,
      deliveryType,
    }, () => {
      this.applyShippingMethod({id: this.state.selectedShippingId});
    });
  };

  applyShippingMethod = async (data) => {
    console.log('data', data);
    const params = {
      method: 'PUT',
      data: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const {isTokenActive, tokenOrGuestId} = this.props;
    const {applyShippingUrl} = this;
    const response = await httpClient.fetch(isTokenActive, tokenOrGuestId, applyShippingUrl, params);

    this.props.selectShippingOption(this.state.deliveryType);
  };

  render() {
    return (
        <div>
          <h3>Avaliable shipping options</h3>

          <div className="options">
            {this.state.shipingOptions.map((option) => (
                <div key={option.name}>
                  <input type="checkbox"
                         value={option.id}
                         onChange={this.handleCheckBoxChange}
                         checked={option.id === this.state.selectedShippingId}/>
                  <label>{option.name}</label>
                </div>
            ))}
          </div>

        </div>
    );
  }
}

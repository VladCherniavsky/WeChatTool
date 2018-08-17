import React, {Component} from 'react';
import HomeDeliveryForm from './components/HomeDeliveryForm/index';
import CollectInStoreForm from './components/CollectInStoreForm/index';
import ShipingOptions from './components/ShipingOptions/index';
import httpClient from './services/index';
import Language from './components/Language';
import WeChat from './components/WeChat';
import Pooling from './components/Pooling';
import Notification from './components/Notification';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.weChatUrl = 'orders/current/payment-providers/wechat';
    this.shippingStore = 'orders/current/shipping-store';
    this.shippingAddress = 'orders/current/shipping-address';
    this.changeCountryUrl = 'current-country';
    this.state = {
      isTokenActive: true,
      tokenOrGuestId: '',
      currentLanguage: 'en',
      languages: ['en', 'cn']
    };

  }

  handleRadioButtonChange = (prop) => {
    return (event) => {
      this.setState({
        ...this.state,
        [prop]: event.target.value === 'true' ? true : false,
      });
    };
  };

  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      tokenOrGuestId: event.target.value,
    });
  };

  handleChangeCountryClick = async() => {
    const params = {
      method: 'PUT',
      data: {country: 'CN'},
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const {isTokenActive, tokenOrGuestId} = this.state;
    const url = this.changeCountryUrl;
    const queryUrl = `?country=CN&language=${this.state.currentLanguage}`;


    return httpClient.fetchParams(isTokenActive, tokenOrGuestId, url, queryUrl, params).then(async () => {
      const currentResponse = await httpClient.fetch(isTokenActive, tokenOrGuestId, 'orders/current', {method: 'GET'});
    });
  };

  handleApplyDeliveryClick = async () => {
    const {isTokenActive, tokenOrGuestId} = this.state;
    if (this.state.deliveryType === 'HOME') {
      const homeFormState = this.refs.homeForm.state;
      const params = {
        method: 'PUT',
        data: homeFormState,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };
      this.setState({
        ...this.state,
        deliveryAddress: homeFormState,
      });
      const response = await httpClient.fetch(isTokenActive, tokenOrGuestId, this.shippingAddress, params);
    }
    if (this.state.deliveryType === 'STORE') {
      const data = {
        address: {
          ...this.state.selectedStore.address,
          store_name: this.state.selectedStore.selectedStoreName},
        sap_store_id: 9003,
        store_id: 9003,
      };
      this.setState({
        ...this.state,
        deliveryAddress: this.state.selectedStore.address,
      });
      const params = {
        method: 'PUT',
        data: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };
      const response = await httpClient.fetch(isTokenActive, tokenOrGuestId,
        this.shippingStore, params);
    }
  };

  selectStoreHandler = (store) => {
    this.setState({
      ...this.state,
      selectedStore: store,
    });
  };
  selectShippingOption = (deliveryType) => {
    this.setState({
      ...this.state,
      deliveryType,
    });
  };

  submitOrder = async () => {
    const {isTokenActive, tokenOrGuestId} = this.state;
    const submitUrl = 'orders/current';
    const params = {
      method: 'POST',
      data: {
        app: 'mobile',
        client: {
          ip_address: '127.0.0.1',
          user_agent: 'useragent'
        }
      },
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
    };


    const response = await httpClient.fetchParams(isTokenActive, tokenOrGuestId,
      submitUrl, `?country=CN&language=${this.state.currentLanguage}&action=submit`, params);

   console.log('response sumbit', response)
  };

  selectLanguage = (language) => {
    this.setState({...this.state, currentLanguage: language}, () => {
      httpClient.setLanguage(this.state.currentLanguage)
    });
  };

  handleApplyWeChat = async (data) => {
    const {isTokenActive, tokenOrGuestId} = this.state;
    const url = this.weChatUrl;

    const params = {
      method: 'PUT',
      data: data,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const response = await httpClient.fetch(isTokenActive, tokenOrGuestId, url, params);
    if(response.data) {
      this.setState({...this.state, weChatData: response.data});
    }

  };

  handleRemoveWeChat = async () => {
    const {isTokenActive, tokenOrGuestId} = this.state;
    const url = this.weChatUrl;

    const params = {
      method: 'DELETE',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const response = await httpClient.fetch(isTokenActive, tokenOrGuestId, url, params);
    if(response.data) {
      this.setState({...this.state, weChatData: null});
    }
  };

  poolTransaction = async (transactionId) => {
    const {isTokenActive, tokenOrGuestId} = this.state;
    const url = `orders/current/payment-providers/wechat/transaction/${transactionId}`;

    const response = await httpClient.fetch(isTokenActive, tokenOrGuestId, url);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"></h1>
        </header>

        <div className="container">
          <div className="wrapper">
            <Language languages={this.state.languages}
                      currentLanguage={this.state.currentLanguage}
                      selectLanguage={this.selectLanguage}/>
          </div>

          <div className="wrapper">
            <form action="">
              <label>Token:</label>
              <input type="radio"
                     value={true}
                     onChange={this.handleRadioButtonChange('isTokenActive')}
                     checked={this.state.isTokenActive}/>
              <label>GuestId:</label>
              <input type="radio"
                     value={false}
                     onChange={this.handleRadioButtonChange('isTokenActive')}
                     checked={this.state.isTokenActive === false}/>
              <div>
                <br/>
                <input type="text"
                       placeholder={this.state.isTokenActive ?
                         'Token' :
                         'GuestId'}
                       value={this.state.tokenOrGuestId}
                       onChange={this.handleInputChange}
                />
              </div>
            </form>
          </div>

          <div className="wrapper">
            <button onClick={this.handleChangeCountryClick}>Change Country
            </button>
          </div>

          <div className="wrapper">
            <div>
              <ShipingOptions isTokenActive={this.state.isTokenActive}
                              tokenOrGuestId={this.state.tokenOrGuestId}
                              selectShippingOption={this.selectShippingOption}/>

              <br/>

              {this.state.deliveryType === 'HOME' &&
              <HomeDeliveryForm ref="homeForm"/>}
              {this.state.deliveryType === 'STORE' && <CollectInStoreForm
                language={this.state.currentLanguage}
                selectStoreHandler={this.selectStoreHandler}/>}

              <button className="buttonSubmitDelivery"
                      onClick={this.handleApplyDeliveryClick}>Apply shipping
              </button>
            </div>
          </div>

          <div className="wrapper">
            <WeChat  applyWeChat={this.handleApplyWeChat}
                     removeWeChat={this.handleRemoveWeChat}
                     weChatData={this.state.weChatData}/>
          </div>

          <div className="wrapper">
            <button className="submitOrder"
                    onClick={this.submitOrder}>
              Submit
            </button>
          </div>

          <div className="wrapper">
            <Pooling poolTransaction={this.poolTransaction}/>
          </div>

          <div className="wrapper">
            <Notification />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

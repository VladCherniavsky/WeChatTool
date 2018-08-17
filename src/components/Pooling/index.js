import React from 'react';
import './style.css';

export default class Pooling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction_id: ''
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

  poolTransaction = () => {
    this.props.poolTransaction(this.state.transaction_id);
  };

  render() {
    return(
      <div>
        <h3> Pooling</h3>

        <form className={'pooling'}>
          <div className="element">
            <input type="text"
                   placeholder={'Transaction Id'}
                   onChange={this.handleInputChange('transaction_id')}
                   value={this.state.transaction_id}/>
          </div>
        </form>

        <button className="buttonPool" onClick={this.poolTransaction}>
          Send
        </button>
      </div>
    );
  }
}

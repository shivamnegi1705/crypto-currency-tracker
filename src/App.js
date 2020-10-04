import React from 'react';
import axios from 'axios';
import Coin from './Coin';
import './App.css';

class App extends React.Component{
    state = {coins: [], search: ''};
    componentDidMount(){
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res =>{
            this.setState({coins: res.data});
        })
        
    }

    handleChange = (event) =>{
        this.setState({search: event.target.value});
    }

    filteredCoins = () =>{
        const searchResults =  this.state.coins.filter(coin =>{
            return coin.name.toLowerCase().includes(this.state.search.toLowerCase());
        });
        return searchResults;
    }


    render(){
        return (
            <div className='coin-app'>
                <div className='coin-search'>
                    <h1 className="coin-text">Search a currency</h1>
                    <form>
                        <input type='text' placeholder='Search' className='coin-input' onChange={this.handleChange}/>
                    </form>
                </div>
                {this.filteredCoins().map(coin =>{
                    return (
                        <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} price={coin.current_price} volume={coin.total_volume} priceChange={coin.price_change_percentage_24h} marketcap={coin.market_cap}/>
                    );
                })}
            </div>
        );
    }
}
export default App;



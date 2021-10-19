import axios from 'axios';

export class Coingecko {
    getCuentas() {
        return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=btc%2Cusd').then(res => res.data.dai);
    }
    getCoins(){
        return axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true').then(res => res.data);
    }
    getMarkets(){
        return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res=>res.data);
    }
    getExchanges(){
        // {
        //     "id": "binance",
        //     "name": "Binance",
        //     "year_established": 2017,
        //     "country": "Cayman Islands",
        //     "description": "",
        //     "url": "https://www.binance.com/",
        //     "image": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250",
        //     "has_trading_incentive": false,
        //     "trust_score": 10,
        //     "trust_score_rank": 1,
        //     "trade_volume_24h_btc": 433056.0187191251,
        //     "trade_volume_24h_btc_normalized": 433056.0187191251
        //   },
        return axios.get('https://api.coingecko.com/api/v3/exchanges').then(res=>res.data);
    }
}
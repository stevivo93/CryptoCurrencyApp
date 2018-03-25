import {FETCH_POST, BUY_POST, SELL_POST} from "./";

export const fetchPosts = () => dispatch => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?convert=IDR&limit=100').then((Response) => Response.json()).then((posts) => {
        Object.keys(posts).forEach(function (key) {
            posts[key].rank = parseFloat(posts[key].rank);
            posts[key].market_cap_idr = parseFloat(posts[key].market_cap_idr);
            posts[key].price_idr = parseFloat(posts[key].price_idr);
            posts[key]['24h_volume_idr'] = parseFloat(posts[key]['24h_volume_idr']);
            posts[key].percent_change_24h = parseFloat(posts[key].percent_change_24h);
            posts[key].total_supply = parseFloat(posts[key].total_supply)
        });
        dispatch({
            type: FETCH_POST,
            payload: posts
        })
    });
    setInterval(() => {
        fetch('https://api.coinmarketcap.com/v1/ticker/?convert=IDR&limit=100').then((Response) => Response.json()).then((posts) => {
            Object.keys(posts).forEach(function (key) {
                posts[key].rank = parseFloat(posts[key].rank);
                posts[key].market_cap_idr = parseFloat(posts[key].market_cap_idr);
                posts[key].price_idr = parseFloat(posts[key].price_idr);
                posts[key]['24h_volume_idr'] = parseFloat(posts[key]['24h_volume_idr']);
                posts[key].percent_change_24h = parseFloat(posts[key].percent_change_24h);
                posts[key].total_supply = parseFloat(posts[key].total_supply)
            });
            dispatch({
                type: FETCH_POST,
                payload: posts
            })
        });
        // console.log("nana")
    }, 1000 * 60 * 5)
};

export const buyPosts = (postData) => dispatch => {
    fetch('https://api.coinmarketcap.com/v1/ticker/' + postData.cc + '/?convert=IDR').then((Response) => Response.json()).then((res) => {
        // console.log(postData);
        const posts = {
            money: postData.money,
            data: {
                id: postData.cc,
                has: postData.get,
                name: res[0].name,
                symbol: res[0].symbol,
                price_idr: null
            }
        };
        dispatch({
            type: BUY_POST,
            payload: posts
        })
    });
};

export const sellPosts = (postData) => dispatch => {
    fetch('https://api.coinmarketcap.com/v1/ticker/' + postData.cc + '/?convert=IDR').then((Response) => Response.json()).then((res) => {
        // console.log(postData);
        const posts = {
            money: postData.get,
            data: {
                id: postData.cc,
                has: postData.coin,
                name: res[0].name,
                symbol: res[0].symbol,
                price_idr: null
            }
        };
        dispatch({
            type: SELL_POST,
            payload: posts
        })
    });
};

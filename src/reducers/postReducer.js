import {FETCH_POST, BUY_POST, SELL_POST} from "../actions";

const initialState = {
    items: [],
    total: 0,
    Money: 10000000,
    CC: [{id: 'bitcoin', has: 1.5, name: 'Bitcoin', symbol: 'BTC', price_idr: null}, {
        id: 'litecoin',
        has: 10,
        name: 'Litecoin',
        symbol: 'LTC',
        price_idr: null
    }],
    history:[],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_POST:
            let total = state.Money;
            for (let i = 0; i < state.CC.length; i++) {
                state.CC[i].price_idr = action.payload.filter(item => item.id === state.CC[i].id).map(item => item.price_idr);
                let val = state.CC[i].has * state.CC[i].price_idr;
                total = total + val;
            }

            return {
                ...state,
                total: total,
                items: action.payload,
                Money: state.Money,
                CC: state.CC
            };
        case BUY_POST:

            let a = state.CC.filter(item => item.id === action.payload.data.id).map(item => item);
            if (a.length === 0) {
                state.CC.push(action.payload.data);
            } else {
                Object.keys(state.CC).forEach(function (key) {
                    if (state.CC[key].id === action.payload.data.id) {
                        state.CC[key].has = state.CC[key].has + action.payload.data.has;
                    }
                });
            }
            let totals = state.Money - action.payload.money;
            for (let i = 0; i < state.CC.length; i++) {
                state.CC[i].price_idr = state.items.filter(item => item.id === state.CC[i].id).map(item => item.price_idr);
                let val = state.CC[i].has * state.CC[i].price_idr;
                totals = totals + val;
            }

            state.history.push(action.payload.history);
            return {
                ...state,
                total: totals,
                Money: state.Money - action.payload.money,
                CC: state.CC,
                history: state.history
            };
        case SELL_POST:

            Object.keys(state.CC).forEach(function (key) {
                if (state.CC[key].id === action.payload.data.id) {
                    state.CC[key].has = state.CC[key].has - action.payload.data.has;
                }
            });

            let totalss = state.Money + action.payload.money;
            for (let i = 0; i < state.CC.length; i++) {
                state.CC[i].price_idr = state.items.filter(item => item.id === state.CC[i].id).map(item => item.price_idr);
                let val = state.CC[i].has * state.CC[i].price_idr;
                totalss = totalss + val;
            }

            state.history.push(action.payload.history);

            return {
                ...state,
                total: totalss,
                Money: state.Money + action.payload.money,
                CC: state.CC,
                history: state.history
            };
        default:
            return state;
    }
}
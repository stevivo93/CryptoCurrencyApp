import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import {Tab, Tabs, Modal, Button} from 'react-bootstrap';
import '../css/trading.css';

import {connect} from 'react-redux';
import {fetchPosts, buyPosts, sellPosts} from "../actions/postActions";

// function limitMoney(max,val) {
//     val = parseFloat(val)
//     // val = 0.777;
//     console.log(max)
//     console.log(val)
//     if (val > max){
//         val = max
//     }
//     let parts = val.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
// }

// const inputParsers = {
//     date(input) {
//         const [month, day, year] = input.split('/');
//         return `${year}-${month}-${day}`;
//     },
//     uppercase(input) {
//         return input.toUpperCase();
//     },
//     number(input) {
//         return parseFloat(input);
//     },
// };

class Trading extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            buyConvert: '',
            sellConvert: '',
            buyCurrency: '',
            sellCurrency: '',
            Limit: '',
            setBuy: '',
            setSell: '',
            buyPick: '',
            sellPick: '',
            codeBuy: '',
            codeSell: '',
            show: false,
            errorText: '',
        }
    }

    componentWillMount() {
        this.props.fetchPosts();
    }

    onChange(e) {
        if (e.target.className === 'selectCurrencyBuy') {
            let buy = parseFloat(this.state.setBuy.replace(/,/g, ''));
            let limit = this.props.CC.filter(item => item.id === e.target.value).map(item => item.has)
            let getCurrency = this.props.listData.filter(item => item.id === e.target.value).map(item => item.price_idr)
            let symbolCurrency = this.props.listData.filter(item => item.id === e.target.value).map(item => item.symbol)
            this.setState({
                Limit: limit,
                buyCurrency: getCurrency,
                buyPick: e.target.value,
                buyConvert: buy / getCurrency,
                codeBuy: symbolCurrency
            })
        } else if (e.target.className === 'selectCurrencySell') {
            let sell = parseFloat(this.state.setSell.replace(/,/g, ''));
            let limit = this.props.CC.filter(item => item.id === e.target.value).map(item => item.has)
            let getCurrency = this.props.listData.filter(item => item.id === e.target.value).map(item => item.price_idr)
            let symbolCurrency = this.props.listData.filter(item => item.id === e.target.value).map(item => item.symbol)
            this.setState({
                Limit: limit,
                sellCurrency: getCurrency,
                sellPick: e.target.value,
                sellConvert: getCurrency / sell,
                codeSell: symbolCurrency
            })
        } else if (e.target.className === 'buy-idr') {
            let buy = parseFloat(e.target.value.replace(/,/g, ''));

            this.setState({
                setBuy: e.target.value,
                buyConvert: buy / this.state.buyCurrency
            })
        } else if (e.target.className === 'sell-cc') {
            let sell = parseFloat(e.target.value.replace(/,/g, ''));

            this.setState({
                setSell: e.target.value,
                sellConvert: this.state.sellCurrency / sell
            })
        }
    }

    handleSubmitBuy(max, event) {
        event.preventDefault();
        const form = event.target;
        if (form[0].value !== "0" && form[1].value !== "" && form[2].value !== "") {
            let pickedCurrency = form[0].value;
            let buy = parseFloat(form[1].value.replace(/,/g, ''));
            let getFromBuy = parseFloat(form[2].value.replace(/,/g, ''));
            // let d = new Date();
            let t = Date.now();
            const post = {
                cc: pickedCurrency,
                money: buy,
                get: getFromBuy,
                time: t,
            };
            if (buy <= max) {
                this.props.buyPosts(post)
            } else {
                // console.log("duit kurang");
                this.setState({
                    show: true,
                    errorText: "Saldo yang anda masukkan melebihi saldo yang anda punya"
                });
            }
        } else {
            // console.log("from kurang benar");
            this.setState({
                show: true,
                errorText: "Ada kesalahan dalam memasukkan data"
            });
        }
    }

    handleSubmitSell(max, event) {
        // console.log(max);
        event.preventDefault();
        const form = event.target;
        if (form[0].value !== "0" && form[1].value !== "" && form[2].value !== "") {
            let pickedCurrency = form[0].value;
            let sell = parseFloat(form[1].value.replace(/,/g, ''));
            let getFromSell = parseFloat(form[2].value.replace(/,/g, ''));
            // let d = new Date();
            // let t = d.getTime();
            let t = Date.now();
            const post = {
                cc: pickedCurrency,
                coin: sell,
                get: getFromSell,
                time: t,
            };
            if (sell <= max) {
                this.props.sellPosts(post);
                let limit = this.props.CC.filter(item => item.id === this.props.Limit).map(item => item.has)
                this.setState({
                    Limit: limit,
                })
            } else {
                // console.log("duit kurang");
                this.setState({
                    show: true,
                    errorText: "Saldo yang anda masukkan melebihi saldo yang anda punya"
                });
            }
        } else {
            // console.log("from kurang benar");
            this.setState({
                show: true,
                errorText: "Ada kesalahan dalam memasukkan data"
            });
        }
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }


    render() {
        return (
            <div className="trading">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Buy" className="trading-pick-buy">
                        <div className="filter-box">
                            <form onSubmit={this.handleSubmitBuy.bind(this, this.props.Money)}>
                                <select name="pick" value={this.state.buyPick} className="selectCurrencyBuy"
                                        onChange={this.onChange.bind(this)}>
                                    <option value={0}>Pilih Token</option>
                                    {this.props.listData.map(p => <option value={p.id}>{p.name}</option>)}
                                </select>
                                <span>Rp.</span>
                                <NumberFormat name="buy" onChange={this.onChange.bind(this)} className="buy-idr"
                                              thousandSeparator={true} value={this.state.setBuy}/>
                                <span className="code-currency">{this.state.codeBuy}</span>
                                <NumberFormat className="buy-cc" thousandSeparator={true}
                                              value={this.state.buyConvert}/>
                                <button>Buy</button>
                            </form>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Sell" className="trading-pick-sell">
                        <div className="filter-box">
                            <form onSubmit={this.handleSubmitSell.bind(this, this.state.Limit)}>
                                <select value={this.state.sellPick} className="selectCurrencySell"
                                        onChange={this.onChange.bind(this)}>
                                    <option value={0}>Pilih Token</option>
                                    {this.props.CC.map(p => <option value={p.id}>{p.name}</option>)}
                                </select>
                                <span className="code-currency">{this.state.codeSell}</span>
                                <NumberFormat onChange={this.onChange.bind(this)} className="sell-cc"
                                              thousandSeparator={true} value={this.state.setSell}/>
                                <span>Rp.</span>
                                <NumberFormat className="sell-idr" thousandSeparator={true}
                                              value={this.state.sellConvert}/>
                                <button>Sell</button>
                            </form>
                        </div>
                    </Tab>
                </Tabs>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br/>
                        Oops !!!<br/><br/>
                        {this.state.errorText}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listData: state.posts.items,
    Money: state.posts.Money,
    CC: state.posts.CC
});

// export default Trading;
export default connect(mapStateToProps, {fetchPosts, buyPosts, sellPosts})(Trading);
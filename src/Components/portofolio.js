import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import '../css/portofolio.css'

import {connect} from 'react-redux';
import {fetchPosts, buyPosts} from "../actions/postActions";

class Portofolio extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }


    render() {
        return (
            <div className="portofolio">
                <div className="portofolio-total">
                    <span className="title"> Saldo anda </span><br/>
                    <div className="total-value">
                        <NumberFormat value={this.props.Total} displayType={'text'} thousandSeparator={true}
                                      prefix={'Rp '}/>
                    </div>
                    <span className="total-text"> Total saldo</span>
                </div>
                <div className="portofolio-list">
                    <table>
                        <tr>
                            <td>Rupiah</td>
                            <td align="right"><NumberFormat value={this.props.Money} displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'Rp '}/></td>
                        </tr>
                        {this.props.CC.map(p => <tr>
                            <td>{p.name}</td>
                            <td align="right"><span className="portofolio-coin">{p.has} {p.symbol}</span><br/><span
                                className="portofolio-inrupiah"><NumberFormat value={p.has * p.price_idr}
                                                                              displayType={'text'}
                                                                              thousandSeparator={true}
                                                                              prefix={'Rp '}/></span></td>
                        </tr>)}
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listData: state.posts.items,
    Money: state.posts.Money,
    CC: state.posts.CC,
    Total: state.posts.total
});

// export default Portofolio;
export default connect(mapStateToProps, {fetchPosts, buyPosts})(Portofolio);
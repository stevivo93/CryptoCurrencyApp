import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import ReactTable from 'react-table';
import Timestamp from 'react-timestamp';
import '../css/history.css';

import {connect} from 'react-redux';
import {fetchPosts, buyPosts, sellPosts} from "../actions/postActions";

class History extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }


    render() {
        return (
            <div className="history">
                <div className="history-title">
                    Riwayat 10 transaksi terakhir
                </div><br/>
                <div className="history-list">
                    <ReactTable
                        data={this.props.history}
                        sorted={[{ // the sorting model for the table
                            id: 'time',
                            desc: true
                        }]}
                        columns={[
                            {
                                Header: "Aksi",
                                accessor: "action",
                                sortable: false,
                                maxWidth: 50
                            },
                            {
                                Header: "Nama",
                                accessor: "name",
                                sortable: false,
                            },
                            {
                                Header: "Beli/Jual",
                                accessor: "has",
                                sortable: false,
                                Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                                   thousandSeparator={true} prefix={''}/> {props.original.symbol}</span>
                            },
                            {
                                Header: "Konversi",
                                accessor: "money",
                                sortable: false,
                                Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                                   thousandSeparator={true} prefix={'Rp '}/></span>
                            },
                            {
                                Header: "Waktu",
                                accessor: "time",
                                sortable: false,
                                Cell: props =>
                                    <span><Timestamp time={props.value/1000} format='full'/> </span>,
                            }
                        ]}
                        defaultPageSize={10}
                        // loading={ true}
                        showPagination={false}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listData: state.posts.items,
    Money: state.posts.Money,
    CC: state.posts.CC,
    Total: state.posts.total,
    history: state.posts.history
});

// export default Portofolio;
export default connect(mapStateToProps, {fetchPosts, buyPosts, sellPosts})(History);
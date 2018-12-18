import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import NumberFormat from 'react-number-format';
import '../css/tableList.css';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts} from "../actions/postActions";

class TableList extends Component {

    componentWillMount(){
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="tableList">
                <ReactTable
                    data={this.props.listData}
                    columns={[
                        {
                            Header: "#",
                            accessor: "rank",
                            maxWidth: 35
                        },
                        {
                            Header: "Nama",
                            accessor: "name",
                            maxWidth: 140
                        },
                        {
                            Header: "Market Cap",
                            accessor: "market_cap_idr",
                            Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                               thousandSeparator={true} prefix={'Rp '}/></span>
                        },
                        {
                            Header: "Harga",
                            accessor: "price_idr",
                            maxWidth: 140,
                            Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                               thousandSeparator={true} prefix={'Rp '}/></span>
                        },
                        {
                            Header: "Volume (24h)",
                            accessor: "24h_volume_idr",
                            Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                               thousandSeparator={true} prefix={'Rp '}/></span>
                        },
                        {
                            Header: "Circulating Supply",
                            accessor: "total_supply",
                            maxWidth: 150,
                            Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                               thousandSeparator={true}
                                                               prefix={''}/> {props.original.symbol}</span>
                        },
                        {
                            Header: "Change (24h)",
                            accessor: "percent_change_24h",
                            maxWidth: 100,
                            Cell: props => <span> {parseFloat(props.value) < 0 ? '▼' : '▲'} {props.value} %</span>,
                            getProps: (state, rowInfo, instance) => {
                                if (rowInfo) {
                                    return {
                                        style: {
                                            color: parseFloat(rowInfo.row.percent_change_24h) < 0 ? 'red' : '#4fa149',
                                            textAlign: 'right'
                                        }
                                    }
                                }
                                return {};
                            }

                        }
                    ]}
                    defaultPageSize={100}
                    // loading={ true}
                    showPagination={false}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

TableList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  // posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    listData: state.posts.items,
});

// export default TableList;
export default connect(mapStateToProps, {fetchPosts})(TableList);
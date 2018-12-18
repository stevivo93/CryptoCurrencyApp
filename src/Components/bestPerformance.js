import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import NumberFormat from 'react-number-format';
import {Tab, Tabs} from 'react-bootstrap';
import '../css/bestPerformance.css';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts} from "../actions/postActions";

class BestPerformance extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="bestPerformance">
                <div>Kriptokurensi dengan performa terbaik dalam kurun waktu</div><br/>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    {/*<Tab eventKey={1} title="Best performance currency at last" disabled>aa</Tab>*/}
                    <Tab eventKey={2} title="1 jam terakhir">
                        <ReactTable
                            data={this.props.listData}
                            sorted={[{ // the sorting model for the table
                                id: 'percent_change_1h',
                                desc: true
                            }]}
                            columns={[
                                {
                                    Header: "#",
                                    accessor: "rank",
                                    maxWidth: 35,
                                    sortable: false,
                                },
                                {
                                    Header: "Nama",
                                    accessor: "name",
                                    sortable: false,
                                },
                                {
                                    Header: "Harga",
                                    accessor: "price_idr",
                                    sortable: false,
                                    Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                                       thousandSeparator={true} prefix={'Rp '}/></span>
                                },
                                {
                                    Header: "Change (1h)",
                                    accessor: "percent_change_1h",
                                    sortable: false,
                                    Cell: props =>
                                        <span> {parseFloat(props.value) < 0 ? '▼' : '▲'} {props.value} %</span>,
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
                            defaultPageSize={10}
                            // loading={ true}
                            showPagination={false}
                            className="-striped -highlight"
                        />
                    </Tab>
                    <Tab eventKey={3} title="24 jam terakhir">
                        <ReactTable
                            data={this.props.listData}
                            sorted={[{ // the sorting model for the table
                                id: 'percent_change_24h',
                                desc: true
                            }]}
                            columns={[
                                {
                                    Header: "#",
                                    accessor: "rank",
                                    maxWidth: 35,
                                    sortable: false,
                                },
                                {
                                    Header: "Nama",
                                    accessor: "name",
                                    sortable: false,
                                },
                                {
                                    Header: "Harga",
                                    accessor: "price_idr",
                                    sortable: false,
                                    Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                                       thousandSeparator={true} prefix={'Rp '}/></span>
                                },
                                {
                                    Header: "Change (24h)",
                                    accessor: "percent_change_24h",
                                    sortable: false,
                                    Cell: props =>
                                        <span> {parseFloat(props.value) < 0 ? '▼' : '▲'} {props.value} %</span>,
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
                            defaultPageSize={10}
                            // loading={ true}
                            showPagination={false}
                            className="-striped -highlight"
                        />
                    </Tab>
                    <Tab eventKey={4} title="7 hari terakhir">
                        <ReactTable
                            data={this.props.listData}
                            sorted={[{ // the sorting model for the table
                                id: 'percent_change_7d',
                                desc: true
                            }]}
                            columns={[
                                {
                                    Header: "#",
                                    accessor: "rank",
                                    maxWidth: 35,
                                    sortable: false,
                                },
                                {
                                    Header: "Nama",
                                    accessor: "name",
                                    sortable: false,
                                },
                                {
                                    Header: "Harga",
                                    accessor: "price_idr",
                                    sortable: false,
                                    Cell: props => <span><NumberFormat value={props.value} displayType={'text'}
                                                                       thousandSeparator={true} prefix={'Rp '}/></span>
                                },
                                {
                                    Header: "Change (7d)",
                                    accessor: "percent_change_7d",
                                    sortable: false,
                                    Cell: props =>
                                        <span> {parseFloat(props.value) < 0 ? '▼' : '▲'} {props.value} %</span>,
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
                            defaultPageSize={10}
                            // loading={ true}
                            showPagination={false}
                            className="-striped -highlight"
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

BestPerformance.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    // posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    listData: state.posts.items,
});

// export default TableList;
export default connect(mapStateToProps, {fetchPosts})(BestPerformance);
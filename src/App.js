import React, {Component} from 'react';
// import logo from './logo.svg';
import './css/App.css';
import TableList from './Components/tableList';
import Portofolio from './Components/portofolio';
import Trading from './Components/trading';
import {Row, Col} from 'react-bootstrap';

import {Provider} from 'react-redux';

import store from './store'
// import axios from 'axios';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
// import NumberFormat from 'react-number-format';


class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="header">
                        <div className="container">
                        TOKOCRYPTO
                        </div>
                    </div>
                    <div className="container container-content">
                        <Row>
                            <Col sm={3} className="leftSide">
                                <Portofolio/>
                                <Trading/>
                            </Col>
                            <Col sm={9} className="rightSide">
                                <TableList/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                            </Col>
                            <Col sm={6}>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;

import React, {Component} from 'react';
import './css/App.css';
import TableList from './Components/tableList';
import Portofolio from './Components/portofolio';
import Trading from './Components/trading';
import BestPerformance from './Components/bestPerformance';
import History from './Components/history';
import {Row, Col} from 'react-bootstrap';

import {Provider} from 'react-redux';

import store from './store'


class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="header">
                        <div className="container">
                        CRIPTO STORE
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
                            <Col sm={7}>
                                <History/>
                            </Col>
                            <Col sm={5}>
                                <BestPerformance/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;

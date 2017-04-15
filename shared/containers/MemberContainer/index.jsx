import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import MemberList from '../MemberList';

class MemberContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <MemberList />
            </div>
        );
    }
}

export default connect()(MemberContainer);
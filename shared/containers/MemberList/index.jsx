import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberItem from '../../components/MemberItem';
import * as action from '../../redux/action';

class MemberList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.members.sort();
        data = data.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.props.search) > -1;
        });
        return (
            <div>
                {data.map((member, index) => {
                    return (
                        <MemberItem key={index} id={index} content={member} delete={this.props.handleRemoval} />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.members.search,
        members: state.members.members
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleRemoval: (id) => { dispatch(action.removal(id)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
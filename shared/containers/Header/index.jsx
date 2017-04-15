import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../redux/action';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import update from 'react-addons-update';
import AutoComplete from 'material-ui/AutoComplete';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tapped: false,
            member: {
                name: '',
                age: 0,
                phone: '',
                email: '',
            },
            dataSource: [],
        };
        this.handleEnrollmentToggle = this.handleEnrollmentToggle.bind(this);
        this.handleOnTextFieldChanged = this.handleOnTextFieldChanged.bind(this);
        this.handleOnAutoCompleteChange = this.handleOnAutoCompleteChange.bind(this);
    }
    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={() => this.handleEnrollmentToggle(false)} />,
            <FlatButton label="Submit" primary={true} onTouchTap={() => this.handleEnrollmentToggle(false)} keyboardFocused={true} />,
        ];
        return (
            <Toolbar>
                <ToolbarTitle text={this.props.title} />
                <AutoComplete hintText="검색" fullWidth={true} dataSource={this.props.dataSource} onUpdateInput={this.handleOnAutoCompleteChange} />
                <IconMenu iconButtonElement={
                    <IconButton>
                        <NavigationExpandMoreIcon />
                    </IconButton>
                }>
                    <MenuItem primaryText="등록" onTouchTap={() => this.handleEnrollmentToggle(true)} />
                </IconMenu>
                <Dialog title="회원 등록" actions={actions} modal={true} open={this.state.tapped} onRequestClose={this.handleEnrollmentClose}>
                    <TextField onChange={this.handleOnTextFieldChanged} value={this.state.member.name} type="text" hintText="Name" id="Name" /><br />
                    <TextField onChange={this.handleOnTextFieldChanged} value={this.state.member.phone} type="tel" hintText="Phone" id="Phone" /><br />
                    <TextField onChange={this.handleOnTextFieldChanged} value={this.state.member.age} type="number" hintText="Age" id="Age" /><br />
                    <TextField onChange={this.handleOnTextFieldChanged} value={this.state.member.email} type="email"hintText="Email" id="Email" />
                </Dialog>
            </Toolbar>
        );
    }

    handleOnTextFieldChanged(event) {
        switch (event.target.id) {
            case "Name":
                this.setState({
                    member: update(this.state.member, {
                        name: { $set: event.target.value }
                    })
                });
                break;
            case "Phone":
                this.setState({
                    member: update(this.state.member, {
                        phone: { $set: event.target.value }
                    })
                });
                break;
            case "Age":
                this.setState({
                    member: update(this.state.member, {
                        age: { $set: event.target.value }
                    })
                });
                break;
            case "Email":
                this.setState({
                    member: update(this.state.member, {
                        email: { $set: event.target.value }
                    })
                });
                break;
            default:
                break;
        }
    }

    handleEnrollmentToggle(toggle) {
        this.setState({ tapped: toggle });
        if (!toggle) {
            this.setState({
                tapped: false,
                member: {
                    name: '',
                    age: 0,
                    phone: '',
                    brithday: '',
                }
            });
            this.props.handleProduce(this.state.member);
        }
    }

    handleOnAutoCompleteChange(value) {
        this.props.handleSearchMember(value);
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {
        title: state.title.title,
        dataSource: [state.members.search],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleProduce: (member) => dispatch(action.produce(member)),
        handleSearchMember: (member) => dispatch(action.searchMember(member)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
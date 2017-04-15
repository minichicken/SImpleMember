import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';

function MemberItem(props) {
    return (
        <Card>
            <CardHeader
                title={props.content.name}
                subtitle={props.content.age + "g"}
            />
            <CardText>
                {props.content.phone}<br />
                {props.content.email}
            </CardText>
            <CardActions>
                <FlatButton label="삭제" onClick={() => props.delete(props.id)} />
            </CardActions>
        </Card>
    );
};

MemberItem.propTypes = {
    content: PropTypes.object.isRequired,
    //update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
}

MemberItem.defaultProps = {
    id: -1,
    content: {},
    delete: () => console.error('delete is undefined'),
}

export default MemberItem;
import React from 'react';

const Permit = (props) => {
    const yes_session = sessionStorage.getItem('token');

    if(yes_session){
        return <React.Fragment>{props.children}</React.Fragment>
    }

    return null;
}

export default Permit;
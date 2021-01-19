import React, {Component} from "react";
import LetterAvatars from "./avatar";
import ContainedButtons from "./button";
import Typography from '@material-ui/core/Typography';

class Profile extends Component {
    render() {
        return (
            <React.Fragment>
                <LetterAvatars/>
                <Typography variant="body1" gutterBottom style={{paddingLeft: "10%"}}>
                    User Name
                </Typography>
                <ContainedButtons/>
            </React.Fragment>
        )
    }
}


export default Profile
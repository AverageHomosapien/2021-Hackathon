import React, {Component} from "react";
import LetterAvatars from "./avatar";
import ContainedButtons from "./button";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

class Profile extends Component {


    render() {
        return (
            <React.Fragment>
                <Grid
                    style={{ paddingTop: '2%', justifyItems: 'center' }}
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                >
                    <Grid item>
                        {/* <LetterAvatars />
                        <Typography variant="body1" gutterBottom style={{ paddingLeft: "10%" }}>
                            User Name
                        </Typography>
                        <ContainedButtons /> */}
                    </Grid>

                    <Grid item>
                        2
                    </Grid>
                    <Grid item>
                        3
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}


export default Profile
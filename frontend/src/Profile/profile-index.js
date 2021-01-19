import React, {Component} from "react";
import LetterAvatars from "./avatar";
import ContainedButtons from "./button";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

class Profile extends Component {

    render() {
        return (
            <React.Fragment>
                <Grid
                    style={{ paddingTop: '2%', justifyItems: 'center' }}
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="stretch"
                >
                    <Grid item>
                         <LetterAvatars />
                        <Typography variant="body1" gutterBottom style={{ paddingLeft: "1%" }}>
                            Jamie Lannister
                        </Typography>
                        <ContainedButtons /> 
                    </Grid>

                    <Grid item>
                        <TextField
                            id="filled-read-only-input"
                            label="Bio"
                            multiline
                            rows={20}
                            defaultValue='"There are no men like me. Only me."
                            ―Jaime Lannister to Catelyn Stark 
                            Ser Jaime Lannister was the elder son of Lord Tywin Lannister, younger twin brother of Queen Cersei Lannister, and older brother of Tyrion Lannister. He was involved in an incestuous relationship with Cersei, and unknown to most, he was the biological father of her three bastard children, Joffrey, Myrcella, and Tommen, as well as her unborn child.'
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <LetterAvatars />
                            <Typography variant="body1" gutterBottom style={{ paddingLeft: "1%" }}>
                                User Name
                            </Typography>
                            <ContainedButtons /> 
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}


export default Profile
import React, {Component} from "react";
import ContainedButtons from "./button";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LetterAvatars from "./avatar";
import CustomizedSwitches from "./switch";
import ChipsArray from "./chip";
import Paper from '@material-ui/core/Paper';

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
                    <Grid container item xs={1} style={{paddingTop: '1%'}} >
                        <LetterAvatars/>
                        <Typography variant="body1" gutterBottom style={{ paddingLeft: "1%" }} style ={{paddingTop: "40%"}} >
                            Jamie Lannister
                        </Typography>
                        <Divider/> 
                        <ContainedButtons/> 
                        <CustomizedSwitches/>
                    </Grid>

                    <Grid container item xs={3}>
                        <TextField
                            id="filled-read-only-input"
                            label="Bio"
                            multiline
                            style={{width: "500px"}}
                            defaultValue='"There are no men like me. Only me."
                            ―Jaime Lannister to Catelyn Stark 
                            Ser Jaime Lannister was the elder son of Lord Tywin Lannister, younger twin brother of Queen Cersei Lannister, and older brother of Tyrion Lannister. He was involved in an incestuous relationship with Cersei, and unknown to most, he was the biological father of her three bastard children, Joffrey, Myrcella, and Tommen, as well as her unborn child.'
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        <ChipsArray/>
                    </Grid>
                    <Grid container item xs={2}>
                        <List >
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Cersei Lannister" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Cersei Lannister"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Melisandrei" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Melisandrei"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Harvey Roxie" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Harvey Roxie"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Ferrara Clifford" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Ferrara Clifford"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Daenerys Targaryen" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Daenerys Targaryen"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Arya Stark" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Arya Stark"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Khal Drogo" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Khal Drogo"
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                            <Avatar alt="Jon Snow" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Jon Snow"
                            />
                        </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Profile

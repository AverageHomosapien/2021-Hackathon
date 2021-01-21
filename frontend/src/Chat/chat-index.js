import React, {useEffect, useState} from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import axios from '../Axios'

import 'stream-chat-react/dist/css/index.css';

const initialArray = [
    {
        "id": 1,
        "username": "andrew656"
    },
];

const initialData = {
        "id": 1,
        "interest": "Aerobics",
        "topic": "Fitness",
        "url": "https://c.pxhere.com/photos/d5/8a/active_activity_aerobics_african_beautyrobic_blonde_hair_blurred_background_body-1529747.jpg!d"
}

export default function ChatUI (props) {

    const [interestData, setstate] = useState(initialData);
    const [usersData, setUsers] = useState(initialArray);

    useEffect(() => {
        function handleChange(incomingdata) {
            setstate(incomingdata);
            console.log(interestData);
        }

        axios.PYTHON_API.getInterestsID(props.match.params['id'])
            .then(response => {
                handleChange(response.data.interests[0]);
            })

    }, []);


    useEffect(() => {
        function handleChange(incomingdata) {
            setUsers(incomingdata);
            console.log(incomingdata);
        }

        axios.PYTHON_API.getUsers()
            .then(response => {
                handleChange(response.data.users);
            })

    }, []);
    

    const chatClient = new StreamChat('9unkw3x6rzdf');
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicm91bmQtZmllbGQtMCJ9.Gg-gvp8H_3ZpIk12_6bKNRFQAbwoWU9gCkCaDooLSf4';

    chatClient.setUser(
        {
            id: 'round-field-0',
            name: 'Round field',
            image: 'https://getstream.io/random_png/?id=round-field-0&name=Round+field'
        },
        userToken,
    );


    const conversation = chatClient.channel('messaging', 'channel-name', {
        name: 'Founder Chat',
        image: 'http://bit.ly/2O35mws',
        members: ['thierry', 'tommaso'],
    });


    conversation.create();

    return (
        <Chat client={chatClient} theme={'messaging dark'}>
            <Channel channel={conversation}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
};
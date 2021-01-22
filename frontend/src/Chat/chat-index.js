import React, { useEffect, useState } from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window, ChannelList, ChannelListTeam, MessageTeam } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import axios from '../Axios'

import 'stream-chat-react/dist/css/index.css';


const chatClient = new StreamChat('qk4nn7rpcn75');


const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYnJva2VuLXdhdGVyZmFsbC01In0.d1xKTlD_D0G-VsBoDBNbaLjO-2XWNA8rlTm4ru4sMHg';

chatClient.setUser(
  {
       id: 'broken-waterfall-5',
       name: 'Broken waterfall',
       image: 'https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=Broken+waterfall'
  },
  userToken,
);


const filters = { type: 'team', example: 2 };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort, );

export default function ChatUI(props) {

    return (
        <Chat client={chatClient} theme="team dark">
        <ChannelList
          sort={sort}
          filters={filters}
          options={{
            subscribe: true,
            state: true,
          }}
          List={ChannelListTeam}
          />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList Message={MessageTeam} />
            <MessageInput focus />
          </Window>
          <Thread Message={MessageTeam} />
        </Channel>
      </Chat>
    )
};
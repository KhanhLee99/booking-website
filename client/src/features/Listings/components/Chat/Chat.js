import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';
import conversationApi from '../../../../api/conversationApi';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

Chat.propTypes = {

};

function Chat(props) {
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const fetchConversation = async () => {
            await conversationApi.fetchConversation(1).then(res => {
                console.log(res);
                setConversation(res.data);
            })
        }

        fetchConversation();
    }, []);
    return (
        <div className="chat-widget_wrap not-vis-chat">
            <div className="chat-widget_header">
                <h3>Chat with  <a href="author-single.html"> Alisa Noory</a></h3>
                <div className="status st_online"><span />Online</div>
            </div>
            <Conversation
                conversation={conversation}
            />
            {/* <div className="chat-body" data-simplebar>
                <MessageUser />
                <MessageMe />
                <MessageMe />
                <MessageUser />
            </div> */}
            <div className="chat-widget_input fl-wrap">
                <textarea placeholder="Type Message" defaultValue={""} />
                <button type="submit"><i className="fal fa-paper-plane" /></button>
            </div>
        </div>
    );
}

export default Chat;

function Conversation(props) {
    const { conversation } = props;
    const fooRef = useRef(null);
    return (
        <div className="chat-body" data-simplebar>

            {conversation.map((message, index) => (
                message.isMe ?
                    <MessageMe
                        message={message}
                        key={index}
                    />
                    : <MessageUser
                        message={message}
                        key={index}
                    />
            ))}
        </div>
    );

}

function MessageMe(props) {
    const { message, avatar, name, time } = props.message;

    return (
        <div div className="chat-message chat-message_user fl-wrap" >
            {/* <div className="dashboard-message-avatar">
                <img src={avatar} alt="fjhsdgfjsgj" title='sdnfksnk' />
            </div>
            <span className="chat-message-user-name">{name}</span> */}
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <p>{message}</p>
        </div >
    );
}

function MessageUser(props) {
    const { message, avatar, name, time } = props.message;

    return (
        <div className="chat-message chat-message_guest fl-wrap">
            <div className="dashboard-message-avatar">
                <img data-tip={name} src={avatar} alt="" />
                <ReactTooltip place="right" type="dark" effect="float" />
            </div>
            {/* <span className="chat-message-user-name">{name}</span> */}
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <p>{message}</p>
        </div>
    );
}
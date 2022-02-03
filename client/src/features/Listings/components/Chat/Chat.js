import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';
import conversationApi from '../../../../api/conversationApi';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Chat.propTypes = {

// };

// const style = {
//     display: 'block'
// }

const Chat = forwardRef((props, ref) => {
    // const [conversation, setConversation] = useState([]);

    // useEffect(() => {
    //     const fetchConversation = async () => {

    //         await conversationApi.fetchConversation(1).then(res => {
    //             console.log(res);
    //             setConversation(res.data.conversation);
    //         })
    //     }

    //     fetchConversation();
    // }, []);

    const { style, conversation, sendMessage } = props;
    return (
        <div className="chat-widget_wrap not-vis-chat chat-w-host" style={style}>
            <div className="chat-widget_header">
                <h3>Chat with  <a href="author-single.html"> Alisa Noory</a></h3>
                <div className="status st_online"><span />Online</div>
            </div>
            <Conversation
                conversation={conversation}
                ref={ref}
            />
            <div className="chat-widget_input">
                <Formik
                    initialValues={{ message: '' }}
                    validationSchema={
                        Yup.object({
                            message: Yup.string().required('Required'),
                        })}
                    onSubmit={(values, { resetForm }) => {
                        sendMessage(values, resetForm);
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <textarea
                                placeholder="Type Message"
                                {...formik.getFieldProps('message')}
                            />
                            <button type="submit"><i className="fal fa-paper-plane" /></button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
})

export default Chat;

export const Conversation = forwardRef((props, ref) => {
    const { conversation } = props;
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
            <div className="chat-message chat-message_user fl-wrap" ref={ref} />
        </div>
    );

})

function MessageMe(props) {
    const { message, avatar, name, time } = props.message;

    return (
        <div div className="chat-message chat-message_user fl-wrap" >
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <br />
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
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <br />
            <p>{message}</p>
        </div>
    );
}

export function Contact(props) {
    const { } = props;
    return (
        <a className="chat-contacts-item" href="#">
            <div className="dashboard-message-avatar">
                <img src="https://i.ytimg.com/vi/JbdtBiROt58/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBX8NrsZ4oSS7cBZ1a2l-nV4zmrOA" alt="" />
            </div>
            <div className="chat-contacts-item-text">
                <h4>Mark Rose</h4>
                <span>27 Dec 2018 </span>
                <p>Vivamus lobortis vel nibh nec maximus. Donec dolor erat, rutrum ut feugiat sed, ornare vitae nunc. Donec massa nisl, bibendum id ultrices sed, accumsan sed dolor.</p>
            </div>
        </a>
    )
}
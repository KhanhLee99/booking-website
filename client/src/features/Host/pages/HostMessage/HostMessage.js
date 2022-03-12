import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './HostMessage.scss';
import conversationApi from '../../../../api/conversationApi';
import moment from 'moment';
import Loading from '../../../../components/Loading/Loading';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useWindowDimensions from '../../../../@use/useWindowDimensions';
import HeaderHost from '../../components/HeaderHost';
import { HostTab } from '../../../../app/constant';

HostMessage.propTypes = {

};

function HostMessage(props) {
    const messagesEndRef = useRef(null);

    const loggedInUser = useSelector((state) => state.userSlice.current);

    const [conversations, setConversations] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [loading, setLoading] = useState(false);

    const { height, width } = useWindowDimensions();
    const heightContent = height - 80;

    const fetchConversation = async (conversation_id) => {
        try {
            setLoading(true);
            await conversationApi.fetchConversation(conversation_id).then(res => {
                setCurrentConversationId(conversation_id);
                setConversation(res.data.conversation);
                setLoading(false);
            }).catch(err => {
                console.log(err.message);
                setLoading(false);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const sendMessage = async (values, resetForm) => {
        try {
            const params = {
                message: values.message,
                conversation_id: currentConversationId,
            }
            await conversationApi.sendMessage(params).then(res => {
                const newMessage = {
                    id: loggedInUser.id,
                    name: loggedInUser.name,
                    avatar: loggedInUser.avatar,
                    message: values.message,
                    time: Date.now(),
                    isMe: 1,
                }
                setConversation(oldState => [...oldState, newMessage]);
                resetForm();
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const fetchListConversation = async () => {
            try {
                await conversationApi.fetchListConversation().then(res => {
                    setConversations(res.data.data);
                    if (res.data.data.length > 0) {
                        setCurrentConversationId(res.data.data[0].conversation_id);
                        fetchConversation(res.data.data[0].conversation_id);
                    }
                }).catch(err => {
                    console.log(err.message);
                })
            } catch (err) {
                console.log(err);
            }
        }

        fetchListConversation();
    }, []);



    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView();
        }
        scrollToBottom();
    }, [conversation]);


    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            {loading && <Loading />}
            <HeaderHost
                currentTab={HostTab.INBOX}
            />
            <div id='inbox-wrapper' className="dashboard-list-box fl-wrap" style={{ height: heightContent, width: width, marginTop: '80px', overflowX: 'hidden' }}>
                <div className="chat-wrapper fl-wrap">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="chat-contacts fl-wrap" style={{ height: heightContent }}>
                                {conversations.map((item, index) => (
                                    <Contact
                                        key={index}
                                        lastMessage={item}
                                        fetchConversation={fetchConversation}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* chat-box*/}
                        <div className="col-sm-8 conversation-content">
                            <div className="chat-box fl-wrap" style={{ height: heightContent }}>
                                {conversation.map((message, index) => (
                                    message.isMe ?
                                        <MessageMe
                                            message={message}
                                            key={index}
                                        />
                                        : <MessageGuest
                                            message={message}
                                            key={index}
                                        />
                                ))}
                                <div className="chat-message chat-message_user fl-wrap" id='bottom-chat-box' ref={messagesEndRef} />
                            </div>

                            <div className="chat-widget_input fl-wrap">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HostMessage;

export function MessageMe(props) {
    const { message, avatar, name, time } = props.message;

    return (
        <div className="chat-message chat-message_user fl-wrap">
            {/* <div className="dashboard-message-avatar">
                <img src="https://i.ytimg.com/an_webp/lMe2Uhc5SG0/mqdefault_6s.webp?du=3000&sqp=CNXD4I8G&rs=AOn4CLBPXOcb3dCzZL5YJmZT_IMv5Cm6Sg" alt="" />
                <span className="chat-message-user-name cmun_sm">Jessie</span>
            </div> */}
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <br />
            <p>{message}</p>
        </div>
    )
}

export function MessageGuest(props) {
    const { message, avatar, name, time } = props.message;

    return (
        <div className="chat-message chat-message_guest fl-wrap">
            <div className="dashboard-message-avatar">
                <img data-tip={name} src={avatar} alt="" />
                <ReactTooltip place="left" type="dark" effect="float" />
            </div>
            <span className="massage-date">{moment(time).format('LL')}  <span>{moment(time).format('LT').replace(':', '.')}</span></span>
            <br />
            <p>{message}</p>
        </div>
    )
}

export function Contact(props) {
    const { lastMessage, fetchConversation } = props;

    const handleClickConversation = (e, conversation_id) => {
        e.preventDefault();
        fetchConversation(conversation_id);
    }
    return (
        <a className="chat-contacts-item" href="#" onClick={(e) => { handleClickConversation(e, lastMessage.conversation_id) }}>
            <div className="dashboard-message-avatar">
                <img src={lastMessage.receiver.avatar} alt="" />
                {lastMessage.is_read == 0 && <div className="message-counter">1</div>}
            </div>
            <div className="chat-contacts-item-text">
                <h4>{lastMessage.receiver.name}</h4>
                <p>{lastMessage.message}</p>
                <span>{moment(lastMessage.time).format('ll')} </span>
            </div>
        </a>
    )
}


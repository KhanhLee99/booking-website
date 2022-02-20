import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './UserMessage.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import conversationApi from '../../../../api/conversationApi';
import { Contact, MessageGuest, MessageMe } from '../../../Host/pages/HostMessage/HostMessage';
import Loading from '../../../../components/Loading/Loading';
import useWindowDimensions from '../../../../@use/useWindowDimensions';
import CommonUserProfile from '../../../../components/CommonUserProfile/CommonUserProfile';
import { UserProfileTab } from '../../../../app/constant';


UserMessage.propTypes = {

};

function UserMessage(props) {
    const messagesEndRef = useRef(null);

    const loggedInUser = useSelector((state) => state.userSlice.current);

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

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
                // setConversation(conversation.push(newMessage));
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
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView();
        }
        scrollToBottom();
    }, [conversation]);

    const { height, width } = useWindowDimensions();

    return (
        <CommonUserProfile
            currentTab={UserProfileTab.MESSAGE}
        >
            {loading && <Loading />}
            <h3 className='h3_title'>Messages</h3>
            <div id='inbox-wrapper' className="dashboard-list-box fl-wrap" style={{ height: height * 80 / 100, overflowX: 'hidden', border: '1px solid #e5e7f2' }}>
                <div className="chat-wrapper fl-wrap">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="chat-contacts fl-wrap">
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
                            <div className="chat-box fl-wrap" style={{ height: height * 80 / 100 }}>
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
                                <div className="chat-message chat-message_user fl-wrap" ref={messagesEndRef} />
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
        </CommonUserProfile>
    );
}

export default UserMessage;
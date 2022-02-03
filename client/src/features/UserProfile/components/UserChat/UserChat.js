import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UserChat.scss';
import { Contact, Conversation } from '../../../Listings/components/Chat/Chat';
import { Formik } from 'formik';
import * as Yup from 'yup';
import conversationApi from '../../../../api/conversationApi';

UserChat.propTypes = {

};

function UserChat(props) {
    const [conversation, setConversation] = useState([]);

    const fetchConversation = async (conversation_id) => {
        try {
            // setLoading(true);
            await conversationApi.fetchConversation(conversation_id).then(res => {
                // setCurrentConversationId(conversation_id);
                setConversation(res.data.conversation);
                // setLoading(false);
            }).catch(err => {
                console.log(err.message);
                // setLoading(false);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConversation(1);
    }, [])

    return (
        <div className='chat-box'>
            <div className="chat-widget_wrap not-vis-chat" style={{ display: 'block' }}>
                <div className="chat-widget_header">
                    <h3>Chat with  <a href="author-single.html"> Alisa Noory</a></h3>
                    <div className="status st_online"><span />Online</div>
                </div>
                <Conversation
                    conversation={conversation}
                />
                <div className="chat-widget_input">
                    <Formik
                        initialValues={{ message: '' }}
                        validationSchema={
                            Yup.object({
                                message: Yup.string().required('Required'),
                            })}
                        onSubmit={(values, { resetForm }) => {
                            // sendMessage(values, resetForm);
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

            <div className='list-contact'>
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
    );
}

export default UserChat;
import React, { useState, useContext } from 'react'

import useLocalStorage from '../Storage/useLocalStorage';
import { useContacts } from "./ContactsContext";

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext)
}

// Conversations Context Provider
export function ConversationsProvider({ children, id }) {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [ selectedConversationIndex, setSelectedConversationIndex ] = useState(0);
    const { contacts } = useContacts();

    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, message: []}]
        })
    }

    function addMessageToConversation({ recipients, text, sender }){
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = {sender, text};
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)){
                    // Array Equality Login for Attributes Equal from 'conversations.recipients
                    // to 'recipients' which is the current one
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [ ...conversation.message, newMessage ]
                    }
                }
            })
            if(madeChange === true){
                // Returning the Main Goal
                return newConversations;
            }
             else{
                return[
                    ...prevConversations,
                    { recipients, messages: [ newMessage ] }
                ]
            }
        })
    }

    function sendMessage(recipients, text){
        addMessageToConversation({ recipients, text, sender: id});
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            })
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        })
        const selected = index === selectedConversationIndex;
        return {...conversation, recipients, selected};
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        send: sendMessage,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}

function arrayEquality(a, b){
    if(a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    })
}

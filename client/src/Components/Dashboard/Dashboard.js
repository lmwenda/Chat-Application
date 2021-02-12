import React from 'react'

import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';

import { useConversations } from '../Context/ConversationsContext';

function Dashboard({ data }) {
    const { selectedConversation } = useConversations()
    console.log(selectedConversation);

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={data} />
            { selectedConversation && <OpenConversation /> }
        </div>
    )
}

export default Dashboard;
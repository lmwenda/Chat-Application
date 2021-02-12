import React from "react";

// Components
import useLocalStorage from "./Components/Storage/useLocalStorage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";

// Contexts
import { IdProvider } from "./Components/Context/IdContext";
import { ContactsProvider } from "./Components/Context/ContactsContext";
import {ConversationsProvider} from "./Components/Context/ConversationsContext";

function App() {
    const [ id, setId ] = useLocalStorage('id');

    return (
        <ContactsProvider>
            <ConversationsProvider id={id}>
                <IdProvider>
                    {id ? <Dashboard data={id} /> : <Login onIdSubmit={setId} render={id} />}
                </IdProvider>
            </ConversationsProvider>
        </ContactsProvider>
    );
}

export default App;
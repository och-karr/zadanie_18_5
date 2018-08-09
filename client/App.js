import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages: [], text: '', name: ''};
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message)); //nasluchiwanie na message
        socket.on('update', ({users}) => this.chatUpdate(users)); //nasluchiwanie na update
    }

    messageReceive(message) {//odbieranie wiad. i aktualizacja stanu wiad.
        const messages = [message, ...this.state.messages];
        this.setState({messages}); //aktualizaca stanu i wywolanie render
        //ES6: {messages} zamiast {messages: messages}
    }

    chatUpdate(users) { //aktualizacja stanu uzytkownikow
        this.setState({users});
    }
    
    handleMessageSubmit(message) { //wysylanie wiadomosci do serwera
        const messages = [message, ...this.state.messages];
        this.setState({messages}); //aktualizacja biezacego stanu aplikacji
        socket.emit('message', message); //emitujemy wyslana wiadomosc, by wyswietlila sie reszcie uzytkownikow
    }

    handleUserSubmit(name) { //tworzenie nowego uzytkownika
        this.setState({name});
        socket.emit('join', name); //wyslanie informacji do reszty ze dolaczylismy
    }

    render() {
        return this.state.name !== '' ? (
            this.renderLayout()
        ) : this.renderUserForm()
    }
    
    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <div className={styles.UsersList}>
                        <UsersList
                            users={this.state.users} //dane nt. uzytkownikow
                        />
                    </div>
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages} //props - lista wiadomosci
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name} //nazwa uzytkownika ktory wysyla wiadomosc
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (
            <UserForm onUserSubmit={ //potwierdzenie wejścia użytkownika do czatu.
                name => this.handleUserSubmit(name)
            } />
        )
    }
};

export default hot(module)(App);

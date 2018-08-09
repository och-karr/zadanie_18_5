import React, {Component} from 'react';
import styles from './UserForm.css';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''}; //wlasny stan, nie ten co w App
    }

    handleSubmit(e) { //zatwierdza formularz modyfikując tym samym stan w komponencie App
        e.preventDefault(); //zapobiegamy domyslnemu zachowaniu
        this.props.onUserSubmit(this.state.name);
    }

    handleChange(e) { //modyfikowanie inputa przez uzytkownika
        this.setState({ name : e.target.value });
    }

    render() {
        return(
            <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
            <p>Welcome to our chat.</p>
                <input
                    className={styles.UserInput}
                    placeholder='Write your nickname and press enter'
                    onChange={e => this.handleChange(e)}
                    value={this.state.name}
                />
            </form>
        );
    }
}

export default UserForm;
import React, { Component } from 'react';
import './App.css';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <p>This app was created for you, making budgeting easy.</p>
                <address>
                    Contact me at <a href="mailto:bradlw12@uw.edu">bradlw12@uw</a>
                </address>
                <p>&copy; 2020 Bradley and Maxwell.</p>
            </footer>
        )
    }
}
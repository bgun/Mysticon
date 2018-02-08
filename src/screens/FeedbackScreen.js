'use strict';

import React, { Component } from 'react';
import Mailgun from 'mailgun-js';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import globalStyles from '../globalStyles';

import GuestItem from '../components/GuestItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class FeedbackScreen extends Component {

  constructor() {
    super();
    this.state = {
      text: null
    }
  }

  handleInput(text) {
    this.state.text = text;
  }

  handlePress() {

    let api_key = 'pubkey-05f2a1e4fd4bed1ea7772703a9a7ed96';
    let domain = 'con-nexus.bgun.me';
    let mailgun = Mailgun({apiKey: api_key, domain: domain});
    
    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'ben@bengundersen.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!'
    };
    
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
    return;

    let MAILGUN_API_KEY = "pubkey-05f2a1e4fd4bed1ea7772703a9a7ed96";
    // let url = 'http://con-nexus.bgun.me/api/feedback';
    let url = "https://api.mailgun.net/v3/con-nexus.bgun.me/messages";
    if (!this.state.text) {
      global.makeToast("You haven't entered any text yet!");
      return;
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode("api:" +MAILGUN_API_KEY)
      },
      body: JSON.stringify({
        from: "ben@con-nexus.bgun.me",
        to: "ben@bengundersen.com",
        subject: this.props.subject,
        text: this.state.text
      })
    }).then(resp => {
      console.log(resp);
      global.makeToast("Feedback submitted. Thank you!");
    }).catch(e => {
      console.log("email error", e);
      global.makeToast("Error submitting feedback");
    });
  }

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H2>Feedback for { this.props.subject }</H2>
        <Text style={{ fontSize: 14, paddingVertical: 10 }}>
          Please enter your comments below. The feedback is anonymous. If you would like
          to be contacted with regard to your comment or question, please add contact details below.
          Thanks, we appreciate any and all feedback!
        </Text>
        <H4>How was { this.props.subject }?</H4>
        <View style={ styles.inputContainer }>
          <TextInput
            multiline={ true }
            placeholder="Type your feedback here."
            onChangeText={ this.handleInput.bind(this) }
            style={ styles.input }
            value={ this.state.text }
          />
        </View>
        <TouchableOpacity onPress={ () => this.handlePress() } style={ styles.button }>
          <Text style={ styles.buttonText }>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    height: 200,
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#48D',
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: 'white'
  }
});

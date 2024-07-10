import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
import axios from 'axios';
import uuid from 'react-native-uuid'; // Import uuid function from react-native-uuid

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
/*

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const handleSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const messageText = newMessages[0].text;
    const sessionId = uuid.v4(); // Generate a unique session ID using react-native-uuid

    setLoading(true);
    try {
      const response = await axios.post(
        `https://dialogflow.googleapis.com/v2/projects/mythical-rope-428905-v1/agent/sessions/${sessionId}:detectIntent`,
        {
          queryInput: {
            text: {
              text: messageText,
              languageCode: 'en',
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer d45d19d0546e5c755ce8d074d5cc2a28cfad728b`, // Replace with your actual access token
          },
        }
      );

      const botMessage = response.data.queryResult.fulfillmentText;

      if (botMessage) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: Math.random().toString(),
            text: botMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
              avatar: 'https://placeimg.com/140/140/any',
            },
          })
        );
      }
    } catch (error) {
      console.error('Error sending message to Dialogflow:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Custom renderAvatar function to handle avatar prop with default parameters
  const renderAvatar = (props) => (
    <Avatar
      {...props}
      imageStyle={{
        left: { backgroundColor: 'grey' },
        right: { backgroundColor: 'grey' },
      }}
    />
  );
*/
  return (
    <View style={styles.container}>
    {/*  <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: 1,
        }}
        renderAvatar={renderAvatar} // Use custom renderAvatar function
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}*/}
    </View>
  );
};

const styles = StyleSheet.create({
 /* container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },*/
});

export default ChatBot;

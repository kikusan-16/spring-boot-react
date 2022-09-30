/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WebSocketSample = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client>();
  const [greetings, setGreetings] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);

  const connect = () => {
    const socket = new SockJS('/gs-guide-websocket');
    const client = Stomp.over(socket);
    client.connect({}, (frame: any) => {
      console.log(frame);
      client.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
      });
    });
    setStompClient(client);
    setConnected(true);
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        setConnected(false);
      });
    }
    setGreetings([]);
  };

  const showGreeting = (message: string) => {
    setGreetings((state: string[]) => {
      console.log(state);
      const tmp = state.slice();
      tmp.push(message);
      return tmp;
    });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const sendName = () => {
    console.log(greetings);
    stompClient?.send('/app/hello', {}, JSON.stringify({ name }));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>
              <button id="connect" className="btn btn-default" type="submit" disabled={connected} onClick={connect}>Connect</button>
              <button id="disconnect" className="btn btn-default" type="submit" disabled={!connected} onClick={disconnect}>Disconnect
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="name">What is your name?</label>
              <input type="text" id="name" className="form-control" placeholder="Your name here..." onChange={handleName} />
            </div>
            <input id="send" className="btn btn-default" type="button" value="Send" onClick={sendName} />
          </form>
        </div>
      </div>
      { connected &&
        <div className="row">
          <div className="col-md-12">
            <table id="conversation" className="table table-striped">
              <thead>
                <tr>
                    <th>Greetings</th>
                </tr>
              </thead>
              <tbody id="greetings">
                {greetings.map((message) => <tr key={message}><td>{message}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

export default WebSocketSample;

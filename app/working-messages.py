from flask import Flask, render_template, redirect, url_for, abort, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

messages = []
@app.route('/', methods=['GET', 'POST'])
def sessions():
    for idx, message in enumerate(messages):
        print("MESSAGE {} is from {}, message {}".format(idx, message[0], message[1]))
    if request.method == 'POST':
        print("username is {} and message is {}".format(request.form['username'], request.form['message']))
        messages.append((request.form['username'], request.form['message']))
    return render_template('_message_example.html', messages=messages)

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')

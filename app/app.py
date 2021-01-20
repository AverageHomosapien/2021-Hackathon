from flask import Flask, redirect, url_for, abort, request, render_template, flash, jsonify, make_response
from datetime import datetime
from pathlib import Path
import os
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, ForeignKey, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from flask_socketio import SocketIO

#### App Init ####
app = Flask(__name__)
app.config.from_object('config.TestConfig')
socketio = SocketIO(app)

#### Database Init ####
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
Base = declarative_base()
Base.metadata.create_all(engine)
DBsession = sessionmaker(bind=engine)
session = DBsession()


# Can't search on ID
#### Databases - SQLAlchemy ####
# Users DB
class Users(Base):
    """ Holds user details """
    __tablename__ = "Users"
    ID = Column(Integer, primary_key=True, unique=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(80), nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def serialize(self):
        return {
            'id': self.ID,
            'username': self.username
        }


# Interests DB
class Interests(Base):
    """ Holds interests """
    __tablename__ = "Interests"
    ID = Column(Integer, primary_key=True, nullable=False)
    interest = Column(String(80), unique=True, nullable=False)
    topic = Column(String(80), nullable=False)

    def __init__(self, interest, topic):
        self.interest = interest
        self.topic = topic

    def __repr__(self):
        return '<Interest {}>'.format(self.interest)

    def serialize(self):
        return {
            'id': self.ID,
            'interest': self.interest,
            'topic': self.topic
        }


# User Interests DB
class UserInterests(Base):
    """ Holds users' interests """
    __tablename__ = "UserInterests"
    ID = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(80), primary_key=True)
    interest = Column(String(80))
    """
    username = db.Column(db.String(80), primary_key=True, ForeignKey(users.username))
    interest_name = db.Column(db.String(80), ForeignKey(interests.interest_name))
    user_n = db.relationship('User', foreign_keys='UserInterest.username')
    interest_n = db.relationship('Interest', foreign_keys='UserInterest.interest_name')
    """

    def __init__(self, username, interest):
        self.username = username
        self.interest = interest

    def __repr__(self):
        return '<User {} with interest {}>'.format(self.username, self.interest)

    def serialize(self):
        return {
            'id': self.ID,
            'username': self.username,
            'interest': self.interest
        }

# Messages DB
class Messages(Base):
    """ Holds users' messages"""
    __tablename__ = "Messages"
    ID = Column(Integer, primary_key=True)
    username = Column(String(80), nullable=False)
    interest = Column(String(80), nullable=False)
    content = Column(Text, nullable=False)
    posted = Column(Text, nullable=False)

    def __init__(self, username, interest, content, posted=datetime.utcnow()):
        self.username = username
        self.interest = interest
        self.content = content
        self.posted = posted

    def __repr__(self):
        return '<User: {}, Post {}>'.format(self.username, self.content)

    def serialize(self):
        return {
            'id': self.ID,
            'username': self.username,
            'interest': self.interest,
            'content': self.content,
            'posted': self.posted
        }

# Chats DB
class Chats(Base):
    """ Holds chat details """
    __tablename__ = "Chats"
    ID = Column(Integer, primary_key=True, unique=True)
    interest = Column(String(80), unique=True, nullable=False)
    topic = Column(String(80), nullable=False)
    participants = Column(String(80), nullable=False)

    def __init__(self, interest, topic, participants):
        self.interest = interest
        self.topic = topic
        self.participants = participants

    def __repr__(self):
        return '<Chat {}, Topic {}, Participants {}>'.format(self.interest, self.topic, self.participants)

    def serialize(self):
        return {
            'id': self.id,
            'interest': self.interest,
            'topic': self.topic,
            'participants': self.participants
        }


### Restful API ###


#?arg=value&new_arg=new_value -- ARGUMENTS
# for v in dict.values(): -- DICTIONARY VALUES
# OR dict.get('interest')

"""
#if request.method == 'POST':
username = request.args.get('username')
interest = request.args.get('interest')
content = request.args.get('content')
msg = Messages(username, interest, content)
#db.session.add(msg)
#db.session.commit()
return jsonify(request.args)"""

# request.args.to_dict()
# request.get()
## https://blog.softhints.com/python-get-first-elements-dictionary/ getting number of dictionary elems

# https://tedboy.github.io/flask/generated/generated/werkzeug.ImmutableMultiDict.html immdict functions
@app.route('/messages', methods=['GET'])
def get_messages():
    messages = []
    if len(request.args.to_dict()) == 0:
        messages = session.query(Messages).all()
    else:
        if request.args.get('id') != None:
            id = request.args.get('id')
            messages = session.query(Messages).filter_by(id = id)#.one()?
        elif request.args.get('username') != None:
            username = request.args.get('username')
            messages = session.query(Messages).filter_by(username = username)#.one()?
        elif request.args.get('interest') != None:
            interest = request.args.get('interest')
            messages = session.query(Messages).filter_by(interest = interest)#.one()?
        elif request.args.get('content') != None:
            content = request.args.get('content')
            messages = session.query(Messages).filter_by(content = content)#.one()?
        elif request.args.get('posted') != None:
            posted = request.args.get('posted')
            messages = session.query(Messages).filter_by(posted = posted)#.one()? # filter on messages
        #return jsonify(request.args.to_dict())
    session.close()
    return jsonify(messages = [m.serialize() for m in messages])

@app.route('/interests', methods=['GET'])
def get_interests():
    interests = []
    if len(request.args.to_dict()) == 0:
        interests = session.query(Interests).all()
    else:
        if request.args.get('id') != None:
            id = request.args.get('id')
            interests = session.query(Interests).filter_by(id = id)#.one()?
        elif request.args.get('interest') != None:
            interest = request.args.get('interest')
            interests = session.query(Interests).filter_by(interest = interest)#.one()?
    session.close()
    return jsonify(interests = [i.serialize() for i in interests])

@app.route('/users', methods=['GET'])
def get_users():
    users = []
    if len(request.args.to_dict()) == 0:
        users = session.query(Users).all()
    else:
        if request.args.get('id') != None:
            id = request.args.get('id')
            users = session.query(Users).filter_by(id = id)#.one()?
        elif request.args.get('username') != None:
            username = request.args.get('username')
            users = session.query(Users).filter_by(username = username)#.one()?
    session.close()
    return jsonify(users= [i.serialize() for i in users])

@app.route('/user-interests', methods=['GET'])
def get_user_interests():
    userinterests = []
    if len(request.args.to_dict()) == 0:
        userinterests = session.query(UserInterests).all()
    else:
        if request.args.get('username') != None:
            username = request.args.get('username')
            userinterests = session.query(UserInterests).filter_by(username = username)#.one()?
        elif request.args.get('interest') != None:
            interest = request.args.get('interest')
            userinterests = session.query(UserInterests).filter_by(interest = interest)#.one()?
    session.close()
    return jsonify(userinterests = [ui.serialize() for ui in userinterests])

@app.route('/chats', methods=['GET'])
def get_chats():
    chats = []
    if len(request.args.to_dict()) == 0:
        chats = session.query(Chats).all()
    else:
        if request.args.get('id') != None:
            id = request.args.get('id')
            chats = session.query(Chats).filter_by(id = id)#.one()?
        elif request.args.get('interest') != None:
            interest = request.args.get('interest')
            chats = session.query(Chats).filter_by(interest = interest)#.one()?
        elif request.args.get('topic') != None:
            topic = request.args.get('topic')
            chats = session.query(Chats).filter_by(topic = topic)#.one()?
        elif request.args.get('participants') != None:
            participants = request.args.get('participants')
            chats = session.query(Chats).filter_by(participants = participants)#.one()?
    session.close()
    return jsonify(chats = [c.serialize() for c in chats])



#### WEB SOCKET CHAT SERVER ####
messages = []
@app.route('/chatserver', methods=['GET', 'POST'])
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




#### MIDDLEWARE #####
@app.after_request
def after_request(response):
        origin = request.headers.get('Origin')
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.headers.add(
                'Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add(
                'Access-Control-Allow-Headers', 'x-csrf-token')
            response.headers.add('Access-Control-Allow-Methods',
                                 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)
        else:
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)

        return response




if __name__ == "__main__":
    # app.run(host='0.0.0.0', debug=True)
    socketio.run(app, host='0.0.0.0', port="5000")

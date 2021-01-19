from flask import Flask, redirect, url_for, abort, request, render_template, flash, jsonify
from datetime import datetime
from pathlib import Path
import os
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, ForeignKey, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

#### App Init ####
app = Flask(__name__)
app.config.from_object('config.TestConfig')

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
Base = declarative_base()
Base.metadata.create_all(engine)
DBsession = sessionmaker(bind=engine)
session = DBsession()


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
            'username': self.username,
        }


# Interests DB
class Interests(Base):
    """ Holds interests """
    __tablename__ = "Interests"
    ID = Column(Integer, primary_key=True)
    interest = Column(String(80), unique=True)

    def __init__(self, interest):
        self.interest = interest

    def __repr__(self):
        return '<Interest {}>'.format(self.interest)

    def serialize(self):
        return {
            'interest': self.interest
        }


# User Interests DB
class UserInterests(Base):
    """ Holds users' interests """
    __tablename__ = "UserInterests"
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
            'username': self.username,
            'interest': self.interest
        }


class Messages(Base):
    """ Holds users' messages"""
    __tablename__ = "Messages"
    id = Column(Integer, primary_key=True)
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
            'username': self.username,
            'interest': self.interest,
            'content': self.interest,
            'posted': self.posted
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


@app.route('/messages', methods=['GET'])
def get_messages():
    messages = session.query(Messages).all()
    session.close()
    return jsonify(messages = [m.serialize() for m in messages])

@app.route('/interests', methods=['GET'])
def get_interests():
    interests = session.query(Interests).all()
    session.close()
    return jsonify(interests = [i.serialize() for i in interests])

@app.route('/users', methods=['GET'])
def get_users():
    users = session.query(Users).all()
    session.close()
    return jsonify(users= [i.serialize() for i in users])

@app.route('/user-interests', methods=['GET'])
def get_user_interests():
    userinterests = session.query(UserInterests).all()
    session.close()
    return jsonify(userinterests = [ui.serialize() for ui in userinterests])


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

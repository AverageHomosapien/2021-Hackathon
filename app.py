from flask import Flask, redirect, url_for, abort, request, render_template, flash, jsonify
from datetime import datetime
from pathlib import Path
import os
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, sessionmaker
#from flask_login import current_user, login_required, login_user, logout_user
#from app.forms import RegistrationForm, LoginForm


#### App Init ####
app = Flask(__name__)
app.config.from_object('config.TestConfig')
db = SQLAlchemy(app)

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
DBsession = sessionmaker(bind=engine)
session = DBsession()


#### Databases - SQLAlchemy ####
# Users DB
class Users(db.Model):
    """ Holds user details """
    #__tablename__ = "Users"
    ID = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

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
class Interests(db.Model):
    """ Holds interests """
    #__tablename__ == "Interests"
    ID = db.Column(db.Integer, primary_key=True)
    interest = db.Column(db.String(80), unique=True)

    def __init__(self, interest):
        self.interest = interest

    def __repr__(self):
        return '<Interest {}>'.format(self.interest)

    def serialize(self):
        return {
            'interest': self.interest
        }


# User Interests DB
class UserInterests(db.Model):
    """ Holds users' interests """
    #__tablename__ == "UserInterests"
    username = db.Column(db.String(80), primary_key=True)
    interest = db.Column(db.String(80))
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


class Messages(db.Model):
    """ Holds users' messages"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    interest = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    posted = db.Column(db.Text, nullable=False)

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

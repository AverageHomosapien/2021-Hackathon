from datetime import datetime
#from flask_login import UserMixin
from app import db, login
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship


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

    #@login.user_loader
    #def load_user(id):
    #    return User.query.get(int(id))


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

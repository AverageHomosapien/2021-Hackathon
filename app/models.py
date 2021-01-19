from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import UserMixin
import flask
from app import database, login

# Users DB
class User(UserMixin, db.Model):
    __tablename__ = "users"
    userID = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    def __repr__(self):
        return '<User {} - with ID {}>'.format(self.username)

    # hashes the password and saves to user
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # checks the password to see if it's valid or not
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))


# Interests DB
class Interest(db.Model):
    __tablename__ == "interests"
    interestID = db.Column(db.Integer, primary_key=True)
    interest_name = db.Column(db.String(80), unique=True)

    def __init__(self, interest):
        self.interest_name = interest

    def __repr__(self):
        return '<Interest {}>'.format(self.interest_name)


# User Interests DB
class UserInterest(db.Model):
    __tablename__ == "user_interests"
    username = db.Column(db.String(80), primary_key=True, db.ForeignKey('users.username'))
    interest_name = db.Column(db.String(80), db.ForeignKey('interests.interest_name'))

    def __init__(self, username, interest):
        self.username = username
        self.interest_name = interest

    def __repr__(self):
        return '<User {} with interest {}>'.format(self.username, self.interest_name)

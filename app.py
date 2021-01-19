from flask import Flask, redirect, url_for, abort, request, render_template, flash, jsonify
from app.models import Users, Interests, UserInterests, Messages
from datetime import datetime
from pathlib import Path
import os
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, sessionmaker

#from flask_login import current_user, login_required, login_user, logout_user
#from app.forms import RegistrationForm, LoginForm

app = Flask(__name__)
app.config.from_object('config.TestConfig')
db = SQLAlchemy(app)

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
DBsession = sessionmaker(bind=engine)
session = DBsession()

#?arg=value&new_arg=new_value

# for v in dict.values():
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

# Homepage
@app.route('/messages', methods=['GET'])
def get_messages():
    messages = session.query(Messages).all()
    return jsonify(messages = [m.serialize() for m in messages])

@app.route('/interests', methods=['GET'])
def get_interests():
    interests = session.query(Interests).all()
    return jsonify(interests = [i.serialize() for i in interests])

@app.route('/users', methods=['GET'])
def get_users():
    users = session.query(Users).all()
    return jsonify(users= [i.serialize() for i in users])

@app.route('/user-interests', methods=['GET'])
def get_user_interests():
    user_interests = session.query(UserInterests).all()
    return jsonify(user_interests = [ui.serialize() for ui in user_interests])


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    DEVELOPMENT = False
    APP_FOLDER = os.path.join(basedir, 'app')
    STATIC_FOLDER = os.path.join(APP_FOLDER, 'static')
    TEMPLATES_FOLDER = os.path.join(STATIC_FOLDER, 'templates')
    DATABASE_FOLDER = os.path.join(STATIC_FOLDER, 'database')
    SECRET_KEY = 'pbkdf2:sha256:5613952$vT9fkZM8$04dfa35c6476acf7e788a1b5b3c35e217c78dc04539d295f011f01f18cd2175f'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(DATABASE_FOLDER, 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_APP = "app"
    FLASK_ENV = "development"

class ProductionConfig(Config):
    pass

class TestConfig(Config):
    DEBUG = True
    DEVELOPMENT = True

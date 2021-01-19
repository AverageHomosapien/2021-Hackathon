from datetime import datetime
from flaskapp import database, app

@app.shell_context_processor
def make_shell_context():
    return {'db' : database, 'User': User, 'Interest': Interest, 'UserInterest': UserInterest}

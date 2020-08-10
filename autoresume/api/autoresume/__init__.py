import os
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from dotenv import load_dotenv

is_production = os.getenv('FLASK_ENV') == 'production'
ENV_FILE = '.env.production' if is_production else '.env'
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')
dotenv_path = os.path.join(APP_ROOT, ENV_FILE)
load_dotenv(dotenv_path)


db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if test_config is not None:
        app.config.from_mapping(test_config)

    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)
    login.init_app(app)

    from . import api
    from .token_auth.resource import auth_blueprint
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(api.api)

    from .error_handlers import InvalidData, InvalidCredentials

    @app.errorhandler(InvalidData)
    def handle_invalid_data(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(InvalidCredentials)
    def handle_invalid_credentials(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    from .models import User, Job, Accomplishment, Company
    app.config['USER_MODEL'] = User

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User,
            'Job': Job,
            'Accomplishment': Accomplishment,
            'Company': Company
        }

    @app.route('/')
    def index():
        return '<h1>Welcome to Auto Resume</h1>'

    return app

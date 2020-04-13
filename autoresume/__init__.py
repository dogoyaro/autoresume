from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

config = {'SQLALCHEMY_DATABASE_URI': 'sqlite:////tmp/test.db', 'DEBUG': True, 'TEMPLATES_AUTO_RELOAD': False,
          'SERVER_NAME': 'auto-resume-api', 'SQLALCHEMY_TRACK_MODIFICATIONS': False}

db = SQLAlchemy()
migrate = Migrate()


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(config)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)

    from . import api
    app.register_blueprint(api.api)

    from .error_handlers import InvalidData

    @app.errorhandler(InvalidData)
    def handle_invalid_data(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    from autoresume.models import User, Job, Accomplishment, Company

    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'User': User, 'Job': Job, 'Accomplishment': Accomplishment, 'Company': Company}

    @app.route('/')
    def index():
        return '<h1>Welcome to Auto Resume</h1>'

    return app

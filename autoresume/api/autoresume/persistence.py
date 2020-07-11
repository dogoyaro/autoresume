# import click
# from abc import ABC, abstractmethod
# from flask_sqlalchemy import SQLAlchemy
# from flask import current_app, g
# from flask.cli import with_appcontext
# # from autoresume import db, create_app
# #
# # app = create_app()
#
#
# class AbstractDB(ABC):
#     @abstractmethod
#     def write(self):
#         pass
#
#     @abstractmethod
#     def read(self):
#         pass
#
#
# class SQLAlchemyDB(AbstractDB):
#     def __init__(self, app_instance):
#         app_instance.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
#         app_instance.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#         self.db = SQLAlchemy(app_instance)
#         db.init_app(app_instance)
#
#     # def read(self):
#         pass
#
#     def write(self):
#         pass
#
#
# def close_db(e=None):
#     pass
#
#
# # def init_db():
# #     db.create_all()
#
#
# # @click.command('init-db')
# # @with_appcontext
# # def init_db_command():
# #     with app.app_context():
# #         init_db()
# #         click.echo('Initialized the database')
#
#
# def init_persistence(app_instance):
#     app_instance.teardown_appcontext(close_db)
#     # app_instance.cli.add_command(init_db_command)

import copy
from . import db, login
from .error_handlers import InvalidData, InvalidCredentials
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, current_user, login_user, logout_user


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    jobs = db.relationship('Job', backref='user', lazy=True)
    email = db.Column(db.String(80), nullable=False)
    password_hash = db.Column(db.String(128))

    @staticmethod
    def create_user(user):
        user = User.sanitize_user(user)
        stored_user = User.query.filter_by(email=user.get('email')).first()
        if stored_user:
            raise InvalidData('User with this email already exists')
        else:
            first_name = user.get('first_name')
            last_name = user.get('last_name')
            email = user.get('email')
            password = user.get('password')

            new_user = User(first_name=first_name,
                            last_name=last_name, email=email)
            new_user.set_password(password)

            db.session.add(new_user)
            db.session.commit()

            serialized_user = User.serialize_user(new_user)
            return serialized_user

    @staticmethod
    def logout():
        logout_user()

    @staticmethod
    def login(user_data):
        if current_user.is_authenticated:
            return {'status': 'success', 'user': User.serialize_user(current_user)}
        user = User.query.filter_by(email=user_data.get('email')).first()
        if user is None or not user.check_password(user_data.get('password')):
            raise InvalidCredentials('Incorrect credentials')
        else:
            success_message = {'status': 'success',
                               'user': User.serialize_user(user)}
            login_user(user, remember=user_data.get('remember') or False)
            return success_message

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def sanitize_user(cls, user):
        error = ''
        if 'email' not in user:
            error += 'email not provided'
        if 'first_name' not in user:
            error += 'first name is not provided'
        if 'last_name' not in user:
            error += 'last name is not provided'
        if 'password' not in user:
            error += 'password is not provided'

        if error:
            raise InvalidData(error)

        return user

    @staticmethod
    def serialize_user(user):
        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'id': user.id,
        }

    @classmethod
    def get_token_payload(cls, user):
        print('the user id', user['id'], type(user['id']))
        return {
            'id': user['id']
        }

    def set_user(self, user):
        pass

    def get_user(self, id):
        pass

    def get_users(self, filter_args):
        pass


class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    description = db.Column(db.String(256), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    accomplishments = db.relationship(
        'Accomplishment', backref='role', lazy=True)

    @classmethod
    def set_job(cls, job={}):
        job = cls.sanitize_job(job)
        job['start_date'] = datetime.fromisoformat(job['start_date'])
        job['end_date'] = datetime.fromisoformat(job['end_date'])

        company = Company.get_company(job.get('company_id'))

        if company:
            new_job = cls(**job)
            db.session.add(new_job)
            db.session.commit()
            return cls.serialize_job(new_job)
        else:
            raise InvalidData('Invalid data')

    @classmethod
    def get_jobs(cls, filter_args={}):

        jobs = [cls.serialize_job(job) for job in
                cls.query.filter_by(**filter_args).all()]
        return jobs

    @classmethod
    def serialize_job(cls, job):
        return {
            'end_date': job.end_date,
            'start_date': job.start_date,
            'description': job.description,
            'company': '/company/{}'.format(job.company_id),
        }

    @classmethod
    def sanitize_job(cls, job):
        error = ''
        if 'company_id' not in job:
            error = 'company not provided'
        if 'end_date' not in job:
            error += ' end_date not provided'
        if 'start_date' not in job:
            error = ' start date not provided'

        if error:
            raise InvalidData(error)

        return job


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    jobs = db.relationship(Job, backref='company', lazy=True)

    @classmethod
    def get_company(cls, company_id):
        return cls.query.get(company_id)

    @classmethod
    def set_company(cls, company):
        company = cls.sanitize_company(company)
        company = cls(**company)
        db.session.add(company)
        db.session.commit()

        return cls.serialize_company(company)

    @classmethod
    def serialize_company(cls, company):
        return {'name': company.name}

    @classmethod
    def sanitize_company(cls, company):
        error = ''
        if 'name' not in company:
            error += 'name not provided'
        if error:
            raise InvalidData(error)

        return company


skills = db.Table('skills', db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'), primary_key=True),
                  db.Column('accomplishment_id', db.Integer, db.ForeignKey('accomplishment.id'), primary_key=True))


class Accomplishment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=True)
    rank = db.Column(db.Integer, nullable=False, default=0)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))
    skills = db.relationship('Skill', secondary=skills, backref=db.backref('accomplishments', lazy=True),
                             lazy='subquery')

    @classmethod
    def create_accomplishment(cls, accomplishment):
        # sanitize accomplishment
        accomplishment = cls.sanitize_accomplishment(accomplishment)
        description = accomplishment.get('description')
        rank = accomplishment.get('rank')
        job_id = accomplishment.get('job_id')
        acc_skills = accomplishment.get('skills')

        job = Job.query.get(job_id)
        if not job:
            raise InvalidData('Invalid job_id provided')

        accomplishment = cls(description=description, rank=rank, job_id=job_id)
        for skill in acc_skills:
            accomplishment.add_skill(skill)

        db.session.add(accomplishment)
        db.session.commit()
        serialized_accomplishment = cls.serialize_accomplishment(
            accomplishment)
        return serialized_accomplishment
        pass

    def add_skill(self, skill_name):
        skill = Skill.query.filter_by(name=skill_name).first()
        if not skill:
            skill = Skill.create_skill({'name': skill_name})
        self.skills.append(skill)

    @classmethod
    def sanitize_accomplishment(cls, accomplishment):
        error = ''
        if 'rank' not in accomplishment:
            error += 'rank not provided'
        if 'job_id' not in accomplishment:
            error += ' job_id not provided'
        if 'skills' not in accomplishment:
            error += ' skills not provided'
        if 'description' not in accomplishment:
            error += ' description not provided'

        if error:
            raise InvalidData(error)

        return accomplishment

    @classmethod
    def serialize_accomplishment(cls, accomplishment):
        return {
            'rank': accomplishment.rank,
            'skills': [skill.name for skill in accomplishment.skills],
            'job_id': accomplishment.job_id,
            'description': accomplishment.description
        }

    @classmethod
    def get_accomplishments(cls, filter_args):
        pass

    def set_accomplishments(self, id, accomplishment):
        pass

    def get_accomplishment(self, id):
        pass


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    proficiency_level = db.Column(db.Integer, nullable=True)

    @classmethod
    def create_skill(cls, skill):
        # import pdb; pdb.set_trace()
        # print(skill)
        if 'name' not in skill:
            raise InvalidData('name is not provided')

        return cls(**skill)

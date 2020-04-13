from autoresume import db
from autoresume.error_handlers import InvalidData
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    jobs = db.relationship('Job', backref='user', lazy=True)
    password_hash = db.Column(db.String(128))

    def set_user(self, id, user):
        pass

    def get_user(self, id):
        pass

    def get_users(self, filter_args):
        pass

    # def set_password(self, password):
    #     pass
    #
    # def check_password(self, password):
    #     pass


class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    accomplishments = db.relationship('Accomplishment', backref='role', lazy=True)

    @classmethod
    def set_job(cls, job={}):
        job = cls.sanitize_job(job)
        job['start_date'] = datetime.fromisoformat(job['start_date'])
        job['end_date'] = datetime.fromisoformat(job['end_date'])

        company = Company.get_company(job.get('company_id'))
        # import pdb; pdb.set_trace()

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
            'company': '/company/{}'.format(job.id),
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

    def set_accomplishments(self, id, accomplishment):
        pass

    def get_accomplishment(self, id):
        pass

    def get_accomplishments(self, filter_args):
        pass


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    proficiency_level = db.Column(db.Integer, nullable=True)

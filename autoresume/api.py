from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from autoresume.models import Job, Accomplishment, Skill, Company, User

api = Blueprint('api/v1', __name__, url_prefix='/api/v1')


@api.route('/')
def index():
    return '<h1>Welcome to Auto Resume API </h1>'


@api.route('/jobs', methods=['POST'])
@login_required
def get_jobs():
    filter_data = request.get_json() or {}
    filter_data['user_id'] = current_user.id
    jobs = Job.get_jobs(filter_args=filter_data)
    return jsonify(jobs)


@api.route('/jobs/create', methods=['POST'])
@login_required
def create_job():
    job_data = request.get_json() or {}
    job_data['user_id'] = current_user.id
    return Job.set_job(job_data)


@api.route('/company/create', methods=['POST'])
@login_required
def create_company():
    company_data = request.get_json() or {}
    company = Company.set_company(company_data)
    return jsonify(company)


@api.route('/user/login', methods=['POST'])
def login_user():
    user_data = request.get_json() or {}
    response = User.login(user_data)
    return jsonify(response)


@api.route('/user/logout')
def logout_user():
    User.logout()
    return jsonify({'success': True})


@api.route('/user/create', methods=['POST'])
def create_user():
    user_data = request.get_json() or {}
    user = User.create_user(user_data)
    return jsonify(user)


@api.route('/accomplishment/create', method=['POST'])
def create_accomplishment():
    accomplishment_data = request.get_json() or {}
    accomplishment = Accomplishment.create_accomplishment(accomplishment_data)
    return jsonify(accomplishment)

#  @api.route('/accomplishments')
#  def get_accomplishments():
    #  accomplishments = Accomplishment.get_accomplishments()
    #  return jsonify(accomplishments)


#  @api.route('/roles')
#  def get_roles():
    #  roles = Role.get_roles()
    #  return jsonify(roles)


#  @api.route('/skills')
#  def get_skills():
    #  skills = Skill.get_skills()
    #  return jsonify(skills)

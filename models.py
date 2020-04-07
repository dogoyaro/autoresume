class User():
    id = ''
    firstname = ''
    lastname = ''
    jobs = []
    contact = {}

    def set_user(self, id, user):
        pass

    def get_user(self, id):
        pass

    def get_users(self, filter_args):
        pass


class Jobs():
    id = ''
    startdate = {}
    enddate = {}
    roles = []
    company = {}

    def set_job(self, id, job):
        pass

    def get_job(self, id):
        pass

    def get_jobs(self, filter_args):
        pass


class Roles():
    id = ''
    description = ''
    title = ''
    accomplishments = []

    def set_role(self, id, role):
        pass

    def get_role(self, id):
        pass

    def get_roles(self, filter_args):
        pass


class Accomplishments():
    description = ''
    rank = ''
    skills = []

    def set_accomplishments(self, id, accomplishment):
        pass

    def get_accomplishment(self, id):
        pass

    def get_accomplishments(self, filter_args):
        pass

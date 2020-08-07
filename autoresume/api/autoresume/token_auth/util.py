import jwt

def generate_token(payload, secret):
    token = jwt.encode(payload, secret, algorithm='HS256')
    return token

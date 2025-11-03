"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_cors import CORS
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Información requerida."}), 400

    usuario_existente = User.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"message": "Usuario ya existente."}), 400

    nuevo_usuario = User(email=email, password=password)
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario creado exitosamente."}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"message": "Informacion inválida."}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 200


@api.route('/private', methods=['GET'])
def private():
    try:
        verify_jwt_in_request()  # Verifico manualmente el token.-
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        return jsonify(user.serialize()), 200

    except Exception as e:
        print("Error JWT:", e)
        return jsonify({"message": "Token inválido o expirado."}), 401


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_serialized = [user.serialize() for user in users]
    return jsonify(users_serialized), 200

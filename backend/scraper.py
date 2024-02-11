import time
from flask import (
    Flask,
    request
    )

import requests

app = Flask(__name__)


@app.route('/character-data', methods=("GET", "POST"))
def get_character_data():
    if request.method == 'POST':
        characterid = request.json['characterid']
        page = requests.get("https://character-service.dndbeyond.com/character/v5/character/" + characterid + "/")
        # print(page.status_code)
        # print(page.text)
        return page.text
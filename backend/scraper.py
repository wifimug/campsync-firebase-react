import time
from flask import Flask

import requests

app = Flask(__name__)


@app.route('/character-data')
def get_character_data():
    page = requests.get("https://character-service.dndbeyond.com/character/v5/character/101991519/")
    print(page.status_code)
    print(page.text)
    return page.text
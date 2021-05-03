import requests
import urllib.request
import json
from bs4 import BeautifulSoup


base_url = 'https://www.mofa.go.jp/mofaj/kids/ichiran/'
# url = base_url + 'i_asia.html'
# url = base_url + 'i_chuto.html'
# url = base_url + 'i_n_america.html'
# url = base_url + 'i_latinamerica.html'
# url = base_url + 'i_europe.html'
# url = base_url + 'i_oceania.html'
url = base_url + 'i_africa.html'

soup = BeautifulSoup(requests.get(url).content, "html.parser")

details = []
keys = ['name', 'en', 'capital', 'independent',
        'language', 'area', 'population', 'currency']

for tr in soup.find_all("tr"):
    td = tr.find_all("td")
    detail = dict()
    index = 0
    for td in tr.find_all("td"):
        detail[keys[index]] = td.get_text()
        index = index + 1
    if bool(detail):
        details.append(detail)

with open("countries_ditails.json", "w") as f:
    f.write(json.dumps(details, ensure_ascii=False, indent=2))

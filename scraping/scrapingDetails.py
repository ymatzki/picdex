import requests
import urllib.request
import json
from bs4 import BeautifulSoup


base_url = 'https://www.mofa.go.jp/mofaj/kids/ichiran/'
url = base_url + 'i_asia.html'
# url = base_url + 'k_chuto.html'
# url = base_url + 'k_n_america.html'
# url = base_url + 'k_latinamerica.html'
# url = base_url + 'k_europe.html's
# url = base_url + 'k_oceania.html'
# url = base_url + 'k_africa.html'

soup = BeautifulSoup(requests.get(url).content, "html.parser")

countries = []

for tr in soup.find_all("tr"):
    tr.children
    print(tr.children)
    # for td in tr.find_all("td"):
    #     # countries.append({"name": td., "name": name.text})

    #     print(td.get_text())

with open("countries_ditails.json", "w") as f:
    f.write(str(countries))

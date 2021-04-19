import requests
import urllib.request
import json
from bs4 import BeautifulSoup


base_url = 'https://www.mofa.go.jp/mofaj/kids/kokki/'
url = base_url + 'k_asia.html'
soup = BeautifulSoup(requests.get(url).content, "html.parser")

countries = []

for element in soup.find_all("li", class_="heightLine"):
    img = element.find('img')['src'].split("/")[1]
    name = element.find('p').text
    countries.append({"images": img, "name": name})
    urllib.request.urlretrieve(base_url+"image/"+img, "images"+img)

with open("ja_countries.json", "w") as f:
    f.write(str(countries))

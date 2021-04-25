import requests
import urllib.request
import json
from bs4 import BeautifulSoup


base_url = 'https://www.mofa.go.jp/mofaj/kids/kokki/'
# url = base_url + 'k_asia.html'
# url = base_url + 'k_chuto.html'
# url = base_url + 'k_n_america.html'
# url = base_url + 'k_latinamerica.html'
# url = base_url + 'k_europe.html's
# url = base_url + 'k_oceania.html'
url = base_url + 'k_africa.html'

soup = BeautifulSoup(requests.get(url).content, "html.parser")

countries = []

for element in soup.find_all("li", class_="heightLine"):
    img = element.find('img')['src'].split("/")[1]
    name = element.find('p')
    if name is None :
        name = element.find('span')
    print(name.text)
    countries.append({"images": img, "name": name.text})
    urllib.request.urlretrieve(base_url+"image/"+img, img)

with open("ja_countries.json", "w") as f:
    f.write(str(countries))

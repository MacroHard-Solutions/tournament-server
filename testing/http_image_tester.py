# -*- coding: utf-8 -*-
"""
Created on Sat Apr 30 19:51:37 2022

@author: Gregory Cowan
"""

import requests
import shutil

# --------------------------------- POST request ------------------------------------

endpoint = 'http://54.197.128.13:8001/game-server'

# creates a json object (this is how Kian wants to do his requests)
data = {'data':
        {'type':'render',
        'game':'Tic-Tac-Toe',
        'moves': ['0 0 X', '1 1 O', '0 1 X', '2 0 O', '0 2 X']},
        'signal':{}}

r = requests.post(url = endpoint, json = data)

# just for interest sake
print(r.headers)

imageURIs = []

if r.status_code == 200:
    print('OK')
    imageURIs = r.json()['imageURIs']
    

# --------------------------------- GET requests ------------------------------------

i = 0
for uri in imageURIs:
    endpoint = 'http://54.197.128.13:8001/game-server/' + uri
    
    # stream needs to be True to work for images
    r = requests.get(url = endpoint, stream = True)
    
    # make sure images folder exists
    path = 'images/{}.jpg'.format(i)
    i += 1
    
    # just for interest sake
    print(r.headers)
    
    if r.status_code == 200:
        print('OK')
        with open(path, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)

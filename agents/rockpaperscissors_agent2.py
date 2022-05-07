# -*- coding: utf-8 -*-
"""
Created on Sat Apr  9 17:36:01 2022

@author: Gregory Cowan
"""

from socket import *
import numpy as np

def Play_Move(player_move, myMove):
    if myMove:
        print('I chose', player_move)
    else:
        print('My opponent chose', player_move)

player_port = 8001
player_socket = socket(AF_INET, SOCK_STREAM)
player_socket.bind(('', player_port))
player_socket.listen(1)
print('Player 2 is ready for game.')

connection_socket, address = player_socket.accept()

while True:
    move = connection_socket.recv(1024).decode()
    if move == 'move':
        player_move = input('Enter your move: \n')
        connection_socket.send((player_move + '\n').encode())
        Play_Move(player_move, True)
    elif move[:6] == 'winner':
        print(move[7:] + ' won!')
        connection_socket.close()
        break
    else:
        Play_Move(move, False)
    
print('Game Over.')
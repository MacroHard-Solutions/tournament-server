# -*- coding: utf-8 -*-
"""
Created on Fri Apr  1 11:10:31 2022

@author: Gregory Cowan
"""

from socket import *
import numpy as np
import time

board = np.array([[' ', ' ', ' '],
                  [' ', ' ', ' '],
                  [' ', ' ', ' ']])

def Play_Move(player_move):
    data = player_move.split(' ')
    row = int(data[0])
    col = int(data[1])
    piece = data[2]
    board[row][col] = piece
    print(board)
    
def Find_Move():
    available_squares = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == ' ':
                available_squares.append((i,j))
      
    # method shouldn't be running when board is full            
    n = np.random.randint(0, len(available_squares))
    return available_squares[n]

player_port = 8000
player_socket = socket(AF_INET, SOCK_STREAM)
player_socket.bind(('', player_port))
player_socket.listen(1)
print('Player 1 is ready for game.')

connection_socket, address = player_socket.accept()

# flag used to determine if agent is X or O
flag = True
piece = 'X'

while True:
    move = connection_socket.recv(1024).decode()
    if move == 'move':
        # this agent is going first so it will be X
        if flag:
            flag = False
            
        time.sleep(3)
        random_move = Find_Move()
        final_move = '{} {} {}'.format(random_move[0], random_move[1], piece)
        
        connection_socket.send((final_move + '\n').encode())
        Play_Move(final_move)
    elif move[:6] == 'winner':
        print(move[7:] + ' won!')
        connection_socket.close()
        break
    elif move == 'draw':
        print('Draw!')
        connection_socket.close()
        break
    else:
        # this agent is going second so it will be O
        if flag:
            piece = 'O'
            flag = False
            
        Play_Move(move)
    
print('Game Over.')
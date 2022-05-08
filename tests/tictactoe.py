# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 02:55:36 2022

@author: Gregory Cowan
"""

import numpy as np

board = np.array([[' ', ' ', ' '],
                  [' ', ' ', ' '],
                  [' ', ' ', ' ']])

def Play_Move(player_move):
    data = player_move.split(' ')
    try:
        row = int(data[0])
        col = int(data[1])
    except:
        print(player_move)
        return
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

def Simulate_Server_Message(move):
    print('Player 1 is ready for game.')
    
    # flag used to determine if agent is X or O
    flag = True
    piece = 'X'
    
    if move == 'move':
        # this agent is going first so it will be X
        if flag:
            flag = False
            
        random_move = Find_Move()
        final_move = '{} {} {}'.format(random_move[0], random_move[1], piece)
        Play_Move(final_move)
        
        return final_move
    
    elif move[:6] == 'winner':
        print(move[7:] + ' won!')

    elif move == 'draw':
        print('Draw!')

    else:
        # this agent is going second so it will be O
        if flag:
            piece = 'O'
            flag = False
            
        Play_Move(move)
        
    print('Game Over.')
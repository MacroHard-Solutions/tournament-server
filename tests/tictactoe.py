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
    row = int(player_move[: player_move.find(',')])
    col = int(player_move[player_move.find(',') + 1 : player_move.find('_')])
    piece = player_move[player_move.find('_') + 1:]
    board[row][col] = piece
    print(board)
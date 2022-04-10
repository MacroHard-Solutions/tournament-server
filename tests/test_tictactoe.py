# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 02:55:36 2022

@author: Gregory Cowan
"""

from tictactoe import Play_Move, board

def test_making_move():
    Play_Move('1,1_x')
    assert board[1][1] == 'x'
    Play_Move('0,1_o')
    assert board[0][1] == 'o'
    
def test_board_setup():
    assert board[0][0] == ' '
    
def test_board_size():
    assert board.shape == (3,3)
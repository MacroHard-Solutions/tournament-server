# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 02:55:36 2022

@author: Gregory Cowan
"""

from tictactoe import Play_Move, board, Simulate_Server_Message

def test_making_move():
    Play_Move('1 1 X')
    assert board[1][1] == 'X'
    Play_Move('0 1 O')
    assert board[0][1] == 'O'
    
def test_board_setup():
    assert board[0][0] == ' '
    
def test_board_size():
    assert board.shape == (3,3)
    
def test_receive_move():
    assert Simulate_Server_Message('move') != '' 
    
def test_append_board():
    Play_Move('0 0 X')
    Play_Move('0 0 O')
    assert board[0][0] == 'O'
    
def test_move_format():
    move = Simulate_Server_Message('move')
    data = move.split(' ')
    assert len(data) == 3
    
def test_invalid_move_handle():
    Play_Move('0 g0 X')
    assert board[0][0] == ' '
# EightQueens

Have the function EightQueens(strArr) read strArr which will be an array consisting of the locations of eight Queens on a standard 8x8 chess board with no other pieces on the board. The structure of strArr will be the following: ["(x,y)", "(x,y)", ...] where (x,y) represents the position of the current queen on the chessboard (x and y will both range from 1 to 8 where 1,1 is the bottom-left of the chessboard and 8,8 is the top-right). Your program should determine if all of the queens are placed in such a way where none of them are attacking each other. If this is true for the given input, return the string true otherwise return the first queen in the list that is attacking another piece in the same format it was provided. 

For example: if strArr is ["(2,1)", "(4,2)", "(6,3)", "(8,4)", "(3,5)", "(1,6)", "(7,7)", "(5,8)"] then your program should return the string true. The corresponding chessboard of queens for this input is below (taken from Wikipedia). 

### Analysis

#### Movement and orientation on the Chessboard

The queen is equiped with a number of possible moves originating from it's standing / current position out to the extremities of the chess board (8x8). While the queen's current position could be thought to intersect a diagonal or vertical or horizontal line, I'm preferring to think of the lines radiating out from the queen's current position. This allows us to use the chess conventions of N, NE, E, SE, S, SW, W, NW.

So for a queen, these moves would mean:

* N: x, y + 1 <= 8
* NE: x + 1 <= 8, y + 1 <= 8
* E: x + 1 <= 8
* SE: x + 1 <= 8, y + 1 <= 8
* S: x, y - 1 > 0
* SW: x - 1 > 0, y - 1 > 0
* W: x - 1 > 0
* NW: x - 1 > 0, y - 1 > 0

So it is a rotation about the queen in angles of 0, 45, 90, 135, 180, 225, 270, 315
 
And each letter corresponds to a function of the parameters x, y such that:

* N: Add 1 to y, limit <= 8
* E: Add 1 to x, limit <= 8
* S: Subtract 1 from y, limit > 0
* W: Subtract 1 from x, limit > 0

We can then map these moves to singular or composite moves by virtue of the available functions that operate in one dimention only.

#### Handling of positions on the board

Each x, y position is easily tranformed into a single value integer that encodes the position that will make it easier to make a comparison from any position on the board. This will reduce the arrray from an array of arrays to just a single dimensional array. This will open up array methods like Array.includes and Array.indexOf which would probably be quicker than a Array.find(findFunction), though that would probably not be such a performance hit. Worth checking out what the performance benefits are on a site like <>

Worth reading of course is [Wikipedia's entry](https://en.wikipedia.org/wiki/Eight_queens_puzzle) to this problem.

As long as I traverse the array in the order given, I should find the first queen for which such a conflict exists.

When a queen stradles any of the 4 edges of the board, then certain moves can be eliminated. And for any given piece a rotation should happen until it's move is exhausted. So the function should have a way to return a value that let's a loop or other logic know that that move is complete and it's time to try the next.

It seems like a good use case to use the Iterator protocol for this one? Seems like a good fit, as it will integrate with a loop where the done parameter can tell me if the limit has been reached.

> This challenge seems particularly well suited to experimenting with the ES6 Iterator Protocol.

#### Loops and Return Types

Any particular move on the board can be a move on either 1 or 2 coordinates (x, y) and can be either positive or negative depending on the position of the current queen. Limits should be imposed on the upper and lower limit.

The different return type is a little tricky to work with, as we'll want to break a loop when a position if found, so we'll have the dependent variable return a Boolean 'false' when no hits on a particular path is found, and then the coordinates of the found hit when true.

Initially, was iterating all the queen with reduce, which seemed to make sense, but again array helpers not ideal as they have to process all their elements and you can't break out of them.

#### Navigating in all directions

Decided to store all the moves {North, North East, etc}, in an array. Was thinking that this would provide some efficiency if I was to pass the function iteratively to some handler which might cut down on repetitive code. Essentially want to keep the direction logic encapsulated to a 'North' function but any repetive logic generic so it can deal with any direction.

What I think is a valuable insight, is that moves in a particular direction are either 1 or 2 computations on a coordinate to produce the next value(s), and then perform a check on the input array for the new computed value

The challenge only asks for the position of the queen that is a hit, but it seems more useful to have it return which queen threatens and the one that is threatened.

#### Performance

Searching along all compass points is obviously compuationally expensive. I noticed as I was using test strings, what my brain did to insert a __hit__ value was to check the difference pattern x,y of the attacking queen to contrive one that was in its path. Therefore there's something to be done by, per queen, getting the difference of x,y and filtering the queens list to only those that have that same difference for each of the cross compass points.This could reduce the 4 axis to
2 potentially and also reduce the number of queens that need to be considered.

So:
  1. For diagonals: Find a pair with same difference
  2. For Vertical: Find pair with same x
  2. For Horizontal: Find pair with same y

IF next_queen HAS same_difference as this_queen AND next_queen.x is < || > than this_queen.x
IF next_queen HAS same_x
IF next_queen HAS same_y

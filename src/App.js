import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { combineReducers, createStore} from 'redux';
import { connect } from 'react-redux';
import { update } from 'immutability-helper';

// board info
const BOARDSIZE = {x:3,y:4};
const CELLSIZE = 30;

// action types
const MOVE = 'MOVE';
const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const LEFT = 'LEFT';

const HP = 'HP';

const EXPUP = 'EXPUP';
const LEVELUP = 'LEVELUP';
const UPDATEBOARD= 'UPDATEBOARD';

const EMPTY = 'EMPTY';
const WALL = 'WALL';

const STICK = 'STICK';
const DAGGER = 'DAGGER'
const SWORD = 'SWORD';

function clearWarnings(){
  return [EXPUP,LEVELUP,UPDATEBOARD,EMPTY,WALL,STICK,DAGGER,SWORD, CELLSIZE];
}


const PLAYER = 'PLAYER';
const INITIALPLAYER = {
  exp: 0,
  hp: 100,
  level: 1,
  x:1,
  y:1,
  weapon: STICK,
  strength: 3
}

var initializeBoard = function(){ 
  for (var y=1;y<BOARDSIZE.y;y++){
    for (var x=1;x<BOARDSIZE.x;x++){
      this['x'+x+'y'+y] = {
        x:x,
        y:y,
      }
      this['x'+x+'y'+y].content = 
        (x === INITIALPLAYER.x && y === INITIALPLAYER.y) ? 
        PLAYER : EMPTY
    }
  }
}

const INITIALBOARD = new initializeBoard()


////////////////////
// Redux Reducers //
////////////////////

// Updates the board with the current position of everything
function boardReducer(state=INITIALBOARD, action){
  if (action.type === MOVE){
    let oldCell = Object.keys(state).find(key => state[key].content === PLAYER);
    switch (action.direction){
      case UP:
        return update(state,{content})
        
      case RIGHT:
        return Object.assign({},state,
          // clear cellBefore
          {[oldCell]:{
              content:EMPTY
            }
          },
          // update new cell
          {['x'+(state[oldCell].x+1)+'y'+(state[oldCell].y)]:{
              content:PLAYER
            }
          })
      case DOWN:
        return Object.assign({},state,
          // clear cellBefore
          {[oldCell]:{
              content:EMPTY
            }
          },
          // update new cell
          {['x'+(state[oldCell].x)+'y'+(state[oldCell].y+1)]:{
              content:PLAYER
            }
          })
      case LEFT:
        return Object.assign({},state,
          // clear cellBefore
          {[oldCell]:{
              content:EMPTY
            }
          },
          // update new cell
          {['x'+(state[oldCell].x-1)+'y'+(state[oldCell].y)]:{
              content:PLAYER
            }
          })
      default:
        return state;
    }
    
  }
  else{
    return state;
  }
}

// Updates player data
function playerReducer(state=INITIALPLAYER, action){
  if(action.type === MOVE){
    switch (action.direction){
      case UP:
        return Object.assign({},state,{
            x: state.x,
            y: state.y-1
          })
      case RIGHT:
        return Object.assign({},state,{
          x: state.x+1,
          y: state.y
        })
      case DOWN:
        return Object.assign({},state,{
          x: state.x,
          y: state.y+1
        })
      case LEFT:
        return Object.assign({},state,{
          x: state.x-1,
          y: state.y
        })
      default:
        return state;
    }
  }

  else if (action.type === HP){
    return Object.assign({},state,{
      hp: state.hp + action.hp
    })
  }
  
  else {
    return state;
  }
}


/* 
Root Reducer
*/
const rootReducer = combineReducers({
  board: boardReducer,
  player: playerReducer
});


///////////////////////////
// Redux Action Creators //
///////////////////////////

function move(direction){
  return {
    type: MOVE,
    direction:direction
  }
}

function hp(hp){
  return {
    type: HP,
    hp,hp
  }
}

/////////////////
// Redux Store //
/////////////////

let store = createStore(rootReducer)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// TEST ACTIONS
store.dispatch(hp(-10));
store.dispatch(move(DOWN));
store.dispatch(move(DOWN));
store.dispatch(move(RIGHT));
store.dispatch(move(RIGHT));


//////////////////////
// React Components //
//////////////////////

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Dungeon Crawler
        </p>
        <Board />
      </div>
    );
  }
}

const Board = () => {



  return(
    <div>yo</div>
  );
}




export default App;

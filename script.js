// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      timerTitle: "Session",
      breakLength: 5,
      sessionLength: 25,
      time: 1500,
      onBreak: false,
      timerOn: false,
      intervalTime: null,
    }
    
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementLength = this.incrementLength.bind(this);
    this.decrementLength = this.decrementLength.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.startTime = this.startTime.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.handleBreakTime = this.handleBreakTime.bind(this);
    this.handleSwitchToSession = this.handleSwitchToSession.bind(this);
  }
  
  startTime() {
    
    if(this.state.timerOn === false) {
      this.setState({
        timerOn: true,
        intervalTime: setInterval( () => {
          //console.log("here");
          this.decrementTimer();
        }, 1000)
      });
    }
    else {
      
      clearInterval(this.state.intervalTime);
      
      this.setState({
        timerOn: false
      });
    }
    
  }
  
  decrementTimer() {
    
    if(this.state.time > 0) {
      this.setState({
      time: this.state.time - 1
      });
    }
    else {
      clearInterval(this.state.intervalTime);
      //console.log("0!!!");
      
      const beepSound = document.getElementById("beep");
      beepSound.currentTime = 0;
      beepSound.play();
      
      if(this.state.onBreak) {
        this.handleSwitchToSession();
      }
      else {
        this.handleBreakTime();
      }
      
    }
    
  }
  
  handleBreakTime() {
    this.setState({
        timerTitle: "Break",
        timerOn: false,
        time: this.state.breakLength * 60,
        onBreak: true,
      });
    this.startTime();
  }
  
  handleSwitchToSession() {
    this.setState({
        timerTitle: "Session",
        timerOn: false,
        time: this.state.sessionLength * 60,
        onBreak: true,
      });
    this.startTime();
  }
  
  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    return (
    (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    );
  }
  
  resetTime() {
    clearInterval(this.state.intervalTime);
    
    const beepSound = document.getElementById("beep");
    beepSound.pause();
    beepSound.currentTime = 0;
    
    this.setState({
      timerTitle: "Session",
      breakLength: 5,
      sessionLength: 25,
      time: 1500,
      onBreak: false,
      timerOn: false,
      intervalTime: null,
    });
  }
  
  incrementBreak() {
    if(this.state.breakLength != 60) {
      this.setState({
      breakLength: this.state.breakLength + 1
    });
    }
  }
  
  decrementBreak() {
    if(this.state.breakLength != 1) {
      this.setState({
      breakLength: this.state.breakLength - 1
    });
    }
  }
  
  incrementLength() {
    if(this.state.sessionLength != 60) {
      this.setState({
      sessionLength: this.state.sessionLength + 1,
      time: (this.state.sessionLength + 1) * 60
    });
    }
    
  }
  
  decrementLength() {
    if(this.state.sessionLength != 1) {
      this.setState({
      sessionLength: this.state.sessionLength - 1,
      time: (this.state.sessionLength - 1) * 60
    });
    }
    
  }
  
  render() {
    return(
      <div id="main-content">
        <h1>25 + 5 Clock</h1>
        <Controls breakLength={this.state.breakLength} sessionLength={this.state.sessionLength} incBrk={this.incrementBreak} decBrk={this.decrementBreak} incSes={this.incrementLength} decSes={this.decrementLength}/>
        
        <div id="timer-label">
          <h1>{this.state.timerTitle}</h1>
          <h1 id="time-left">{this.formatTime(this.state.time)}</h1>
        </div>
        
        <div className="timer-controls">
          <button id="start_stop" onClick={this.startTime}>
            <i class="fa fa-play fa-2x"></i>
            <i class="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={this.resetTime}>
            <i class="fas fa-sync fa-2x"></i>
          </button>
        </div>
        <audio id="beep" src="https://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"></audio>
      </div>
    );
  }
}

const Controls = (props) => {
  return(
    <div id="controls">
      <BreakLength breakLength={props.breakLength} incBrk={props.incBrk} decBrk={props.decBrk}/>
      <SessionLength sessionLength={props.sessionLength} incSes={props.incSes} decSes={props.decSes}/>
    </div>
  );
}

const BreakLength = (props) => {
  return(
    <div id="break-label">
      <h1>Break Length</h1>
      <div className="break-controls">
          <button id="break-decrement" onClick={props.decBrk}>
            <i class="fa fa-arrow-down fa-2x"></i>
          </button>
          <p id="break-length">{props.breakLength}</p>
          <button id="break-increment"onClick={props.incBrk}>
            <i class="fa fa-arrow-up fa-2x"></i>
          </button>
      </div>
    </div>
  );
}

const SessionLength = (props) => {
  return(
    <div id="session-label">
      <h1>Session Length</h1>
      <div className="session-controls">
        <button id="session-decrement" onClick={props.decSes}>
          <i class="fa fa-arrow-down fa-2x"></i>
        </button>
        <p id="session-length">{props.sessionLength}</p>
        <button id="session-increment" onClick={props.incSes}>
          <i class="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById("app"));

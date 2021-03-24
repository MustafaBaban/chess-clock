<style scoped>
 body{
    font-family: 'Orbitron', sans-serif !important;
  }
  button {
  transition: all 0.1s;
  }
  button:active {
  margin-top: 4px;
  }
  @keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
</style>
<template>
  <div id="app">
    <div class="flex place-content-center">
      <div class="border-gray border-solid border-2 m-2">
        <h1 class="text-8xl p-10">{{ timeLeft1 }}</h1>
      </div>
      <!-- <button @click="pauseTimer()">pause</button> -->
      <div class="border-gray border-solid border-2 m-2">
        <h1 class="text-8xl p-10">{{ timeLeft2 }}</h1>
      </div>
    </div>
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" style="outline:none" @click="switchTimers()">Switch</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
var intervalTimer1;
var intervalTimer2;

function zeroPadded(num) {
  // 4 --> 04
  return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return hour % 12 || 12;
}


export default {
  name: "App",
  data() {
    return {
      pause: "",
      playing: "p1",
      selectedTime: 0,
      timeLeft1: "02:00",
      timeLeft2: "02:00",
      endTime: "0",
      time: {
        sec1: 120,
        display1: "120s",
        sec2: 120, 
        display2: "120s",
      },
    };
  },
  mounted (){
    this.setTime(this.time.sec1);
  },
  methods:
  {
     switchTimers(){
       if(this.playing == "p1"){
        this.pauseTimer1();
        this.setTime2(this.time.sec2);
        this.playing = "p2";
       }
       else{
          this.pauseTimer2();
          this.setTime(this.time.sec1);
          this.playing = "p1";
       }
      

    },
    setTime(seconds) {
      clearInterval(intervalTimer1);
      clearInterval(intervalTimer2);
      this.timer(seconds);
    },
    
    setTime2(seconds) {
      clearInterval(intervalTimer1);
      clearInterval(intervalTimer2);
      this.timer2(seconds);
    },

    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
      this.displayEndTime(end);
      this.countdown1(end);
    },
    timer2(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft2(seconds);
      this.selectedTime = seconds;
      this.displayEndTime(end);
      this.countdown2(end);
    },

    countdown1(end) {
      intervalTimer1 = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer1);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },

    countdown2(end) {
      intervalTimer2 = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer2);
          return;
        }
        this.displayTimeLeft2(secondsLeft);
      }, 1000);

    },

    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;
      // const seconds = secondsLeft % 60;
      this.timeLeft1 = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
      // this.pause = this.timeLeft;
    },
    displayTimeLeft2(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;
      // const seconds = secondsLeft % 60;
      this.timeLeft2 = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
      // this.pause = this.timeLeft;
    },

    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();
      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`;
    },

    pauseTimer1() {
      clearInterval(intervalTimer1);
      this.pause = this.timeLeft1;
      var a = this.pause.split(':'); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 + (+a[1]); 
      this.time.sec1=seconds;
    },
    pauseTimer2() {
      clearInterval(intervalTimer2);
      this.pause = this.timeLeft2;
      var a = this.pause.split(':'); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 + (+a[1]); 
      this.time.sec2=seconds;
    },

  },
  components: {
    // HelloWorld
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

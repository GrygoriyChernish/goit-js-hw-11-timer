
class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this._refs = this._getRefs(selector),
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.targetDate = targetDate;
    this._init();
    this._bindEvents();
  };

  _getRefs(selector) {
      const refs = {};

      refs.startBtn = document.querySelector(`${selector} [data-action-start]`),
      refs.stopBtn = document.querySelector(`${selector} [data-action-stop]`),
      refs.days = document.querySelector(`${selector} [data-value="days"]`),
      refs.hours = document.querySelector(`${selector} [data-value="hours"]`),
      refs.mins = document.querySelector(`${selector} [data-value="mins"]`),
      refs.secs = document.querySelector(`${selector} [data-value="secs"]`)
    
    return refs;
  }

  _bindEvents() {
    this._refs.startBtn.addEventListener('click', this._start.bind(this));
    this._refs.stopBtn.addEventListener('click', this._stop.bind(this));
  }
  
  _init() {
    this._clearTimer();
  }

  _clearTimer() {
    const time = this._getTimeComponents(0);
    this.onTick(time);
  }

  _start() {
    if (this.isActive) {
      return;
    }
    const startTime = this.targetDate;
    this.isActive = true,
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this._getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000)
  };

  _stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    this._clearTimer();
  };

  _getTimeComponents(time) {
  const days = this._pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this._pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this._pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this._pad(Math.floor((time % (1000 * 60)) / 1000));
  return {days, hours, mins, secs};
  };

  _pad(value) {
  return String(value).padStart(2, '0');
  };
}

const timer = new CountdownTimer({
  onTick: updateTimerFields,
  targetDate: new Date('Nov 29, 2020'),
  selector: '#timer-1',
});

function updateTimerFields({ days, hours, mins, secs }) {
  this._refs.days.textContent = `${days}`;
  this._refs.hours.textContent = `${hours}`;
  this._refs.mins.textContent = `${mins}`;
  this._refs.secs.textContent = `${secs}`
};

const moment = require('moment');


exports.init = (ratio) => new Clock(ratio);


class Clock {
    // ratio 60 => 1sec = 1min
    // ratio 3600 => 1sec = 1h
    // ratio 86400 => 1sec = 1day
    // ...
    constructor(ratio = 1) {
        this.ratio = ratio;
        // get delta between the current year and X ratio timestamps
        this.delta = (Date.now() * this.ratio) - Date.now();

        // init map of phases of the day
        this.phases = new Map();
        for(let i = 0 ; i < 24; i++){
            if (i > 6 && i <= 12) {
                this.phases.set(i, 'morning');
            } else if(i > 12 && i <= 17) {
                this.phases.set(i, 'afternoon');
            } else if(i > 17 && i <= 21) {
                this.phases.set(i, 'evening');
            } else {
                    this.phases.set(i,'night');
            }
        }
        // console.log(this.phases);
    }

    // getters
    // current time in the simulation
    get now() {
        // return current data X ratio - delta (so the clock starts at the real date)
        return moment( (Date.now() * this.ratio) - this.delta);
    }
    // phase of the day in the simulation
    get phase() {
        let h = (this.now.get('hours') +1) % 24;
        return this.phases.get( h);
    }
    age(year) {
        if(parseInt(year) || isNaN(year)){return false;}
        return parseInt( this.now.get('year') ) - parseInt(year);
    }
    // time interval converted to the time of the simulation,
    // e.g. 5 hours = (5*3600s / ratio) * 1000 => sleep interval in milliseconds
    // errors is used to introduce an error
    // eg errors = 0.1 => up to +10%, error = -0.5 => up to minus 50%
    // errors can be an array of possible errors
    // Array of errors is not cumulative, only one will be randomly selected and applied
    // eg errors = [0.1,-0.3] => up to 10% or minus to -30%
    milliseconds(duration = 0, type = 'minutes', errors = 0) {
        // calc of errors
        let deviation = 0;
        if(Array.isArray(errors)) {
            // pick a random in the array of errors
            let i = Math.floor(Math.random() * errors.length);
            deviation = errors[i]* Math.random();
        } else if(!isNaN(errors)){
            deviation = errors * Math.random();
        }
        duration = duration + duration*deviation;
        // console.log(duration);
        // end of calc of errors

        switch(type){
            case 'months':
                duration = duration * 30 * 24 * 60 * 60 * 1000;
                break;
            case 'days':
                duration = duration * 24 * 60 * 60 * 1000;
                break;
            case 'hours':
                duration = duration * 60 * 60 * 1000;
                break;
            case 'minutes':
                duration = duration * 60 * 1000;
                break;
            default:
                duration = duration * 1000;
        }
        // console.log(`duration in hours ${duration / (1000 * 3600)}`);

        // apply simulation ratio
        duration = duration / this.ratio;

        return duration;
    }
}



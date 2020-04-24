const Actions = require('./Actions');
const Conditions = require('./Conditions');

// todo init agents from users, registers agents in users status

// todo each agent is initialised with:
// todo 1) the community clock
// todo 2) condition generator
// todo 3) status generator
// todo 4) event generator
// todo 5) action generator

// todo agent has internal phases defined bu

// todo agents are setTimeout functions working on the community clock

// todo state machine active, self-sufficient, dependent, death
// list of actions he can perform
// preferences
// in training
// use emerging events as a malus for the next round of actions


module.exports = class Agent{

    constructor(clock, yearOfBirth){
        this.clock = clock;
        // if no year give, it is a new born
        if(!yearOfBirth){
            this.yearOfBirth = clock.now().get('year');
        }
        this.conditionsSet = new Set();
    }
    get age(){return this.clock.age(this.yearOfBirth)}
    get conditions(){return this.conditions; }

    dailyRoutine(events){
        // todo evaluate impact of events

        // todo get reminders of daily activities

        // todo decide what to do
        // todo decide what to skip
        // todo evaluate outcomes

        // todo return the logs the day
    }

};
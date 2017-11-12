// 2. Skill Code =======================================================================================================

import {moreLike} from './moreLike'

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak('launch').listen('listen');
        this.emit(':responseReady');
    },

    'RepeatIntent': function () {


        var say = this.event.request.intent.slots.CatchAll.value
        // This is the variable that you would take and permute and return for output
        say = moreLike(say)

        this.response.speak(say);
        this.emit(':responseReady');

    },

    'AMAZON.YesIntent': function () {

        // this.response.cardRenderer(SKILL_NAME, card);
        this.response.speak('yes');
        this.emit(':responseReady');

    },

    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak('help');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('stop');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.response.speak('stop');
        this.emit(':responseReady');
    }

};

//    END of Intent Handlers {} ========================================================================================

/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';


if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'testy mctest',
          createdAt: new Date(),
          owner: userId,
          username: 'Bob Dobalina',
        });
      });

      it('can delete owned task', () => {
        // get internal implementation of task method
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        // set up fake method invocation that looks like what the method expects
        const invocation = { userId };
        // run method with `this` set to fake invocation
        deleteTask.apply(invocation, [taskId]);
        // verify method did what's expected
        assert.equal(Tasks.find().count(), 0);
      })
    })
  })
}

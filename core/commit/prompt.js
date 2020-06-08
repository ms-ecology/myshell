let typeMap = require('./assets/type-map')
const map = require('lodash.map');
const longest = require('longest');
const rightPad = require('right-pad');


// 处理types的布局
let length = longest(Object.keys(typeMap)).length + 1
let choices = map(typeMap, function(type, key) {
  return {
    name: rightPad(key + ':', length) + ' ' + type.description,
    value: key
  };
});

module.exports=[
  {
    type: 'list',
    name: 'type',
    message: "Select the type of change that you're committing:",
    choices
  },
  {
    type: 'input',
    name: 'scope',
    message:
      'What is the scope of this change (e.g. component or file name): (press enter to skip)',
    filter: function(value) {
      return value.trim().toLowerCase();
    }
  },
  {
    type: 'input',
    name:'subject',
    message: "Write a short, imperative tense description of the change:\n",
    validate: function(subject) {
      return subject.trim().length ? true : 'subject is required!'
    },
  },
  {
    type: 'input',
    name: 'body',
    message:
      'Provide a longer description of the change: (press enter to skip)\n',
  }
]
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customize yargs version

yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: { 
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Description of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
       notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: { 
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reading note',
    handler: function () {
        console.log('Reading note!')
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: function () {
        console.log('Listing notes!')
    }
});


yargs.parse()
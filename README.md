# google-search-history
A chrome extension that helps you extract your google search history and download it in a variety of (raw) popular formats like: txt, csv and json. Visit, developer.chrome.com, for more information.

Installation
================

1) Download this git repository.
````
$ git clone git@github.com:DanielRanLehmann/google-search-history.git
````
2) Open Chrome and go to [your extension](chrome://extensions):

3) Lastly, drag and drop the google-search-history folder into your extensions page and install it.

4) Done!

Usage
===============

Look at list available commands
````
$ app/console list

...
Available commands:
    generate   Generate skeleton class for new command
    help       Displays help for a command
    list       Lists commands
    test       Command test
````

Generate skeleton command class:
````
$ app/console generate
````
Write name of your command class in console dialog:

`Please enter the name of the command class:` AcmeCommand

Get the answer:
````
Generated new command class to "./cmd/src/Command/AcmeCommand.php"
````
Look at list available commands
````
$ app/console list

...
Available commands:
    acme       Command acme
    generate   Generate skeleton class for new command
    help       Displays help for a command
    list       Lists commands
    test       Command test
````

Execute your command `acme`:

````
$ app/console acme
Execute
````
Now you can change the logic of your command class on your own.

If the name of your command class will be in CamelCase you get `camel:case` command.

Why is this not a chrome extension app?
===============
For privacy reasons, and for the sake of complete transparency, you're highly encouraged to look through the code to get a peace of mind in knowing that your search history **is not** mishandled, but that you have complete control over your data.


Separate it into another package, probably
Start it up with typescript
Clean up the javascript a little bit (make it javascript)
Make it so you can upload JSON files
Have it parse the JSON file and generate the HTML for it

Begin adding internal namespace elements to the json that aren't rendered
Be able to traverse everything- so ids, ids, dis
Set up index's by arbitrary atributes (so a hash to all possible objects)
Start trasversal on arbitrary objects
Take notes on object


# About module resolution

You're going to use some system to find files that aren't the file you're in. How?

First, require and ESM are different have have some standards about relative files vs "look in \node_modules"

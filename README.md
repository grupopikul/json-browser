Have it parse the JSON file and generate the HTML for it

So if it were objects and literals, every object would be a new node, with it's name being the key.
But there's arrays, how do we handle them.
If it's an array of literals, it becomes a property.
If it's an array of objects, they all become nodes of a node named the array.
If it's mixed, the literals become properties and the objects become nodes and mixed arrays/arrays of objects become nodes.




Begin adding internal namespace elements to the json that aren't rendered
Be able to traverse everything- so ids, ids, dis
Set up index's by arbitrary atributes (so a hash to all possible objects)
Start trasversal on arbitrary objects
Take notes on object


# About module resolution

You're going to use some system to find files that aren't the file you're in. How?

First, require and ESM are different have have some standards about relative files vs "look in \node_modules"

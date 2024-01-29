Lets add a worker just for fun.
Some kind of paging for array?
Interests:
  Lots of things dependent on small amount of code with not much complexit
  What is the most dependend on?
  What depends on the most?
  What has the most individual dependencies?
  What has the most individual dependents?

So if it were objects and literals, every object would be a new node, with it's name being the key.
But there's arrays, how do we handle them.
If it's an array of literals, it becomes a property.
If it's an array of objects, they all become nodes of a node named the array.
If it's mixed, the literals become properties and the objects become nodes and mixed arrays/arrays of objects become nodes.
Plotly refactor has some interesting material in it.

TODO:

- Styling would be nice.
- We need a function to easily get the root most node(s)

For webpack stuff specifically... don't really understand the stats file... but ok...




// Return all modules that fufill certain regex (true/false to invert)
modules = getModulesByNameFilter(moduleSet, regexOnNames, boolean)

// Return all moduels whose reasons fufill a certain regex (true/false to invert)
modules = getModulesByReasonFilter(moduleSet, regexOnReasons, boolean)

getNameFromModule(module)
getReasons(module)
getNameFomReason(reason)

// How do we start scoring complexity?

// To get what needs to the module
modules = getDependants(module)
// To get what the module needs
modules = getDependencies(moduleSet, module)

// This can take an array, create a dictionary of unique values with their counts.
// The filter can be applied to an array before it is counted, it can be used to group
countNames(array_of_names, filter)
resolveNames(working directory, names) (names can be array or dictionary)

MeasureTangledness



1) Get a group of modules in a certain folder
2) Get each modules list of dependants (as modules)
3) Order by dependent
4) Order who has the most dependants and their number
5) Create unique list of dependents among all
6) Eliminate intradependencies of that folder
7) Look at it by group of different folds
8) Do for specific players w/in that group
9) Look for mutual dependencies

1) Get a group of modules in a certain folder
2) Get for each module a list of their dependencies
3) Order by who has the most dependencies
4) Create unique list of dependencies among all
5) Eliminate intradependencies
6) Look at dependencies by group of different folders

1) Resolve particular file
2) Count exports
3) What does do certain dependents lean on

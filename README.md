So since this is turning into a build system....

There is a tool in here for extracting imports.

## Concept

// can we move import to require w/ transpilation, slowly
// can cjs be imported in browser and node if it's named properly?
// or is it just a node thing?
// lets try all situations
// but there are also rules about who THEY import (create things that export, that's the start, create things that import, and then things in between, and run time tests!
// parameterize...... try except can work for cjs, not gonna work for the other tone, gonna have to be a bunch of separate files, or modifiable files. and we still have to create a bunch of exports. gotta do it for both.
// and that's not a question of what the bundlers can do. if we're importing something we mean to be async but is not, we can wrap it all.

1) Take entry files
2) Move the AST
3) Develop dependency tree
4) Lint
5) Mark files by year of javascript
6) Mark files my module type
7) Mark files if acceptable for web or not
7) ANALYZE
-- You can show a graph visualization here
-- You should be able to run specific operations on graph filters/sections of graph
-- Graph can probably be transformed based on directory structure/depth
8) Transform type of javascript
9) Transform type of import/export or bundle

## TODO

- [x] fix build
- [x] fix source maps
- [x] better interface for webpack?
- [x] plotly (fix documentation on refactor)
- [x] Get cytoscape running with DAGRE
  - [x] Get exports working on heap
  - [x] Fix package.json
  - [x] Get tests working on heap
  - [x] See if import works
  - [x] See if require works
  - [x] Make fork
  - [x] Make pull request
  - [x] Make issue on cytoscape (explain)
  - [x] Document the import tool, document the changes to both cytoscape and
- [ ] Can plotly be exported/imported?
- [ ] Get it into global
- [ ] Let's redo the toolbar
  - [ ] Let's get certain things split into modules
  - [ ] Get it fixed and working
  - [ ] Split it into modules
  - [ ] Create tabs, yeah
  - [ ] better defaults for namespaces
- [ ] Let's keep going with webpack- turn webpack into Class please
- [ ] Let's lint
- [ ] Trees/Looping/Sorting (Graph should be tree)
- [ ] Let's create that tree of all the files
- [ ] Let's get it styled properly (color coded depth, shape based on type of import, name is folder)
- [ ] Let's be able to aggregate statistics into folders (ie collapsable)
- [ ] Let's get relationships shown on hover
- [ ] Let's be able to select between types of relationships shown
- [ ] Let's be able to add filters to what's shown, in a queue type structure
- [ ] Create a dictionary of file sizes
- [ ] Do some operations on index

-- Health- are there types we didn't check for
-- Do we have all modules, do all modules have a relationship
-- What happens if we chunk
-- Diff Trees
-- Serialize Trees
-- Get Our Own Resolver

# Errata

I'm only using ESM,

I had to submit a request to `heap` to update for ESM, but I'm using it locally right now.

I'm using a slightly modified version of cytoscape to make the actual pulls easier.

there is a "modified" folder with `// CHANGE` markers.

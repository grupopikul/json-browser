So since this is turning into a build system....

## Concept

1) [ ] Take entry files
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
- [ ] Get cytoscape running with DAGRE
- [ ] Get it into global
- [ ] Let's redo the toolbar
  - [ ] Let's get certain things split into modules
  - [ ] Get it fixed and working
  - [ ] Split it into modules
  - [ ] Create tabs, yeah
  - [x] better defaults for namespaces
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

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


Why can't we just follow the errors? Try to import index.js with firefox and take it all the way through, through every fucking file.
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
  - [x] fix dagre
    - [x] convert all to import (lib, dist, src, test)
    - [x] make sure everything is pointing to .js
    - [x] get babel installed
    - [x] do some babel conversion
    - [x] change linter
    - [x] change package.json
    - [x] make commit on graph
    - [x] add information about babel
    - [x] submit pull request draft for graph
    - [x] fix babel named default
    - [x] parar express
    - [x] review my prs and such
    - [x] read
    - [x] do the same thing for dagre
      - [x] get it cloned
      - [x] do the basic renaming
      - [x] do the change of all imports to exports
      - [x] change the makefile (add convert)
      - [x] see if it loads with graph lib
        - [x] fix import export stuff
      - [x] see how transpile handles the require (it should be fine)
      - [x] do the package.json
    - [x] do the same thing for dagre-cytoscape
      - [x] analyzing....
      - [x] test the html tests
      - [x] are there tests? (no)
      - [x] see if we can change the dagre dependency and pass the tests (or do the html test)
      - [x] create seperate folders
      - [x] do conversion, probably in package.json is fine
        - [x] can source even be convered???
        - [x] see what happens if we try to get it from node
        - [x] gotta link my repo
        - [x] we don't know if it will import correctly because it uses new javascript and doesn't transpile down.
        - [x] are constants supposed to be modifiable
        - [x] can we import any bundled versions from web?
        - [x] debug
          - [x] look at old html and make sure you didn't get rid of anything
          - [x] review webpack
          - [x] try all combinations
          - [x] look at source conversion and compared to old
          - [x] document what happens
          - [x] try this plugin with one, then without the other
          - [x] try this plugin with just preset env according to docs
      - [x] separate babel config for compile
      - [x] html example (depends on node?)
      - [x] package.json converter is fine, no need for make
      - [x] 5t rollup working
      - [x] lint config probably needs to be changed
      - [x] do package.json export require/import
      - [x] go through readme and release stuff
      - [x] submit
  - [x] email laura
  - [x] Fix up units on VSH/POROSITY
    - [x] Fix bugs
      - [x] colorwheel
      - [x] what to do about recursion 20:25
      - [x] Push
    - [x] Separate matrix into matrix range
  - [x] Get pull on lasio
  - [ ] submit pull request on cytoscape to roll everything into non-min
    - [ ] test to make sure it works without other imports
  - [ ] publish what you wrote to ajpikul or what
  - [x] if dagre gets submitted, see if you still need a special loader
  - [ ] migration (check again)
  - [ ] derma (make list of options)
  - [ ] Package (call them or talk to them)
- [ ] How is plotly using browserfy
- [ ] Fixup cytoscape in json-browser- as in, figure out what versions you're going to use and how you're going to use them.
- [ ] Let's redo the toolbar
  - [ ] It needs to be better organized, it needs to be better compartmentalized
    - [ ] Tabs for windows (separate toolbar for apps?, and command window, and console)
    - [ ] Into modules you can initialized
    - [ ] Make it work
    - [ ] better defaults for namespaces
- [ ] Let's keep going with webpack- turn webpack reader into into report Class please
- [ ] Let's get the reports pretty printed
- [ ] Let's get notified in track? I have no idea what that meant
- [ ] Let's lint what we've done in json browser
- [ ] Get cytoscape making trees/looping/sorting (Graph should be tree)
- [ ] Let's create that tree of all the files
- [ ] Let's get it styled properly (color coded depth, shape based on type of import, name is folder)
- [ ] Let's be able to aggregate statistics into folders (ie collapsable)
- [ ] Let's get relationships shown on hover
- [ ] Let's be able to select between types of relationships shown
- [ ] Let's be able to add filters to what's shown, in a queue type structure
- [ ] Create a dictionary of file sizes
- [x] Add to plotly unidades and multiple lines, add to pozo better checking for types
- [ ] Do some operations on index.js
- [ ] TODO in slack for neyberson, as opposed to Trello, add notes that you have in notebook
- [ ] npm install --web or something like that to make an import map

-- Health- are there types we didn't check for (make sure nothing is under the table)
-- Do we have all modules, do all modules have a relationship
-- What happens if we chunk
-- Diff Trees ?
-- Serialize Trees ?
-- Get Our Own Resolver ?

# Errata

I'm only using ESM,

I had to submit a request to `heap` to update for ESM, but I'm using it locally right now.

I'm using a slightly modified version of cytoscape to make the actual pulls easier.

there is a "modified" folder with `// CHANGE` markers.

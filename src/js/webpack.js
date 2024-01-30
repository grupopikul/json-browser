// Oh god I'm switching between snake_case and camelCase why
// Warning, this only supports one chunk, since it gets modules from the one chunk. I think. I don't know if the way it gets modules works with two chunks.

const cjs_types = ["cjs export require", "cjs full require", "cjs require", "cjs self exports reference"];
const entry_types = ["entry"];
const harmony_types = ["harmony export imported specifier", "harmony import specifier", "harmony side effect evaluation"];
const provided_types = ["harmony export imported specifier"];
// ignore null
// make sure there are no new ones?

class Edge {
  is_a;
  of;
  cjs;
  entry;
  harmony;
  provided;
  constructor(is_a, of, cjs, harmony, entry, provided) {
    this.is_a = is_a;
    this.of = of;
    this.cjs = cjs;
    this.entry = entry;
    this.harmony = harmony;
    this.provided = provided;
  }
}

class Dependent extends Edge {}
class Dependency extends Edge {}
class ModuleNode {
  name;
  depth;
  module;
  dependents;
  dependencies;
  constructor(name) {
    this.name = name;
    this.depth = null;
    this.module = null;
    this.dependents = new Array();
    this.dependencies = new Array();
  }
}

const normalPath = new RegExp(/^\.\/.*(\.js|\.ts|\.mjs|\.cjs)$/);

// Will make all re-run (see below)
var allRun = false;

// toRun returns true if variable is not set properly. Wrap your variable in an object so we can get its variable name.
// toRun was used to not rerun algos while developing in firefox code thingy.
function toRun(variable) {
  console.log(`Checking ${Object.keys(variable)}`)
  const access = Object.values(variable)[0];
  if(allRun) {
    console.log(`Setting ${Object.keys(variable)}`)
    return true;
  }
  if(access === 0 || access === false) return false;
  if(!access || access === true) {
    console.log(`Setting ${Object.keys(variable)}`)
    return true;
  }
  return false
}

// incDict will either initialize a key to 1 or increment. Good for counting unique unique values.
function addDict(dict, key, value) {
  if(dict[key] === undefined) dict[key] = value;
  else dict[key] += value;
}
// shortcut to above, unfavored
function incDict(dict, key) {
  addDict(dict, key, 1);
}

// like addDict but we're making a list
function pushDict(dict, key, value) {
  if(dict[key] === undefined) dict[key] = [value];
  else dict[key].push(value);
}

// countUniqueValues will find items that have key and count frequency of their values, returning a dictionary.
function countUniqueValues(items, key) {
  var values = {};
  if(!Array.isArray(items)) items = Object.keys(items);
  items.forEach((item) => {
    if(item[key] !== undefined) {
      incDict(values, item[key])
    }
  })
  return values;
}

// this should be a class called report
// Statistics
var json_object;
var all_mods;
var mod_types;
var mod_names;
var mod_by_file;
// Very good reason breakdown
// all reasons
var all_reasons;
// all reason types and all reasons there
var all_reason_types;
// all unique reasons and their frequency
var count_all_reason_types;
// total number of reasons and its modules (not frequency among modules)
var reason_counts;
// # of unique reasons types and its modules ( not frequency among modules )
var reason_unique_type_counts;
// # of reasons and its modules grouped by depth
var reason_counts_by_depth;

var inconsistentReasons;
var weirdResolvedModule;

var self_referring_types;
var weirdNames;
var weirdResolvedModule2;
var module_index;

function analyzeWebpack(obj) {

  allRun = true;
  if(toRun({all_mods}) || obj) {
    if (obj) {
      json_object = obj;
    }
    if (!obj && !json_object) {
      json_object = window.json_browser.get_tuple().object;
    }
    all_mods = json_object["modules"];
  }


  if (toRun({mod_types})) {
    mod_types = countUniqueValues(all_mods, "type")
  }


  if(toRun({mod_names})) {
    mod_names = countUniqueValues(all_mods, "name")
  }

  // Let's get the mods that are just files:

  if(toRun({mod_by_file})) {
    mod_by_file = {};
    // TODO: Check Skipped
    all_mods.forEach((mod) => {
      if(!mod.name) return;
      if(normalPath.test(mod.name)) {
        mod_by_file[mod.name] = mod;
      }
    })
  }

  if(toRun({all_reason_types}) ||
    toRun({all_reasons}) ||
    toRun({count_all_reason_types}) ||
    toRun({reason_counts}) ||
    toRun({reason_unique_type_counts}) ||
    toRun({reason_counts_by_depth})) {
    all_reasons = [];
    all_reason_types = {};
    count_all_reason_types = {};
    reason_counts = {};
    reason_unique_type_counts = {};
    reason_counts_by_depth = [];
    Object.values(mod_by_file).forEach((mod) => {
      if (!reason_counts_by_depth[mod.depth]) {
        reason_counts_by_depth[mod.depth] = {};
      }
      // total number of reasons and its frequency among modules
      pushDict(reason_counts, mod.reasons.length, mod);
      pushDict(reason_counts_by_depth[mod.depth], mod.reasons.length, mod);
      let temp_dict = countUniqueValues(mod.reasons, "type");
      mod.reasons.forEach((reason) => {
        all_reasons.push(reason);
        pushDict(all_reason_types, reason.type, {"holdingModule":mod,"reason":reason})
      });
      // # of unique reasons and its frequency among modules
      pushDict(reason_unique_type_counts, Object.keys(temp_dict).length, mod);
      for (const key in temp_dict) {
        // all unique reasons and their frequency
        addDict(count_all_reason_types, key, temp_dict[key]);
      }
    });
  }
  // Most of that is interesting to look at w/ certain filters on folders
  if(toRun({inconsistentReasons}) || toRun({weirdResolvedModule})) {
    inconsistentReasons = [];
    weirdResolvedModule = [];
    all_reasons.forEach((reason) => {
      // this seems to be a good way to resolve reasons
      if (!normalPath.test(reason.resolvedModule)) {
        weirdResolvedModule.push(reason);
      }
      if(reason.resolvedModule !== reason.module) {
        inconsistentReasons.push(reason);
      }
    });
  }

  if (toRun({self_referring_types}) ||
    toRun({weirdNames}) ||
    toRun({weirdResolvedModule2})) {
    self_referring_types = {};
    weirdNames = [];
    weirdResolvedModule2 = [];
    for (let type in all_reason_types) {
      all_reason_types[type].forEach((tuple) => {
        if (tuple["holdingModule"].name === tuple["reason"].resolvedModule) {
          pushDict(self_referring_types, type, tuple['holdingModule']);
        }
        if (!normalPath.test(tuple["holdingModule"].name) || !normalPath.test(tuple["reason"].resolvedModule)) {
          weirdNames.push(tuple["holdingModule"].name);
          weirdResolvedModule2.push(
            tuple["reason"].resolvedModule
          );
        }
      });
    }
  }
  console.log(weirdNames)
  console.log(weirdResolvedModule2);
  // these two are good, but it will still double some things up
  console.log(self_referring_types);
  // we also have module_by_name to work with

  if(toRun({module_index})) {
    module_index = {};
    for (let type in all_reason_types) {
      all_reason_types[type].forEach((tuple) => {
        var holding = tuple["holdingModule"];
        var reason = tuple["reason"];
        if (!normalPath.test(holding.name) || !normalPath.test(reason.resolvedModule)) {
          return;
        }
        if (holding.name === reason.resolvedModule) {
          return;
        }
        if (module_index[holding.name] === undefined) {
          module_index[holding.name] = new ModuleNode(holding.name);
        }
        var holdingMod = module_index[holding.name];
        holdingMod.depth = holding.depth;
        holdingMod.module = holding;
        holdingMod.dependents.push(new Dependent(reason.resolvedModule, holding.name,
          cjs_types.includes(reason.type),
          harmony_types.includes(reason.type),
          entry_types.includes(reason.type),
          provided_types.includes(reason.type)));
        if (module_index[reason.resolvedModule] === undefined) {
          module_index[reason.resolvedModule] = new ModuleNode(reason.resolvedModule);
        }
        var reasonMod = module_index[reason.resolvedModule];
        reasonMod.dependencies.push(new Dependency(holding.name, reason.resolvedModule,
          cjs_types.includes(reason.type),
          harmony_types.includes(reason.type),
          entry_types.includes(reason.type),
          provided_types.includes(reason.type)));

      });
    }
  } // search all for duplicate reasons


  // we'll create a dictionary of names to relationships
  // relationship is two types, dependants, dependencies
  // relationship will also have several properties provided above
  // after that we have to create a tree of paths
  // selected parts of the tree wil generate the whole node graph
  // well match names to their proper path



  console.log(inconsistentReasons);
  console.log(weirdResolvedModule);
  console.log(all_reason_types);
  console.log(count_all_reason_types);
  console.log(reason_counts);
  console.log(reason_unique_type_counts);
  console.log(reason_counts_by_depth); // Interesting to graph, better w/o filters

  // key point: development vs produciton build, do both require debug. Who is calling in debug?

  // Get all modules for which I'm a reason

  // folders with index.js
  // folders w/ no index.js, all files
  // measure tanglemant by how many people skip to my immediate folder
}

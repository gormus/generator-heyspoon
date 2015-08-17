# generator-heyspoon

Yeoman generator for the Heyspoon project.

## Install
Since the generator hasn't been published at npmjs.com yet, you will have to clone the generator to your local environment and link it to your local node repository.

Then, you will be able to use the generator as usual.

```bash
# Clone generator somewhere safe.
$ git clone git@github.com:Project6Design/generator-heyspoon.git .

# Configure generator as a global project and symlink to your local.
$ cd generator-heyspoon
$ npm link
```

Now it should be ready to use in your project.

```bash
$ cd my_project/
$ yo heyspoon
```

Project scaffold should have been created and all dependencies automatically installed. If it fails, try running the command yourself.

```bash
$ npm install
$ bower install
```


## How to use

### Available Tasks 

#### Builds the app, opens it in a browser window and watches the file changes
``` 
$ grunt 
```
or 
``` 
$ grunt default
```

#### Builds the _optimized_ and _minified_ app in ```build``` directory, opens it in a browser window and watches the file changes 
```
$ grunt serve:dist
```

### Using sub-generators
Each sub-generator interacts with the end user by asking relevant questions for each generator to use collected information for generating assets at their pre-defined locations.

#### Available generators 
```bash
$ yo heyspoon:collection
$ yo heyspoon:collectionview
$ yo heyspoon:compositeview
$ yo heyspoon:controller
$ yo heyspoon:itemview
$ yo heyspoon:layout
$ yo heyspoon:model
$ yo heyspoon:region
$ yo heyspoon:router
$ yo heyspoon:tpl
$ yo heyspoon:view
```

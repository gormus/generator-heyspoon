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

### Build the app 
``` 
$ grunt 
```
or 
``` 
$ grunt default
```

### Build the app, open it in a browser window and watch for changes 
```
$ grunt serve
```

### Build the _optimized_ and _minified_ app in ```build``` directory, open it in a browser window and watch for changes 
```
$ grunt serve:dist
```

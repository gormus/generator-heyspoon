# <%= app_name %> - v<%= app_version %>

## Available Tasks 

### Builds the app, opens it in a browser window and watches the file changes
``` 
$ grunt 
```
or 
``` 
$ grunt default
```

### Builds the _optimized_ and _minified_ app in ```build``` directory, opens it in a browser window and watches the file changes 
```
$ grunt serve:dist
```

## Using sub-generators
Each sub-generator interacts with the end user by asking relevant questions for each generator to use collected information for generating assets at their pre-defined locations.

### Available generators 
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

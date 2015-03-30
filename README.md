# GLTextfield
## Overview
An interface to both view and edit either a single or multiple option selections. It provides both an editable input field as well as a static visual view.

## States

* Unfocused
* Focused
* Invalid
* Invalid + Message
* disabled
* View  - (label + value) and is not an option for password type
* Empty (image/text placeholder)

## HTML

    <gl-multi-select api="myApi" settings="mySettings"></gl-multi-select>

## Settings

* name - required by angular forms
* placeholder
* disabled
* editable
* label - View label
* value - a string for single, and an array for multi modes.
* valid - true/false
* error - init with an error message. requires valid to be false in order to be displayed
* onChange = define a event handler for onChange. We fire this when the value actually changes unlike native browsers which only call it on blur

### Example 

    var mySettings = {
      name: "myOptions",
      editable: true,
      label: "name",
      placeholder: "Pick something",
      value: "cats",
      invalid: false,
      disabled: false,
      onChange: function(newValue,oldValue){ 
        console.log(newValue);  
      }
    };

## API Methods

* view
* edit
* setLabel
* getLabel
* setValue
* getValue
* setInvalid
* setValid
* enable
* disable

### Example API

    var myApi = {};
    
    // Api Method call examples
    myApi.disable();     // Disabled the input field leaving text visible but not editable.
    myApi.enable();      // Enables editing of the input field
    myApi.setValue("dogs");  // Sets the value of the input field
    myApi.getValue();       // returns "abc", the value of the input field
    myApi.setInvalid();   // adds the "gl-invalid" input class.
    myApi.setInvalid("Danger");   // adds the "gl-invalid" input class plus displays the invalid message text.
    myApi.edit();        // enables edit mode
    myApi.view();        // enables view mode
    myApi.setLabel("MyLabel");    // Sets the view mode label text
    myApi.getLabel();     // returns "MyLable"

    
## Image placeholder CSS


### Example

    .my-textfield input.gl-empty {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz...);
        background-position-x: 0px;
        background-position-y: 0px;
        background-repeat: no-repeat;
        background-size : 30px 30px;
      }

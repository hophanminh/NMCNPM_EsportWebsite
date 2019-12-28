function saveFn(data, userData) {
    var json = JSON.stringify(data)
    //$('.title').text('POST ' + userData + ' ' + json)
    jQuery.ajax("http://localhost:3000"+userData, {contentType: 'application/json',
                                  dataType: 'json',
                                  type: 'post',
                                  data: json,
                                  timeout: 3000 // sets timeout to 3 seconds
                                },)
    
}



/* Edit function is called when team label is clicked */
function edit_fn(container, data, doneCb) {
      var input = $('<input type="text">')
      input.val(data ? data.name + ':' + data.ID : '')
      container.html(input)
      input.focus()
      input.blur(function() {
        var inputValue = input.val()
        if (inputValue.length === 0) {
          doneCb(null); // Drop the team and replace with BYE
        } else {
          var nameAndID = inputValue.split(':') // Expects correct input
          doneCb({name: NameAndID[0], id: NameAndID[1]})
        }
      })
    }
    
  /* Render function is called for each team label when data is changed, data
   * contains the data object given in init and belonging to this slot.
   *
   * 'state' is one of the following strings:
   * - empty-bye: No data or score and there won't team advancing to this place
   * - empty-tbd: No data or score yet. A team will advance here later
   * - entry-no-score: Data available, but no score given yet
   * - entry-default-win: Data available, score will never be given as opponent is BYE
   * - entry-complete: Data and score available
   */
  function render_fn(container, data, score, state) {
    switch(state) {
      case "empty-bye":
        container.append("No team")
        return;
      case "empty-tbd":
        container.append("Upcoming")
        return;
   
      case "entry-no-score":
      case "entry-default-win":
      case "entry-complete":
        container.append(data.name)
        return;
    }
  }
function init(doubleElimination) {
    $('.bracket').bracket({
        centerConnectors: true,
        teamWidth: 80,
        scoreWidth: 40,
        matchMargin: 42,
        roundMargin: 20,
        skipSecondaryFinal: true,
        init: doubleElimination, /* data to initialize the bracket with */

        save: saveFn,
        decorator: {edit: edit_fn,
                    render: render_fn},
        disableToolbar: true,
        disableTeamEdit: true,
        userData: "/",
    })
}

function initGuest(doubleElimination) {
  $('.bracket').bracket({
      centerConnectors: true,
      teamWidth: 80,
      scoreWidth: 40,
      matchMargin: 42,
      roundMargin: 20,
      skipSecondaryFinal: true,
      init: doubleElimination, /* data to initialize the bracket with */
  })
}
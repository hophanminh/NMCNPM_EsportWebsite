var doubleElimination = {
    teams: [
        [{name: "Team 1", ID: 1}, {name: "Team 2", ID: 2}],
        [{name: "Team 3", ID: 3}, {name: "Team 4", ID: 4}],
        [{name: "Team 5", ID: 5}, {name: "Team 6", ID: 6}],
        [{name: "Team 7", ID: 7}, {name: "Team 8", ID: 8}],
        [{name: "Team 9", ID: 9}, {name: "Team 10", ID: 10}],
        [{name: "Team 11", ID: 11}, {name: "Team 12", ID: 12}],
        [{name: "Team 13", ID: 13}, {name: "Team 14", ID: 14}],
        [{name: "Team 15", ID: 15}, {name: "Team 16", ID: 16}],
    ],
    results: [[ /* WINNER BRACKET */
        // 8 team
        /*[[3, 5], [2, 4], [6, 3], [2, 3]],
        [[1, 2], [3, 4]],
        [[null, null]],*/

        // 16 team
        [[3, 5], [2, 4], [6, 3], [2, 3], [1, 5], [5, 3], [7, 2], [1, 2]],
        [[1, 2], [3, 4], [5, 6], [7, 8]],
        [[null, null], [null, null]],
        [[null, null]]
    ], [         /* LOSER BRACKET */
        // 8 team
        /*[[5, 1], [1, 2]],
        [[8, 2], [1, 2]],
        [[null, null]],
        [[null, null]],
        [[null, null]]*/
    
        // 16 team
        [[5, 1], [1, 2], [3, 2], [6, 9]],
        [[8, 2], [1, 2], [6, 2], [1, 3]],
        [[null, null], [null, null]],
        [[null, null], [null, null]],
        [[null, null]],
        [[null, null]]
    ], [         /* FINALS */
        [[3, 8], [1, 2]],
        [[2, 1]]
    ]]
}


function saveFn(data, userData) {
    var json = JSON.stringify(data)
    //$('.title').text('POST ' + userData + ' ' + json)
    jQuery.ajax("http://localhost:3000"+userData, {contentType: 'application/json',
                                  dataType: 'json',
                                  type: 'post',
                                  data: json})
    
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
$(function init() {
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

})

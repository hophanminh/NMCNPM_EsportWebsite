var doubleElimination = {
    teams: [
        ["Team 1", "Team 2"],
        ["Team 3", "Team 4"],
        ["Team 5", "Team 6"],
        ["Team 7", "Team 8"],
        ["Team 9", "Team 10"],
        ["Team 11", "Team 12"],
        ["Team 13", "Team 14"],
        ["Team 15", "Team 16"]
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
        disableToolbar: true,
        disableTeamEdit: false,
        userData: "/",
        
    })

})

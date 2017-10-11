var mornData;
var eveData;

angular.module("myApp",[]).controller("routeController",function($scope, $http){
                
            $scope.fetch=function(){
                
                if($scope.location == undefined) {
					alert('Please select your DC!');
				}
                //write validation for DC selection 

                else {
						$('#menu').css('display','block');
						var loc = $scope.location;
						var morn_file = 'morning_' + loc + '.json';
						var eve_file = 'evening_' + loc + '.json';
						$http.get(morn_file).then(
							function(response) {
								mornData = response.data;
							},
							function() {
								alert("Response not found");
							}
						);
						$http.get(eve_file).then(
							function(response) {
								eveData = response.data;
							},
							function() {
								alert("Response not found");
							}
						);
					}
					
				
                //write $http calls to fetch the files corresponding to the DC selected   
                       
            }    
                        

});


            $(function () {
               
                $("li>a").click(function (e) {
						$("a").removeClass('active');
						$(this).addClass('active');

                        if (e.target.innerHTML == "Morning Pickup") {
							dispMorningSchedule(mornData);
							}
                            //invoke function for morning schedule with appropriate parameter(s)
							
                        else if (e.target.innerHTML == "Evening Drop") {
							dispEveningSchedule(eveData);
							}
                            //invoke function for evening schedule with appropriate parameter(s)
							
                        else if(e.target.innerHTML == "Weekend Schedule") {
							var cont = "<p id='message'><b> No schedule for the weekend, Enjoy your weekend! </b></p>"
							$('#content').html(cont).show();
							$('#message').css('font-size','3em');
							
							
						}
						else if(e.target.innerHTML == "Home") {
								location.reload();
								$('#menu').css('display','none');
								
						}
                    
                });
            });

// function for displaying morning schedule

            function dispMorningSchedule(jsonresponse) {
                var schedule = "<table border='1'><tr><th>RouteNumber</th><th>Driver Name</th><th>Mobile Number</th><th>Time</th><th>Place</th></tr>";
                $.each(jsonresponse, function (ind, field) {
                    console.dir(field);
                    var times = field.time.toString().split(",");
                    var time = "";
                    for (var i = 0; i < times.length; i++)
                        time += times[i] + "<hr/>";

                    var places = field.place.toString().split(",");
                    var place = "";
                    for (var i = 0; i < places.length; i++)
                        place += places[i] + "<hr/>";

                    schedule += "<tr><td>" + field.route + "</td><td>" +
                            field.driver + "</td><td>" + field.mobile + "</td><td>" +
                            time + "</td><td>" + place + "</td></tr>";
                });
                schedule += "</table>";
                $("#content").html(schedule).show();
            }

// function for displaying evening schedule

            function dispEveningSchedule(jsonresponse) {
                var schedule = "<table border='1'><tr><th>RouteNumber</th><th>Driver Name</th><th>Mobile Number</th><th>Time</th><th>Place</th></tr>";
                $.each(jsonresponse, function (ind, field) {
                    console.dir(field);
                    var times = field.time.toString().split(",");
                    var time = "";
                    for (var i = 0; i < times.length; i++)
                        time += times[i] + "<hr/>";

                    var places = field.place.toString().split(",");
                    var place = "";
                    for (var i = 0; i < places.length; i++)
                        place += places[i] + "<hr/>";

                    schedule += "<tr><td>" + field.route + "</td><td>" +
                            field.driver + "</td><td>" + field.mobile + "</td><td>" +
                            time + "</td><td>" + place + "</td></tr>";
                });
                schedule += "</table>";
                $("#content").html(schedule).show();
            }

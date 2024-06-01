$(document).ready(function() {
    // Initialize objects to store checked IDs
    let checkedAmenities = {};
    let checkedStates = {};
    let checkedCities = {};

    // Listen for changes on any input checkbox
    $(document).on('change', "input[type='checkbox']", function() {
        // Determine if the checkbox is for amenities, states, or cities
        if ($(this).closest('.amenities').length) {
            updateCheckedItems(this, checkedAmenities, 'div.amenities > h4');
        } else if ($(this).closest('.locations').find('h3').text() === 'States') {
            updateCheckedItems(this, checkedStates, 'div.locations > h4');
        } else {
            updateCheckedItems(this, checkedCities, 'div.locations > h4');
        }
    });

    // Function to update checked items and display
    function updateCheckedItems(checkbox, checkedItems, displaySelector) {
        if (checkbox.checked) {
            checkedItems[$(checkbox).data('id')] = $(checkbox).data('name');
        } else {
            delete checkedItems[$(checkbox).data('id')];
        }

        let itemNames = Object.values(checkedItems);
        if (itemNames.length > 0) {
            $(displaySelector).text(itemNames.join(', '));
        } else {
            $(displaySelector).html('&nbsp;');
        }
    }
    
// Task 3:
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
	    $('#api_status').addClass('available');
    } else {
	    $('#api_status').removeClass('available');
    }
    });

// // Task 4:
//     $.ajax({
// 	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
// 	    type: 'POST',
// 	    contentType: 'application/json',
// 	    data: JSON.stringify({}),
// 	    success: function(response) {
// 		    response.forEach(function(place) {
// 			    const article = `
// 			    	<article>
//                             		<div class="title_box">
//                                 	<h2>${place.name}</h2>
//                                 	<div class="price_by_night">$${place.price_by_night}</div>
//                             		</div>
//                             		<div class="information">
//                                 	<div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
//                                 	<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
//                                 	<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
//                             		</div>
//                             		<div class="user">
//                                 	<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
//                             		</div>
//                             		<div class="description">
//                                 		${place.description}
//                             		</div>
//                         		</article>
// 			    `;
// 			    $('section.places').append(article);
// 		    });
// 	    }

//     });
// });


  // fetchPlaces function modified to include other filters
  function fetchPlaces(filters = {}) {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(filters),
        success: function(response) {
            $('section.places').empty(); // Clear existing places
            response.forEach(function(place) {
                const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `;
                $('section.places').append(article);
            });
        }
    });
}

// Initial fetch with no filters
fetchPlaces();

// Fetch places when search button is clicked
$('button').click(function() {
    let filters = {
        amenities: Object.keys(checkedAmenities),
        states: Object.keys(checkedStates),
        cities: Object.keys(checkedCities)
    };
    fetchPlaces(filters);
});
});
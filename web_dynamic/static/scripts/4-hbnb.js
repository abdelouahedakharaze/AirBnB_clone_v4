// Execute script when DOM is loaded
$(document).ready(function() {
    // Initialize an empty object to store checked Amenity IDs
    let checkedAmenities = {};

    // Listen for changes on any input checkbox
    $(document).on('change', "input[type='checkbox']", function() {
        // If the checkbox is checked, add its ID and name to the checkedAmenities object
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } 
        // If the checkbox is unchecked, remove its ID from the checkedAmenities object
        else {
            delete checkedAmenities[$(this).data('id')];
        }

        // Get an array of checked Amenity names
        let amenityNames = Object.values(checkedAmenities);

        // Update the displayed list of checked amenities
        if (amenityNames.length > 0) {
            // Display the list of checked amenities separated by commas
            $('div.amenities > h4').text(amenityNames.join(', '));
        } else {
            // If no amenities are checked, display a placeholder
            $('div.amenities > h4').html('&nbsp;');
        }
    });
    
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

 // Task mofied for task 5:
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
        amenities: Object.keys(checkedAmenities)
    };
    fetchPlaces(filters);
});
});

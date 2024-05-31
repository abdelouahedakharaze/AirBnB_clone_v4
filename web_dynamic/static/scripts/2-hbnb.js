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
});

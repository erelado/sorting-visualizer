//#region    Color Map
color_default = "#ADD8E6"
color_focus = "#185ADB"
color_min = "#FF616D"
color_pass_through = "#F3C583"
color_switch_mark = "#E8E46E"
color_success = "#B3E283"
//#endregion Color Map

function bubble() {
    set_timeout_delay = 0;

    if(regenerate) {
        generate_array();
    }

    for(var i=0; i < array_size-1; i++) {
        for(var j=0; j < array_size-i-1; j++) {

            div_update(divs[j], div_sizes[j], color_focus, false); // currently scanning through

            if(div_sizes[j] > div_sizes[j+1]) { // found a higher value
                div_update(divs[j+1], div_sizes[j+1], color_switch_mark, true); // mark the higher value
                div_update(divs[j], div_sizes[j], color_switch_mark, false); // mark the lower value

                // swap between the height values
                var temp       = div_sizes[j];
                div_sizes[j]   = div_sizes[j+1];
                div_sizes[j+1] = temp;

                div_update(divs[j], div_sizes[j], color_default, true); // lower value returns to original color
                div_update(divs[j+1], div_sizes[j+1], color_focus, false); // continues the scan with higher value
            } else { // did not found a higher value -> returns to original color
                div_update(divs[j], div_sizes[j], color_default, true);
            }
        }
        div_update(divs[j], div_sizes[j], color_success, true); // success! (got to the end)
    }
    div_update(divs[0], div_sizes[0], color_success, true); // update the last one

    regenerate = true
}

function selection() {
    set_timeout_delay = 0;

    if(regenerate) {
        generate_array();
    }

    for(var i=0; i < array_size; i++)
    {
        div_update(divs[i], div_sizes[i], color_min, true); // current min

        for(var j=i+1; j < array_size; j++) {

            div_update(divs[j], div_sizes[j], color_focus, true); // currently scanning through

            if(div_sizes[j] < div_sizes[i]) { // found a lower value
                div_update(divs[j], div_sizes[j], color_switch_mark, true); // mark the lower value
                div_update(divs[i], div_sizes[i], color_switch_mark, false); // mark the current min value

                // swap between the values
                var temp     = div_sizes[i];
                div_sizes[i] = div_sizes[j];
                div_sizes[j] = temp;

                div_update(divs[i], div_sizes[i], color_min, true);
                div_update(divs[j], div_sizes[j], color_default, false);
            }

            div_update(divs[j], div_sizes[j], color_default, true);
        }
        div_update(divs[i], div_sizes[i], color_success, false); // current min
    }
    regenerate = true
}

function insertion() {
    set_timeout_delay = 0;

    if(regenerate) {
        generate_array();
    }
    
    // set the first element as sorted
    div_update(divs[0], div_sizes[0], color_success, true);

    for(var i=1; i < array_size; i++)
    {
        div_update(divs[i], div_sizes[i], color_focus, true); // currently scanning through
        
        swaps_counter = 0; // count how many swaps are needed

        for(var j = i-1; j >= 0; j--) {
            if(div_sizes[j] > div_sizes[i]) {
                swaps_counter++;

                div_update(divs[j], div_sizes[j], color_pass_through, true); // number is higher than current
            } else
                break;
        }

        for(var j=i; j > i-swaps_counter; j--) {
            div_update(divs[j], div_sizes[j], color_switch_mark, true); // mark the lower value
            div_update(divs[j-1], div_sizes[j-1], color_switch_mark, false); // mark the current min value

            // swap between the values
            var temp       = div_sizes[j-1];
            div_sizes[j-1] = div_sizes[j];
            div_sizes[j]   = temp;

            div_update(divs[j], div_sizes[j], color_success, true);
            div_update(divs[j-1], div_sizes[j-1], color_success, false);
        }
        div_update(divs[i], div_sizes[i], color_success, false); // currently scanning through
    }
    regenerate = true
}

function merge() {
    set_timeout_delay = 0;
    
    if(regenerate) {
        generate_array();
    }

    merge_sort(0, array_size - 1);

    regenerate = true
}

function merge_sort(start, end)
{
    if(start < end)
    {
        var middle = Math.floor((start + end) / 2);

        div_update(divs[middle], div_sizes[middle], color_focus, true); // add the right value

        merge_sort(start, middle);   // left side
        merge_sort(middle + 1, end); // right side

        merge_sort_partition(start, middle, end);
    }
}

function merge_sort_partition(start, middle, end)
{
    var p            = start
    var q            = middle + 1;
    
    let sorted_array = [];
    var sorted_index = 0;

    for(var i = start; i <= end; i++) {
        if (p > middle) { // edge case: gone trough all of the left side of the sub-array
            sorted_array[sorted_index++] = div_sizes[q]; // add the right value
            div_update(divs[q], div_sizes[q], color_switch_mark, true);
            q++;
        } else if (q > end) { // edge case: gone trough all of the right side of the sub-array
            sorted_array[sorted_index++] = div_sizes[p]; // add the left value
            div_update(divs[p],div_sizes[p], color_switch_mark, true);
            p++;
        }
        
        // check which value of the two is smaller, and add it to the sorted array
        else if (div_sizes[p] < div_sizes[q]) {
            sorted_array[sorted_index++] = div_sizes[p];
            div_update(divs[p], div_sizes[p], color_switch_mark, true);
            p++;
        } else {
            sorted_array[sorted_index++] = div_sizes[q];
            div_update(divs[q], div_sizes[q], color_switch_mark, true);
            q++;
        }
    }

    // update the values in the original array (using the already-sorted array)
    for(var i = 0; i < sorted_index; i++) {
        div_sizes[start] = sorted_array[i];
        if(sorted_index == array_size)
            div_update(divs[start], div_sizes[start], color_success, true);
        else
            div_update(divs[start], div_sizes[start], color_pass_through, true);
        start++;
    }
}

function quick() {
    set_timeout_delay = 0;

    if(regenerate) {
        generate_array();
    }

    quick_sort(0, array_size - 1);

    regenerate = true
}

function quick_sort (start, end)
{
    if(start < end)
    {
        var pivot_position = quick_sort_partition(start, end); //stores the position of pivot element
        quick_sort(start, pivot_position - 1); //sorts the left side of pivot
        quick_sort(pivot_position + 1, end); //sorts the right side of pivot
    }
}

function quick_sort_partition (start, end) {
    var i     = start + 1;
    var pivot = div_sizes[start]; // set first element as pivot

    div_update(divs[start], div_sizes[start], color_min, false);

    for(var j = i; j <= end; j++)
    {
        div_update(divs[j], div_sizes[j], color_focus, true);
        // re-arrange the array:
        // moves elements which are less than pivot to the left
        // moves elements which are more than pivot to the right
        if (div_sizes[j] < pivot)
        {
            if(i == j) {
                div_update(divs[j], div_sizes[j], color_pass_through, true);
            } else {
                div_update(divs[i], div_sizes[i], color_switch_mark, true);
                div_update(divs[j], div_sizes[j], color_switch_mark, false);

                // swap between the values
                var temp     = div_sizes[i];
                div_sizes[i] = div_sizes[j];
                div_sizes[j] = temp;

                div_update(divs[i], div_sizes[i], color_pass_through, true);
                div_update(divs[j], div_sizes[j], color_default, false);
            }
            i += 1;
        }
        div_update(divs[j], div_sizes[j], color_default, true);
    }

    // finally - switches the pivot element to its proper place.
    div_update(divs[start], div_sizes[start], color_switch_mark, true);
    div_update(divs[i-1], div_sizes[i-1], color_switch_mark, false);

    var temp         = div_sizes[start];
    div_sizes[start] = div_sizes[i-1];
    div_sizes[i-1]   = temp;

    div_update(divs[start], div_sizes[start], color_min, true);
    div_update(divs[i-1], div_sizes[i-1], color_success, false);

    for(var k = start; k <= i; k++)
    {
        div_update(divs[k], div_sizes[k], color_success, true);
    }

    return i-1; // return the position of the pivot
}

function counting() {
    set_timeout_delay = 0;

    if(regenerate) {
        generate_array();
    }

    var counter_array = new Array(array_height_max + visual_min_height).fill(0);

    for(var i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], color_focus, false); // currently scanning through
        
        counter_array[div_sizes[i]]++; // count how many swaps are needed

        div_sizes[i] = visual_min_height - 1;
        div_update(divs[i], div_sizes[i], color_default, true);
    }

    var position = 0;

    for(var i = 1; i < counter_array.length; i++) {
        while(counter_array[i] > 0) {
            counter_array[i]--;
            
            div_update(divs[position], div_sizes[position], color_switch_mark, true); // mark the value

            // swap between the values
            div_sizes[position] = i;

            div_update(divs[position], div_sizes[position], color_success, true); // updated value

            position++;
        }
    }
    regenerate = true
}
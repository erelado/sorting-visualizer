/*
Variable naming convention: <object>_<action>_<objectname>; Example -> Button_click_b1;
*/

//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var size_control       = document.getElementById('array-size-control');
var array_size         = size_control.value;
var speed_control      = document.getElementById("speed-control");
var generate_btn       = document.getElementById("generate-new-array-btn");
var algorithms_buttons = document.querySelectorAll("#algorithms a");

var div_sizes          = [];
var divs               = [];
var viz_canvas         = document.getElementById("visualizer-canvas");
var regenerate         = false

visual_min_height      = 2
array_height_max       = (size_control.max - size_control.min) * 3

//Array generation and updation.
generate_btn.addEventListener("click", generate_array);
size_control.addEventListener("input", update_array_size);

function generate_array()
{
    regenerate           = false
    div_sizes            = [];
    divs                 = [];
    viz_canvas.innerHTML = "";

    for(var i = 0; i < array_size; i++)
    {
        divs[i] = document.createElement("div");
        divs[i].classList.add("bar");

        // add height value
        div_sizes[i]  = Math.floor(Math.random() * array_height_max) + visual_min_height;
        divs[i].style = "height:" + div_sizes[i] + "rem;";

        // display nummeric value
        var child         = document.createElement("span");
        child.textContent = div_sizes[i] - (visual_min_height - 1);
        divs[i].appendChild(child);
        
        viz_canvas.appendChild(divs[i]);
    }
}

function update_array_size()
{
    array_size = size_control.value;
    generate_array();
}

window.onload = update_array_size();

// Running the correct algorithm.
for(var i = 0; i < algorithms_buttons.length; i++)
{
    algorithms_buttons[i].addEventListener("click", run_algorithm);
}

function run_algorithm()
{
    this.classList.add("selected-algorithm");

    switch(this.innerHTML)
    {
        case "Bubble":
            bubble();
            break;
        case "Selection":
            selection();
            break;
        case "Insertion":
            insertion();
            break;
        case "Merge":
            merge();
            break;
        case "Quick":
            quick();
            break;
        case "Counting":
            counting();
            break;
    }
}
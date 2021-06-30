var delay_time = 420 - (20 * speed_control.value);
speed_control.addEventListener("input", animation_speed);

function animation_speed()
{
    delay_time = 420 - (20 * speed_control.value);
}

var set_timeout_delay = 0; //This is updated on every div change so that visualization is visible.

function div_update(bar, height, color, delay)
{
    window.setTimeout(function() {
        bar.style = "background-color:" + color + "; height:" + height + "rem;";
        bar.childNodes[0].textContent = height - (visual_min_height - 1);

    }, (delay ? set_timeout_delay += delay_time : set_timeout_delay += 0));
}
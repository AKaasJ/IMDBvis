/**
 * Created by cristiprg on 24-1-16.
 */

function initializeApplication(){

    // compute the common cast only if necessary (as in not already computed)
    if (!localStorage.commonCast) {
        computeCommonCast();
    }
    else {
        console.log(localStorage.commonCast);
    }
}

/**
 * Computes for each pair of movies their common cast
 */
function computeCommonCast(){
    $.get("requestHandlers/getCommonCast.php", function (data) {
        // store the common cast locally in JSON format
        localStorage.commonCast = data;
    })
}

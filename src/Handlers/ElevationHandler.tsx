declare global {
    interface Window {
        google: any;
    }
}

const api_key = "AIzaSyASIrA-LYQuwFAjTREObcmw-e_QY3wljQM"
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=Function.prototype`;
document.head.appendChild(script);

interface LatLng {
    lat: number;
    lng: number;
}

function getElevation(path: LatLng[], pathLength: number): any[] {
    const elevator = new window.google.maps.ElevationService();

    return elevator.getElevationAlongPath({
        path: path,
        samples: pathLength,
    }).then(function (response: any) {
       return response;
     })
     .catch(async function (error: any) {
        console.log(error);
        throw error;
     });
}

export default getElevation;
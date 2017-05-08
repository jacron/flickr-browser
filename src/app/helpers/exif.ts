/**
 * Created by orion on 15/03/2017.
 */
export function getExif(exif, camera) {

    function itemContent(item) {
        return item.clean ? item.clean._content : item.raw._content;
    }

    const labels: string[] = [
        "Image Description",
        "Software",
        "Artist",
        "Exposure Program",
        "Exposure Bias",
        "Max Apertue Value",
        "Metering Mode",
        "Flash",
        "Approximate Focus Distance",
        "Subject Distance",
        "Subject Distance Range",
    ];
    const cameras: any = {
        "Canon EOS 5D Mark III": {
            file: "canon5diii.jpg",
            pretty_name: "Canon EOS 5D Mark III",
        },
        "Casio QV-5700": {
            file: "CASIO_QV5700.jpg",
            pretty_name: "Casio QV-5700",
        },
        "Apple iPhone 5": {
            file: "APPLE-iPhone-5s.png",
            pretty_name: "Apple iPhone 5",
        },
        "Ricoh IMAGING COMPANY, LTD. Pentax K-3": {
            file: "PentaxK3.png",
            pretty_name: "Pentax K3",
        },
        "Pentax K10D": {
            file: "PentaxK10D.jpg",
            pretty_name: "Pentax K10D",
        },
        "Sony DSC-RX100M4": {
            file: "sony100rxiv.jpg",
            pretty_name: "Sony DSC-RX100 M4",
        },
    };
    let lensModel: string = null;
    let aperture: string = null;
    let exposure: string = null;
    let iso: string = null;
    let focalLength: string = null;
    const details: string[] = [];

    exif.map((item) => {
        if (item.label === "Lens Model") {
            lensModel = itemContent(item);
        }
        if (item.label === "Aperture") {
            aperture = itemContent(item);
        }
        if (item.label === "Exposure") {
            exposure = itemContent(item);
        }
        if (item.label === "ISO Speed") {
            iso = itemContent(item);
        }
        if (item.label === "Focal Length") {
            focalLength = itemContent(item);
        }
        if (labels.indexOf(item.label) !== -1) {
            const value = itemContent(item);
            details.push(item.label + ": " + value);
        }
    });
    let cameraName: string = "";
    let cameraFile = "";
    if (cameras[camera]) {
        cameraName = cameras[camera].pretty_name;
        cameraFile = cameras[camera].file;
    } else {
        // console.log(camera + " is not known here");
        cameraName = camera;
    }
    return {
        camera: cameraName,
        cameraImage: cameraFile,
        lensModel,
        aperture,
        exposure,
        iso,
        focalLength,
        otherdetails: details,
    };

}

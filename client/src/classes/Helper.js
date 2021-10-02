import L from 'leaflet'

export function generateBoatIcon(color = "black", color2 = "black") {
    return L.divIcon({
        html: `<svg 
 height="24"
  viewBox="0 0 512 512"
   width="24"
   preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg">
    <g>
    <path d="m90.997 364.003h119.998v-216.821l-132.375 193.347c-6.805 9.94.33 23.474 12.377 23.474z" fill="` + color + `"> </path>
    <path d="m488.49 391.572h-224.999v-27.569h149.997c8.28 0 15-6.72 15-15 0-45.429-9.19-87.148-27.32-124.008-29.039-59.049-81.459-104.268-137.677-127.378v-82.608c0-10.61-10.75-17.85-20.55-13.93-.05.02-.09.04-.14.05-4.03 1.66-89.908 36.969-90.008 37.009-12.31 5.06-12.39 22.51-.13 27.69l80.829 34.129v291.615h-209.994c-9.217 0-16.388 8.233-14.803 17.86 16.103 105.627 13.38 87.765 13.693 89.818 1.112 7.331 7.414 12.75 14.83 12.75h335.291c51.636 0 97.805-29.107 120.101-73.312.075.006.152.007.227.013 4.44-8.93 7.89-18.39 10.24-28.21 2.365-9.88-4.925-18.919-14.587-18.919zm-224.999-248.235c40.059 49.959 40.119 120.338 0 170.367z" fill="` + color2 + `" ></path>
    </g></svg>`,
        className: "dummy",
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });
}

export function numberToDateString(date, type = 0) {
    if (!type) {
        return date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4);
    }
    if (type === 1) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    }
}

export function numberToTimeString(str) {
    return str.substr(0, 2) + ':' + str.substr(2, 2)
}

export function popupText(position) {
    return '<p style="text-align:center;">' + position.NA +
        '<br>(' + position.LT + ' , ' + position.LG + ')' +
        '<br>' + numberToDateString(position.DA) + " at " + numberToTimeString(position.TI) +
        '</p>'
}


export class Color {
    constructor() {
        this.current = 0;
        this.names = [
            "#00ffff", "#ff00ff", "#ffff00", "#ffffff",
            "#00008b", "#008b8b", "#a9a9a9", "#006400",
            "#9932cc", "#e9967a",
            "#add8e6", "#e0ffff", "#90ee90", "#d3d3d3",
            "#808000", "#ffa500", "#ffc0cb", "#800080",
            "#00ff00", "#0000ff", "#f0ffff", "#f5f5dc",
            "#bdb76b", "#8b008b", "#556b2f", "#ff8c00",
            "#ffd700", "#008000", "#4b0082", "#f0e68c",
            "#ffb6c1", "#ffffe0", "#00ff00", "#000080",
            "#800080", "#c0c0c0",
        ]
    }

    getNext() {
        let val = this.names[this.current];
        this.current++;
        this.current %= this.names.length;
        return val
    }

    shadeHexColor(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent,
            R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

}
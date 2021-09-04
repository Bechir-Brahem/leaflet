class Color {
    constructor() {
        this.current = 0;
        this.names = [
            "#00ffff","#ff00ff","#ffff00","#ffffff", "#ff0000","#00ff00","#0000ff","#f0ffff", "#f5f5dc",  "#a52a2a",
            "#00008b", "#008b8b", "#a9a9a9", "#006400", "#bdb76b", "#8b008b", "#556b2f",
            "#ff8c00", "#9932cc", "#8b0000", "#e9967a", "#9400d3", "#ff00ff", "#ffd700",
            "#008000", "#4b0082", "#f0e68c", "#add8e6", "#e0ffff", "#90ee90", "#d3d3d3",
            "#ffb6c1", "#ffffe0", "#00ff00",  "#800000", "#000080", "#808000",
            "#ffa500", "#ffc0cb", "#800080", "#800080", "#ff0000", "#c0c0c0",
            ]
    }

    getNext() {
        let val = this.names[this.current];
        this.current++;
        this.current %= this.names.length;
        return val
    }
}


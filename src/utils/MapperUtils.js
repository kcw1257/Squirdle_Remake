export const mapGenerationToNumber = (generation) => {
    let romanNumeral = generation.split("-")[1];
    switch (romanNumeral) {
        case "i":
            return "1";
        case "ii":
            return "2";
        case "iii":
            return "3";
        case "iv":
            return "4";
        case "v":
            return "5";
        case "vi":
            return "6";
        case "vii":
            return "7";
        case "viii":
            return "8";
        default:
            throw "value not supported";
    }
};

export default { mapGenerationToNumber };


class UBFParser {
    // Encode JavaScript data to UBF
    encode(data) {
        if (data === null || data === undefined) {
            return "undefined";
        } else if (typeof data === "boolean") {
            return data.toString();
        } else if (typeof data === "number") {
            return data.toString();
        } else if (typeof data === "string") {
            return `"${data}"`;
        } else if (Array.isArray(data)) {
            return `[${data.map(this.encode).join(", ")}]`;
        } else if (typeof data === "object") {
            return `{${Object.entries(data)
                .map(([key, value]) => `${this.encode(key)}, ${this.encode(value)}`)
                .join(", ")}}`;
        } else {
            throw new Error("Unsupported data type");
        }
    }

    // Decode UBF string to JavaScript data
    decode(ubfString) {
        // Simplified UBF parser using a recursive approach
        if (ubfString === "undefined") {
            return null;
        } else if (/^true|false$/.test(ubfString)) {
            return ubfString === "true";
        } else if (/^-?\d+(\.\d+)?$/.test(ubfString)) {
            return parseFloat(ubfString);
        } else if (/^".*"$/.test(ubfString)) {
            return ubfString.slice(1, -1); // Remove quotes
        } else if (/^\[.*\]$/.test(ubfString)) {
            return ubfString
                .slice(1, -1) // Remove square brackets
                .split(", ")
                .map((item) => this.decode(item));
        } else if (/^\{.*\}$/.test(ubfString)) {
            const entries = ubfString
                .slice(1, -1) // Remove curly braces
                .split(", ")
                .map((item) => this.decode(item));
            const obj = {};
            for (let i = 0; i < entries.length; i += 2) {
                obj[entries[i]] = entries[i + 1];
            }
            return obj;
        } else {
            throw new Error("Invalid UBF format");
        }
    }

    // todo: Validate data against a UBF(B) contract
    validate(data, contract) {
    }
}

export default UBFParser


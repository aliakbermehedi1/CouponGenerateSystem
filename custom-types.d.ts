// custom-types.d.ts
interface MyDocument extends Document {
    primeDialogParams?: {
        toSpliced?: () => void;
        // Add other properties or methods if needed
    };
}

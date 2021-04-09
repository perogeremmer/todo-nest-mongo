import { BaseTransformer } from "src/transformer.base"

export class TodoTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            title: element.title,
            description: element.description ?? "",
            timestamp: element.timestamp
        }
    }
}
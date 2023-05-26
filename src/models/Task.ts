import { Field, Key, Model } from "@varasto/orm";

@Model()
export default class Task {
  @Key()
  id?: string;

  @Field({ type: "string" })
  text: string;

  @Field({ type: "boolean" })
  isDone: boolean;

  constructor(text: string, isDone: boolean = false) {
    this.text = text;
    this.isDone = isDone;
  }

  clean() {
    if (this.text.length > 50) {
      this.text = this.text.substring(0, 50);
    }
  }

  toString(): string {
    const parts: string[] = [this.text];

    if (this.isDone) {
      parts.push("(Done)");
    }

    return parts.join(" ");
  }
}

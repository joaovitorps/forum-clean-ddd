export class Slug {
  public text: string;

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Receives a text string and normalize it to a slug
   *
   * Example: This is a slug => this-is-a-slug
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugFromText = text
      .normalize("NFKD")
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "")
      .replace(/^-/g, "");

    return new Slug(slugFromText);
  }
}

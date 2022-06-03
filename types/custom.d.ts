
interface treeTitleObject {
  id: string,
  level: Number,
  title: String | null,
  el: Element<HTMLElement>,
  children: treeTitleObject[],
}

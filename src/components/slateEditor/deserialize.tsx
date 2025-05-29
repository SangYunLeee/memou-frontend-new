import { Element as slateElement } from 'slate'
import { Text } from 'slate';
export function Element({ attributes, children, element } : { attributes: any, children: any, element: slateElement }) {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;

    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;

    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;

    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;

    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;

    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;

    case "link":
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );

    case "list-item":
      return <li {...attributes}>{children}</li>;

    case "image":
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={element.url}
              alt="uploaded"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          {children}
        </div>
      );

    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function Leaf({ attributes, children, leaf } : { attributes: any, children: any, leaf: Text }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.decoration === "link") {
    children = (
      <a
        href={leaf.text.startsWith("http") ? leaf.text : `https://${leaf.text}`}
      >
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
}

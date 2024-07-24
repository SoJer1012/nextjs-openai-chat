import type { MDXComponents } from 'mdx/types'
import { Button } from "./app/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-3xl font-bold">{props.children}</h1>,
    Button,
  }
}

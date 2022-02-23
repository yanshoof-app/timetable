import { Fragment } from 'react'
import SVG, { SVGProps } from './svg'

export type Icon = (props: SVGProps) => JSX.Element

export function createSVGResource(...children: JSX.Element[]): Icon {
  return function Resource(props: SVGProps) {
    return (
      <SVG {...props} className={'fill-current ' + props.className}>
        {children.map((child, i) => (
          <Fragment key={i}>{child}</Fragment>
        ))}
      </SVG>
    )
  }
}

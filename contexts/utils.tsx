import { Context, ReactNode, useContext, useMemo } from 'react'
import { Wrapper } from '../components/types'

/**
 * Create a use hook for a given context
 * @param ctx the context to use
 * @returns the hook that uses it
 */
export function createUseContextHook<T>(ctx: Context<T>) {
  return function useSpecificContext(): T {
    return useContext(ctx)
  }
}

/**
 *
 * @param ctx tue context to use
 * @param shouldRender the context consumer, determining if the children should render
 * @returns a component with the logical wrapping
 */
export function createLogicalWrapper<T>(
  ctx: Context<T>,
  shouldRender: (context: T) => boolean
) {
  return function LogicalWrapper({
    children,
    fallback = null,
  }: {
    fallback?: ReactNode
  } & Wrapper) {
    const context = useContext(ctx)
    const render = useMemo(() => shouldRender(context), [context])
    return <>{render ? children : fallback}</>
  }
}

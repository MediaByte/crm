export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : {}

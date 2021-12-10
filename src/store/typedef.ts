export interface AppState {}


declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}

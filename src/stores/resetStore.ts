import cloneDeep from 'lodash.clonedeep'

export const resetStore = ({ store }: any) => {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => {
    store.$patch(($state: any) => {
      Object.assign($state, initialState)
    })
  }
}

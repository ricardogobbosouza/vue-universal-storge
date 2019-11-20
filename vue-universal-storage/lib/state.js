import Vue from 'vue'
import dotProp from 'dot-prop'
import Storage from './storage';

export default class State extends Storage {
  constructor(store, options = {}) {
    super(options)

    this.store = store
    this._init()
  }

  get vuexAvailable() {
    return super.isEnabled && super.isSet(this.namespace) && this.store
  }

  get namespace() {
    return this.options.namespace || undefined
  }

  _init() {
    // Private state is suitable to keep information not being exposed to Vuex store
    // This helps prevent stealing token from SSR response HTML
    Vue.set(this, '_state', {})

    // Set state if vuex not available
    if (!this.vuexAvailable) {
      Vue.set(this, 'state', {})

      return
    }

    const storeModule = {
      namespaced: true,
      state: () => this.options.initialState,
      mutations: {
        SET (state, payload) {
          Vue.set(state, payload.key, payload.value)
        }
      }
    }

    this.store.registerModule(this.namespace, storeModule, {
      preserveState: Boolean(this.store.state[this.namespace])
    })

    this.state = this.store.state[this.namespace]
  }

  set(key, value) {
    if (key[0] === '_') {
      Vue.set(this._state, key, value)

      return value
    }

    if (!this.vuexAvailable) {
      Vue.set(this.state, key, value)

      return value
    }

    this.store.commit(this.namespace + '/SET', {
      key,
      value
    })

    return value
  }

  get(key) {
    if (key[0] !== '_') {
      return this.state[key]
    } else {
      return this._state[key]
    }
  }

  watch(key, fn) {
    if (!this.vuexAvailable) {
      return
    }

    return this.store.watch(
      state => dotProp.get(state[this.namespace], key),
      fn
    )
  }

  remove(key) {
    this.set(key, undefined)
  }
}
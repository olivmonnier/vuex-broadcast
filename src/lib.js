import { createStore } from 'vuex';

const channel = new BroadcastChannel('StoreChannel');

// Use this in the Main-thread
export function wrap(storeOpts, worker) {
  if (!storeOpts.actions) {
    throw new Error("Your Vuex store must have actions");
  }

  // Clone store options
  const opts = { ...storeOpts, actions: { ...storeOpts.actions } };

  // cleanup actions
  const emptyAction = () => {};
  Object.keys(opts.actions).forEach(key => {
    opts.actions[key] = emptyAction;
  });

  const store = createStore(opts);

  // Handle commits by the worker
  channel.onmessage = function(e) {
    store.commit(e.data.type, e.data.payload);
  };

  // Intercept actions and dispatch it to the worker.
  store.subscribeAction(({ type, payload }) => {
    let p;
    if (payload instanceof Event) {
      p = payload.target.value || null;
    } else {
      p = payload;
    }
    worker.postMessage({ type, payload: p });
  });

  return store;
}

// Use this in the worker
export function expose(storeOpts) {
  if (!storeOpts.actions) {
    throw new Error("Your Vuex store must have actions");
  }

  // we only need the actions.
  const opts = { actions: { ...storeOpts.actions } };
  const actions = opts.actions;

  Object.keys(actions).forEach(key => {
    const executeAction = actions[key];
    actions[key] = async function offThreadAction(payload) {
      function commit(mutationKey, value) {
        channel.postMessage({ type: mutationKey, payload: value });
      }

      return executeAction({ commit }, payload);
    };
  });

  self.onmessage = function(e) {
    actions[e.data.type](e.data.payload);
  };

  return opts;
}